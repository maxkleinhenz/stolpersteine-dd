import { routeNames } from 'src/router/routes';

export interface MenuEntry {
  name: string;
  to: string;
}

export const menuEntries = <MenuEntry[]>[
  {
    name: 'Stolpersteine für Dresden e. V.',
    to: routeNames.infoVerein,
  },
  {
    name: 'Die Stolpersteine',
    to: routeNames.infoStolpersteine,
  },
  {
    name: 'Recherche',
    to: routeNames.infoResearch,
  },
  {
    name: 'Hilfe und FAQ',
    to: routeNames.infoHelp,
  },
  {
    name: 'Kontakt',
    to: routeNames.infoContact,
  },
  {
    name: 'Datenschutz',
    to: routeNames.infoPrivacy,
  },
  {
    name: 'Impressum',
    to: routeNames.infoImprint,
  },
];
