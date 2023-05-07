import Home from "../routes/Home/Home";
import Chat from "../routes/Chat/Chat";

export const PATHS = {
  DEFAULT: '/',
  CHAT: '/chat',
  UNKNOWN: '*'
}

export const ROUTES = [
  {
    path: PATHS.DEFAULT,
    Component: Home
  },
  {
    path: PATHS.CHAT,
    Component: Chat
  },
]