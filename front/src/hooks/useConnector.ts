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

  return socket;
}