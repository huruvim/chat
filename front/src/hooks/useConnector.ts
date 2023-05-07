import {useEffect, useState} from "react";
import {connect, Socket} from "socket.io-client";
import {baseUrl} from "../constants/api";
import {Nullable} from "../shapes";

export const useConnector = () => {
  const [socket, setSocket] = useState<Nullable<Socket>>(null);
  useEffect(() => {
    const socket = connect(baseUrl);
    setSocket(socket);
  }, []);

  useEffect(() => {
    function onConnect() {
      console.log('connected', socket?.id);
    }

    function onDisconnect() {
      console.log('disconnected');
    }

    socket?.on('connect', onConnect);
    socket?.on('disconnect', onDisconnect);

    return () => {
      socket?.off('connect', onConnect);
      socket?.off('disconnect', onDisconnect);
    };
  }, [socket]);

  return socket;
}