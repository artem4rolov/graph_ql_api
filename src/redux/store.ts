import { combineReducers, configureStore } from "@reduxjs/toolkit";
// ...

const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: rootReducer,
});

// RootState принимает в себя тип конкретного редюсера
export type RootState = ReturnType<typeof store.getState>;
// Также для Dispatch
export type AppDispatch = typeof store.dispatch;
