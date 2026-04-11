import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Dutch translations
import nlCommon from '../locales/nl/common.json'
import nlHome from '../locales/nl/home.json'
import nlCases from '../locales/nl/cases.json'
import nlServices from '../locales/nl/services.json'
import nlContact from '../locales/nl/contact.json'
import nlAbout from '../locales/nl/about.json'

// English translations
import enCommon from '../locales/en/common.json'
import enHome from '../locales/en/home.json'
import enCases from '../locales/en/cases.json'
import enServices from '../locales/en/services.json'
import enContact from '../locales/en/contact.json'
import enAbout from '../locales/en/about.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      nl: {
        common: nlCommon,
        home: nlHome,
        cases: nlCases,
        services: nlServices,
        contact: nlContact,
        about: nlAbout,
      },
      en: {
        common: enCommon,
        home: enHome,
        cases: enCases,
        services: enServices,
        contact: enContact,
        about: enAbout,
      },
    },
    lng: 'nl',
    fallbackLng: 'nl',
    defaultNS: 'common',
    ns: ['common', 'home', 'cases', 'services', 'contact', 'about'],
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
