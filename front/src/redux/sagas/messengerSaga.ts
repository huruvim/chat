import {ForkEffect, takeLatest, select, put, call, StrictEffect} from "redux-saga/effects";
import {createAction} from "@reduxjs/toolkit";
import {getMessagesApi, setUserApi} from "../../constants/api";
import {setCurrentUser, setMessages} from "../slices/messangerSlice";
import {currentUserSelector} from "../selectors";

function* initializeWorker(): Generator<StrictEffect<string>, void, any> {
  try {
    const currentUser = yield select(currentUserSelector);
    if (currentUser.name) {
      const { data } = yield call(setUserApi, currentUser.name);
      yield put(setCurrentUser(data));
    }
  } catch (error) {
    console.error('initializeWorker', error);
  }
}

function* getMessagesWorker() {
  try {
    const {data} = yield call(getMessagesApi);
    yield put(setMessages(data));
  } catch (error) {
    console.error('getMessagesWorker', error);
  }
}

function* sendMessagesWorker() {
  try {
    const {data} = yield call(getMessagesApi);
    yield put(setMessages(data));
  } catch (error) {
    console.error('sendMessagesWorker', error);
  }
}

function* setUserWorker({payload}: {type: string, payload: {title: string, onSuccess: () => void}}) {
  try {
    const {data} = yield call(setUserApi, payload.title);
    yield put(setCurrentUser(data));
    payload.onSuccess();
  } catch (error) {
    console.error('setUserWorker', error);
  }
}

export function* messengerWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(MESSENGER_TYPES.INITIALIZE, initializeWorker);
  yield takeLatest(MESSENGER_TYPES.GET_MESSAGES, getMessagesWorker);
  yield takeLatest(MESSENGER_TYPES.SEND_MESSAGES, sendMessagesWorker);
  yield takeLatest(MESSENGER_TYPES.SET_USER, setUserWorker);
}

const MESSENGER_TYPES = {
  INITIALIZE: 'INITIALIZE',
  GET_MESSAGES: 'GET_MESSAGES',
  SEND_MESSAGES: 'SEND_MESSAGES',
  SET_USER: 'SET_USER',
};

export const initialize = createAction(MESSENGER_TYPES.INITIALIZE);
export const getMessages = createAction(MESSENGER_TYPES.GET_MESSAGES);
export const sendMessage = createAction<string>(MESSENGER_TYPES.SEND_MESSAGES);
export const setUser = createAction<{title: string, onSuccess: () => void}>(MESSENGER_TYPES.SET_USER);
