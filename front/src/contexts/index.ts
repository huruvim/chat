import {createContext} from "react";
import {Socket} from "socket.io-client";

export interface SocketI {
  socket: Socket;
}

export const SocketContext = createContext<SocketI>({socket: {} as Socket});