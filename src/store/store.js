import { configureStore } from '@reduxjs/toolkit';
import users from './usersSlice.js';

const stringMidleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
}

export const store = configureStore({
    reducer: {users},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMidleware),
    devTools: process.env.NODE_ENV !== 'production',   
});
