export const usePages = () => {
  return {
    InfoRouteNameTypeArray,
    InfoMenuRouteNameTypeArray,
    pageRecord,
    infoMenuRecord,
  };
};

const InfoMenuRouteNameTypeArray = [
  'Info_Verein',
  'Info_Stolpersteine',
  'Info_Research',
  'Info_Glossary',
  'Info_Help',
  'Info_Contact',
  'Info_Privacy',
  'Info_Imprint',
] as const;
type InfoMenuRouteNameType = typeof InfoMenuRouteNameTypeArray[number];

const InfoRouteNameTypeArray = ['Info', ...InfoMenuRouteNameTypeArray] as const;

const RouteNameTypeArray = [
  'Home',
  'Map',
  'Map_Details',
  ...InfoRouteNameTypeArray,
] as const;
export type RouteNameType = typeof RouteNameTypeArray[number];

interface Page {
  title: string | undefined;
  routeName: RouteNameType;
}

const homePage: Page = {
  title: 'Startseite',
  routeName: 'Home',
};

const mapPage: Page = {
  title: 'Karte',
  routeName: 'Map',
};
const mapDetailsPage: Page = { title: undefined, routeName: 'Map_Details' };

const infoPage: Page = {
  title: 'Informationen',
  routeName: 'Info',
};
const infoVereinPage: Page = {
  title: 'Stolpersteine für Dresden e.\xa0V.',
  routeName: 'Info_Verein',
};
const infoStolpersteinePage: Page = {
  title: 'Die Stolpersteine',
  routeName: 'Info_Stolpersteine',
};
const infoResearchPage: Page = {
  title: 'Recherche',
  routeName: 'Info_Research',
};
const infoGlossaryPage: Page = { title: 'Glossar', routeName: 'Info_Glossary' };
const infoHelpPage: Page = { title: 'Hilfe und FAQ', routeName: 'Info_Help' };
const infoContactPage: Page = { title: 'Kontakt', routeName: 'Info_Contact' };
const infoPrivacyPage: Page = {
  title: 'Datenschutz',
  routeName: 'Info_Privacy',
};
const infoImprintPage: Page = { title: 'Impressum', routeName: 'Info_Imprint' };

const pageRecord: Record<RouteNameType, Page> = {
  Home: homePage,
  Map: mapPage,
  Map_Details: mapDetailsPage,
  Info: infoPage,
  Info_Verein: infoVereinPage,
  Info_Stolpersteine: infoStolpersteinePage,
  Info_Research: infoResearchPage,
  Info_Glossary: infoGlossaryPage,
  Info_Help: infoHelpPage,
  Info_Contact: infoContactPage,
  Info_Privacy: infoPrivacyPage,
  Info_Imprint: infoImprintPage,
};

const infoMenuRecord: Record<InfoMenuRouteNameType, Page> = {
  Info_Verein: infoVereinPage,
  Info_Stolpersteine: infoStolpersteinePage,
  Info_Research: infoResearchPage,
  Info_Glossary: infoGlossaryPage,
  Info_Help: infoHelpPage,
  Info_Contact: infoContactPage,
  Info_Privacy: infoPrivacyPage,
  Info_Imprint: infoImprintPage,
};
