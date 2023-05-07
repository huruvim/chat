import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MessageI, Nullable, User} from "../../shapes";

interface InitialState {
  messages: MessageI[];
  usersTyping: User[];
  currentUser: Nullable<User>;
}

export const messengerSlice = createSlice({
  name: 'messenger',
  initialState: {
    messages: [],
    usersTyping: [],
    currentUser: null,
  } as InitialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageI[]>) => {
      state.messages = action.payload;
    },
    addNewMessage: (state, action: PayloadAction<MessageI>) => {
      state.messages.push(action.payload);
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setTypingUser: (state, action: PayloadAction<User> ) => {
      state.usersTyping.push(action.payload);
    },
    removeTypingUser: (state, action: PayloadAction<string> ) => {
      const index = state.usersTyping.findIndex(user => user.id === action.payload)
      if (index !== -1) {
        state.usersTyping.splice(index, 1)
      }
    },
  },
})

export const { setMessages, addNewMessage, setCurrentUser, setTypingUser, removeTypingUser } = messengerSlice.actions;