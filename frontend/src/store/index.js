import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import articlesSlice from './getArticles/artilesSlice'
import sample from './getDashData/sample'
import sourceData from "./getDashData/sourceData"
import sample3 from "./getDashData/sample3"
import revenueData from "./getDashData/revenueData"
import fetchedArticles from "./fetchedArticles/fetchedArticles";
import localArticles from "./localArticle/localarticles";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
const rootPresistConfig = {
    key: "root",
    storage,
    whitelist: ["localArticles"]
}

const rootReducer = combineReducers({
    articlesSlice, sample, sourceData, sample3, revenueData, fetchedArticles, localArticles,
})
const presistRootReducer = persistReducer(rootPresistConfig, rootReducer)

const store = configureStore({
    reducer: presistRootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})
const persistor = persistStore(store)

export { store, persistor };