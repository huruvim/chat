import {useEffect, useState} from "react";
import {connect, Socket} from "socket.io-client";
import {baseUrl} from "../constants/api";

export const useConnector = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socket = connect(baseUrl);
    setSocket(socket);
  }, []);

  return socket;
}