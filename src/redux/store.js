// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import companyActions from "./slices/companyActionSlice";
import companyUsersReducer from "../redux/slices/companyUsersSlice";
import sessionReducer from "./slices/sessionSlice";
import subscriptionReducer from "./slices/subscriptionSlice"
import plansReducer from "./slices/plansSlice";
import webhookLogsReducer from "./slices/webhookSlice";
import countriesReducer from './slices/countriesSlice'
import bankCountryDefaultReducer from "./slices/bankCountryDefaultsSlice"
import countryKnowledgeReducer from "./slices/countryKnowledgeSlice";
import countryCurrencyReducer from "./slices/countryCurrencySlice";
import coaReducer from './slices/coaSlice'
import complianceReducer from './slices/complianceCalendarSlice'
import taxRegimeReducer from './slices/taxRegimesSlice'

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    companyActions,
    companyUsers: companyUsersReducer,
    sessions: sessionReducer,
    subscription: subscriptionReducer,
    plans:plansReducer,
    webhookLogs:webhookLogsReducer,
    countries:countriesReducer,
    bankCountryDefaults: bankCountryDefaultReducer,
    countryKnowledge: countryKnowledgeReducer,
    countryCurrency: countryCurrencyReducer,
    coa: coaReducer,
    complianceCalendar: complianceReducer,
    taxRegimes: taxRegimeReducer
  },
});
