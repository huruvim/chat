import { messengerSlice } from './messangerSlice';
import {MessageI} from "../../shapes";

const defaultUser = {id: 'test-id', name: 'Angelo'};

describe('messengerSlice', () => {
  const initialState = {
    messages: [],
    usersTyping: [],
    currentUser: null,
  };
  test('should set messages', () => {
    const messages = [{ id: '1', text: 'Hello', user: defaultUser }, { id: '2', text: 'World', user: defaultUser }];
    const action = messengerSlice.actions.setMessages(messages);
    const newState = messengerSlice.reducer(initialState, action);
    expect(newState.messages).toEqual(messages);
  });
  test('should add new message', () => {
    const message = { id: '1', text: 'Hello', user: defaultUser };
    const action = messengerSlice.actions.addNewMessage(message);
    const newState = messengerSlice.reducer(initialState, action);
    expect(newState.messages).toEqual([message]);
  });
  test('should set current user', () => {
    const user = { id: '1', name: 'Alice' };
    const action = messengerSlice.actions.setCurrentUser(user);
    const newState = messengerSlice.reducer(initialState, action);
    expect(newState.currentUser).toEqual(user);
  });
  test('should set typing user', () => {
    const user = { id: '1', name: 'Alice' };
    const action = messengerSlice.actions.setTypingUser(user);
    const newState = messengerSlice.reducer(initialState, action);
    expect(newState.usersTyping).toEqual([user]);
  });
  test('should remove typing user', () => {
    const user1 = { id: '1', name: 'Alice' };
    const user2 = { id: '2', name: 'Bob' };
    const action1 = messengerSlice.actions.setTypingUser(user1);
    const action2 = messengerSlice.actions.setTypingUser(user2);
    const action3 = messengerSlice.actions.removeTypingUser(user1.id);
    const newStateWithOneUser = messengerSlice.reducer(initialState, action1);
    const newStateWithTwoUsers = messengerSlice.reducer(newStateWithOneUser, action2);
    const endState = messengerSlice.reducer(newStateWithTwoUsers, action3);
    expect(endState.usersTyping).toEqual([user2]);
  });
});