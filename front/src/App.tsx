import React, {createContext, useEffect} from 'react';
import {Socket} from 'socket.io-client';
import Router from "./components/Router";
import {useConnector} from "./hooks/useConnector";
import {useDispatch} from "react-redux";
import {initialize} from "./redux/sagas/messengerSaga";

type SocketI = { socket: Socket | null }

export const SocketContext = createContext<SocketI>({socket: null});

function App() {
  const socket = useConnector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, [])

  return (
    <SocketContext.Provider value={{socket}}>
      {socket ? <Router/> : <div>Loading...</div>}
    </SocketContext.Provider>
  )
}

export default App;
