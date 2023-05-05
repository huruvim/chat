import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import { messengerWatcher } from './messengerSaga';

export default function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown> {
  yield all([messengerWatcher()]);
}