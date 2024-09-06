import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice';
import AbilityReducer from './slices/AbilitySlice';
import themeReducer from './slices/themeSlice';
const store = configureStore({
    reducer: {
        auth: AuthReducer,
        ability: AbilityReducer,
        theme: themeReducer,
    }
})
export default store;