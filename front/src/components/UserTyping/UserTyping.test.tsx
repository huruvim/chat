import {render} from '@testing-library/react';
import UserTyping from './UserTyping';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {messengerSlice} from "../../redux/slices/messangerSlice";

const store = configureStore({
  reducer: {
    messenger: messengerSlice.reducer
  },
  preloadedState: {
    messenger: {
      messages: [],
      usersTyping: [
        {id: 'test12', name: 'Angelo'},
        {id: 'test11', name: 'Jen'},
        {id: 'test13', name: 'Kate'},
        {id: 'test15', name: 'Nill'}
      ],
      currentUser: null,
    }
  }
})

const setUp = (
  <Provider store={store}>
    <UserTyping/>
  </Provider>
)

describe('UserTyping', () => {
  test('renders user typing indicator', () => {
    const {getByText} = render(setUp);
    const firstUserTyping = getByText('Angelo is typing...');
    const secondUserTyping = getByText('Jen is typing...');
    const thirdUserTyping = getByText('Kate is typing...');
    const plusSign = getByText('+1...');
    expect(firstUserTyping).toBeInTheDocument();
    expect(secondUserTyping).toBeInTheDocument();
    expect(thirdUserTyping).toBeInTheDocument();
    expect(plusSign).toBeInTheDocument();
  });
});
