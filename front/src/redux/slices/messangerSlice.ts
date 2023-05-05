import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MessageI, User} from "../../components/Chat/Chat";

interface InitialState {
  messages: MessageI[];
  currentUser: User | null;
}

export const messengerSlice = createSlice({
  name: 'messenger',
  initialState: {
    messages: [],
    currentUser: null,
  } as InitialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessageI[]>) => {
      if (action.payload) {
        state.messages = action.payload;
      }
    },
    addNewMessage: (state, action: PayloadAction<MessageI>) => {
      state.messages.push(action.payload);
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    }
  },
})

export const { setMessages, addNewMessage, setCurrentUser } = messengerSlice.actions;