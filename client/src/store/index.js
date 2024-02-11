import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/authApi';
import { qrApi } from '../features/qrApi';
import { setupListeners } from '@reduxjs/toolkit/query';

 export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [qrApi.reducerPath]: qrApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
         return getDefaultMiddleware().concat(authApi.middleware, qrApi.middleware);
    },
});

 setupListeners(store.dispatch);

