import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reposReducer from "./slices/Repos/Repos";

// здесь пишем все наши редюсеры и оборачиваем в главный rootReducer
const rootReducer = combineReducers({
  repos: reposReducer,
});

// herducer для store нашего приложения
export const store = configureStore({
  reducer: rootReducer,
});

// RootState принимает в себя тип конкретного редюсера
export type RootState = ReturnType<typeof store.getState>;
// Также для Dispatch
export type AppDispatch = typeof store.dispatch;
