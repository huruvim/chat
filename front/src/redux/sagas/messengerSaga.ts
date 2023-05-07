import {ForkEffect, takeLatest, select, put, call, StrictEffect} from "redux-saga/effects";
import {createAction} from "@reduxjs/toolkit";
import {getMessagesApi, setUserApi} from "../../constants/api";
import {setCurrentUser, setMessages} from "../slices/messangerSlice";
import {currentUserSelector} from "../selectors";
import {User} from "../../shapes";

function* initializeWorker() {
  try {
    const currentUser: User = yield select(currentUserSelector);
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

export function* messengerWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(MESSENGER_TYPES.INITIALIZE, initializeWorker);
  yield takeLatest(MESSENGER_TYPES.GET_MESSAGES, getMessagesWorker);
}

const MESSENGER_TYPES = {
  INITIALIZE: 'INITIALIZE',
  GET_MESSAGES: 'GET_MESSAGES',
};

export const initialize = createAction(MESSENGER_TYPES.INITIALIZE);
export const getMessages = createAction(MESSENGER_TYPES.GET_MESSAGES);
