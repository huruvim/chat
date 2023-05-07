import { configureStore } from '@reduxjs/toolkit'
import {messengerSlice} from "./slices/messangerSlice";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas/root";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const currentUser = localStorage.getItem('currentUser');
const parsedCurrentUser = currentUser ? JSON.parse(currentUser || '') || null : null;

const store = configureStore({
  reducer: {
    messenger: messengerSlice.reducer
  },
  preloadedState: {
    messenger: {
      messages: [],
      usersTyping: [],
      currentUser: parsedCurrentUser,
    }
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(middlewares),
  devTools: process.env.NODE_ENV !== 'production'
})

store.subscribe(() => {
  const currentUser = store.getState().messenger.currentUser;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
})

export type RootState = ReturnType<typeof store.getState>
sagaMiddleware.run(rootSaga);

export default store