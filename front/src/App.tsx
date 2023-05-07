import React, {useEffect} from 'react';
import Router from "./components/Router";
import {useConnector} from "./hooks/useConnector";
import {useDispatch} from "react-redux";
import {initialize} from "./redux/sagas/messengerSaga";
import {SocketContext} from "./contexts";

function App() {
  const socket = useConnector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      dispatch(initialize());
    }
  }, [socket])

  if (!socket) {
    return <div>Loading...</div>
  }

  return (
    <SocketContext.Provider value={{socket}}>
      <Router/>
    </SocketContext.Provider>
  )
}

export default App;
