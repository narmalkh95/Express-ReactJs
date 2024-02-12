import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/authApi';
import { qrApi } from '../features/qrApi';
import {classApi} from "../features/classApi";
import { setupListeners } from '@reduxjs/toolkit/query';

 export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [qrApi.reducerPath]: qrApi.reducer,
        [classApi.reducerPath]: classApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
         return getDefaultMiddleware().concat(authApi.middleware, qrApi.middleware, classApi.middleware);
    },
});

 setupListeners(store.dispatch);

