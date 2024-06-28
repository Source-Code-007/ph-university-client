import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import logger from "./middleware/logger";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

  // devTools: false // for production website to disable redux devtools
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
