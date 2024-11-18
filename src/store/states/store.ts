/**
 * Copyright (c) Hand-Future @2023. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { PERSIST, persistReducer, REGISTER, REHYDRATE } from "redux-persist";
import type { PersistConfig } from "redux-persist/es/types";
import storage from "redux-persist/lib/storage";
import type { Middleware } from '@reduxjs/toolkit';

import { USE_PERSISTOR } from "../../config/system";
import { isClient } from "../../lib/server";

import { baseApi } from "./api/baseApi";
import { heroApi } from "./api/heroApi";

// Ensure unique reducer paths
const rootReducer = combineReducers({
  base: baseApi.reducer,
  hero: heroApi.reducer,
});

const reducer = USE_PERSISTOR
  ? persistReducer(
      {
        key: "root",
        version: 2,
        storage, // storage 不能在server端被调用
      } as PersistConfig<any>,
      rootReducer,
    )
  : rootReducer;

const logger = createLogger({
  predicate: (getState, action, logEntry) => {
    return (
      ![PERSIST, REHYDRATE, REGISTER].includes(action.type) &&
      !action.type.includes("subscriptions") &&
      !action.type.includes("middleware")
    );
  },
});

const middlewares: Middleware[] = [baseApi.middleware, heroApi.middleware];
if (isClient()) {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...middlewares),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Replace any with proper types
type LogEntry = {
  message: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
};

// Use the type instead of any
function logMiddleware(_store: any) {
  return (_next: any) => (_action: any) => {
    // ...
  };
}
