interface CountryLeagues {
  countryName: string;
  countryCode: string;
  leagues: {
    id: string;
    name: string;
  }[];
}

export const all_leagues: CountryLeagues[] = [
  {
    countryName: "Algeria",
    countryCode: "dz",
    leagues: [
      {
        id: "algeria_1",
        name: "Ligue 1",
      },
    ],
  },
  {
    countryName: "Argentina",
    countryCode: "ar",
    leagues: [
      {
        id: "argentina_1",
        name: "Liga Profesional",
      },
    ],
  },
  {
    countryName: "Australia",
    countryCode: "au",
    leagues: [{ id: "australia_1", name: "A-League" }],
  },
  {
    countryName: "Austria",
    countryCode: "at",
    leagues: [
      { id: "austria_1", name: "Bundesliga" },
      { id: "austria_2", name: "2. Liga" },
    ],
  },

  {
    countryName: "Belgium",
    countryCode: "be",
    leagues: [{ id: "belgium_1", name: "Jupiler League" }],
  },
  {
    countryName: "Belarus",
    countryCode: "by",
    leagues: [{ id: "belarus_1", name: "Premier League" }],
  },
  {
    countryName: "Bosnia and Herzegovina",
    countryCode: "ba",
    leagues: [{ id: "bosnia_1", name: "Premier Liga" }],
  },
  {
    countryName: "Brazil",
    countryCode: "br",
    leagues: [
      { id: "brazil_1", name: "Serie A" },
      { id: "brazil_2", name: "Serie B" },
    ],
  },
  {
    countryName: "Bulgaria",
    countryCode: "bg",
    leagues: [{ id: "bulgaria_1", name: "First league" }],
  },
  {
    countryName: "Croatia",
    countryCode: "hr",
    leagues: [{ id: "croatia_1", name: "1. HNL" }],
  },
  {
    countryName: "Cyprus",
    countryCode: "cy",
    leagues: [{ id: "cyprus_1", name: "Division 1" }],
  },
  {
    countryName: "Czech Republic",
    countryCode: "cz",
    leagues: [
      { id: "czechrepublic_1", name: "1. Liga" },
      { id: "czechrepublic_2", name: "FNL" },
    ],
  },
  {
    countryName: "Denmark",
    countryCode: "dk",
    leagues: [
      { id: "denmark_1", name: "Superligaen" },
      { id: "denmark_2", name: "1st Division" },
    ],
  },
  {
    countryName: "England",
    countryCode: "gb-eng",
    leagues: [
      { id: "england_1", name: "Premier League" },
      { id: "england_2", name: "Championship" },
      { id: "england_3", name: "League One" },
      { id: "england_4", name: "League Two" },
      { id: "england_5", name: "National League" },
      { id: "england_6", name: "National L. North" },
      { id: "england_7", name: "National L. South" },
    ],
  },

  {
    countryName: "France",
    countryCode: "fr",
    leagues: [
      { id: "france_1", name: "Ligue 1" },
      { id: "france_2", name: "Ligue 2" },
      { id: "france_3", name: "National" },
    ],
  },
  {
    countryName: "Egypt",
    countryCode: "eg",
    leagues: [{ id: "egypt_1", name: "Premier League" }],
  },
  {
    countryName: "Germany",
    countryCode: "de",
    leagues: [
      { id: "germany_1", name: "Bundesliga" },
      { id: "germany_2", name: "2. Bundesliga" },
      { id: "germany_3", name: "3. Liga" },
    ],
  },
  {
    countryName: "Hungaru",
    countryCode: "hu",
    leagues: [{ id: "hungary_1", name: "NB I" }],
  },
  {
    countryName: "Italy",
    countryCode: "it",
    leagues: [
      { id: "italy_1", name: "Serie A" },
      { id: "italy_2", name: "Serie B" },
      { id: "italy_3", name: "Serie C - Group A" },
      { id: "italy_4", name: "Serie C - Group B" },
      { id: "italy_5", name: "Serie C - Group C" },
    ],
  },
  {
    countryName: "Ireland",
    countryCode: "ie",
    leagues: [{ id: "ireland_1", name: "Premier Division" }],
  },
  {
    countryName: "Japan",
    countryCode: "jp",
    leagues: [
      { id: "japan_1", name: "J1 League" },
      { id: "japan_2", name: "J2 League" },
    ],
  },

  {
    countryName: "Morocco",
    countryCode: "ma",
    leagues: [{ id: "morocco_1", name: "Botola Pro" }],
  },
  {
    countryName: "Netherlands",
    countryCode: "nl",
    leagues: [
      { id: "netherlands_1", name: "Eredivisie" },
      { id: "netherlands_2", name: "Eerste Divisie" },
    ],
  },
  {
    countryName: "Northern Ireland",
    countryCode: "gb-nir",
    leagues: [{ id: "northernireland_1", name: "NIFL Premiership" }],
  },
  {
    countryName: "Norway",
    countryCode: "no",
    leagues: [
      { id: "norway_1", name: "Eliteserien" },
      { id: "norway_2", name: "1st Division" },
      { id: "norway_3", name: "Division 2 - Gr. 1" },
      { id: "norway_4", name: "Division 2 - Gr. 2" },
    ],
  },
  {
    countryName: "Poland",
    countryCode: "pl",
    leagues: [
      { id: "poland_1", name: "Ekstraklasa" },
      { id: "poland_2", name: "1. Liga" },
    ],
  },
  {
    countryName: "Portugal",
    countryCode: "pt",
    leagues: [
      { id: "portugal_1", name: "Primeira Liga" },
      { id: "portugal_2", name: "Segunda Liga" },
    ],
  },
  {
    countryName: "Romania",
    countryCode: "ro",
    leagues: [{ id: "romania_1", name: "Liga 1" }],
  },
  {
    countryName: "Russia",
    countryCode: "ru",
    leagues: [
      { id: "russia_1", name: "Premier League" },
      { id: "russia_2", name: "FNL" },
    ],
  },
  {
    countryName: "Saudi Arabia",
    countryCode: "sa",
    leagues: [{ id: "saudiarabia_1", name: "Professional League" }],
  },
  {
    countryName: "Scotland",
    countryCode: "gb-sct",
    leagues: [
      { id: "scotland_1", name: "Premiership" },
      { id: "scotland_2", name: "Championship" },
      { id: "scotland_3", name: "League One" },
      { id: "scotland_4", name: "League Two" },
    ],
  },
  {
    countryName: "Slovakia",
    countryCode: "sk",
    leagues: [{ id: "slovakia_1", name: "Fortuna Liga" }],
  },
  {
    countryName: "Slovenia",
    countryCode: "si",
    leagues: [{ id: "slovenia_1", name: "PrvaLiga" }],
  },
  {
    countryName: "South Korea",
    countryCode: "kr",
    leagues: [{ id: "southkorea_1", name: "K League 1" }],
  },
  {
    countryName: "Spain",
    countryCode: "es",
    leagues: [
      { id: "spain_1", name: "La Liga" },
      { id: "spain_2", name: "La Liga 2" },
    ],
  },
  {
    countryName: "Sweden",
    countryCode: "se",
    leagues: [
      { id: "sweden_1", name: "Allsvenskan" },
      { id: "sweden_2", name: "Superettan" },
      { id: "sweden_3", name: "Div 1 - Norra" },
      { id: "sweden_4", name: "Div 1 - Södra" },
    ],
  },
  {
    countryName: "Switzerland",
    countryCode: "ch",
    leagues: [
      { id: "switzerland_1", name: "Super League" },
      { id: "switzerland_2", name: "Challenge League" },
    ],
  },
  {
    countryName: "Tunisia",
    countryCode: "tn",
    leagues: [{ id: "tunisia_1", name: "Ligue Professionnelle 1" }],
  },
  {
    countryName: "Turkey",
    countryCode: "tr",
    leagues: [
      { id: "turkey_1", name: "Super Lig" },
      { id: "turkey_2", name: "1. Lig" },
    ],
  },
  {
    countryName: "Ukraine",
    countryCode: "ua",
    leagues: [{ id: "ukraine_1", name: "Premier League" }],
  },
  {
    countryName: "USA",
    countryCode: "us",
    leagues: [
      { id: "usa_1", name: "MLS" },
      { id: "usa_2", name: "USL Championship" },
    ],
  },
  {
    countryName: "Wales",
    countryCode: "gb-wls",
    leagues: [{ id: "wales_1", name: "Cymru Premier" }],
  },
];
