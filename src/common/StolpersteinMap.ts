import {
  Map as MaplibreMap,
  NavigationControl,
  Marker,
  AttributionControl,
  LngLatLike,
  GeoJSONSource,
  GeoJSONSourceSpecification,
} from 'maplibre-gl';
import Stolperstein, {
  StolpersteinFeature,
} from 'src/models/stolperstein.model';

const StolpersteinSourceName = 'stolpersteine';
const StolpersteinClusterLayer = 'clusters';
const StolpersteinClusterCountLayer = 'cluster-count';
const StolpersteinLayer = 'stolperstein-point';

export interface StolpersteinMarker {
  marker: Marker;
  stolpersteine: Array<Stolperstein>;
}

interface Feature {
  type: 'Feature';
  properties: Array<Stolperstein>;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

export function useStolpersteinMap() {
  return { createMap, resize, setLayer, setStolpersteinSource };
}

const createMap = (apiKey: string, center: LngLatLike): MaplibreMap => {
  const map = new MaplibreMap({
    container: 'map',
    style: `https://api.maptiler.com/maps/e79c1d05-b6e6-4dcd-8aad-05d3ec97c7d5/style.json?key=${apiKey}`,
    center: center,
    zoom: 12,
    trackResize: true,
    attributionControl: false,
  });

  map.addControl(
    new AttributionControl({
      customAttribution:
        '<a href="https://maplibre.org/" target="_blank">© MapLibre</a>',
    }),
    'bottom-right'
  );

  map.addControl(
    new NavigationControl({
      showCompass: true,
      showZoom: true,
    }),
    'bottom-right'
  );

  return map;
};

const setStolpersteinSource = (
  map: MaplibreMap,
  stolpersteinFeatures: Array<StolpersteinFeature>
): void => {
  if (!map) return;

  const features: Array<Feature> = [];

  stolpersteinFeatures.forEach((stolpersteinFeature) => {
    // check whether response stolperstein coordinates already exists in stolpersteinFeatureCollection
    const existsFeature = features.filter((feature) => {
      return (
        feature.geometry.coordinates[0] ===
          stolpersteinFeature.geometry.coordinates[0] &&
        feature.geometry.coordinates[1] ===
          stolpersteinFeature.geometry.coordinates[1]
      );
    });

    // when feature exists append stolperstein to proterties
    // otherwise create new feature
    if (existsFeature?.length > 0) {
      existsFeature[0].properties.push(stolpersteinFeature.stolperstein);
    } else {
      features.push({
        type: 'Feature',
        properties: [stolpersteinFeature.stolperstein],
        geometry: stolpersteinFeature.geometry,
      });
    }
  });

  const sourceSpec: GeoJSONSourceSpecification = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: features,
    },
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
  };

  const source = map.getSource(StolpersteinSourceName) as GeoJSONSource;
  if (source) {
    source.setData(sourceSpec.data);
  } else {
    map.addSource(StolpersteinSourceName, sourceSpec);
  }
};

const setLayer = (map: MaplibreMap) => {
  if (!map) return;

  map.loadImage('icons/stolperstein-glyph.png', (error, image) => {
    if (error) {
      console.log('error loadimage', error);
      return;
    }
    if (image) {
      map.addImage('stolperstein-glyph', image);
    }
    map.addLayer({
      id: StolpersteinClusterLayer,
      type: 'circle',
      source: StolpersteinSourceName,
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://maplibre.org/maplibre-gl-js-docs/style-spec/#expressions-step)
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#ceb82a',
          100,
          '#e2c70e',
          750,
          '#e2c70e',
        ],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
      },
    });

    map.addLayer({
      id: StolpersteinClusterCountLayer,
      type: 'symbol',
      source: StolpersteinSourceName,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
    });

    map.addLayer({
      id: StolpersteinLayer,
      type: 'symbol',
      source: StolpersteinSourceName,
      filter: ['!', ['has', 'point_count']],
      layout: {
        'icon-image': 'stolperstein-glyph',
        'icon-size': 0.2,
      },
    });
  });
};

// const setMarker = (
//   map: MaplibreMap,
//   stolpersteine: Array<Stolperstein>
// ): Map<string, StolpersteinMarker> => {
//   if (!map) return new Map<string, StolpersteinMarker>();

//   const stolersteineMarkers = new Map<string, StolpersteinMarker>();

//   // set new markers
//   stolpersteine.forEach((stolperstein) => {
//     const m = stolersteineMarkers.get(
//       `${stolperstein.point.lon},${stolperstein.point.lat}`
//     );
//     if (m) {
//       m.stolpersteine.push(stolperstein);
//     } else {
//       const markerElement = document.createElement('button');
//       markerElement.className =
//         'stolperstein-marker q-btn--actionable q-focusable q-hoverable';
//       // markerElement.onclick = function () {
//       //   store.commit(
//       //     MutationTypes.SELECT_STOLPERSTEINE,
//       //     stolersteineMarkers.get(
//       //       `${stolperstein.point.lon},${stolperstein.point.lat}`
//       //     )?.stolpersteine
//       //   );
//       // };

//       const marker = new Marker({ element: markerElement })
//         .setLngLat([stolperstein.point.lon, stolperstein.point.lat])
//         .addTo(map);
//       stolersteineMarkers.set(
//         `${stolperstein.point.lon},${stolperstein.point.lat}`,
//         {
//           marker: marker,
//           stolpersteine: [stolperstein],
//         }
//       );
//     }
//   });

//   return stolersteineMarkers;
// };

// const clearMarkers = (markers: Array<StolpersteinMarker>) => {
//   markers?.forEach((marker) => {
//     marker?.marker?.remove();
//   });
// };

const resize = (map: MaplibreMap) => {
  setTimeout(() => {
    if (map?.getCanvas() && map?.getContainer()) {
      map.getCanvas().height = map.getContainer().clientHeight ?? 0;
      map.getCanvas().width = map.getContainer().clientWidth ?? 0;
      map?.resize();
    }
  }, 400);
};
