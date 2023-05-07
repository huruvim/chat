import React, {useEffect} from 'react';
import Router from "./utils/Router";
import {useConnector} from "./hooks/useConnector";
import {useDispatch} from "react-redux";
import {initialize} from "./redux/sagas/messengerSaga";

function App() {
  const socket = useConnector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, [])

  return socket ? <Router socket={socket}/> : <div>Loading...</div>
}

export default App;
