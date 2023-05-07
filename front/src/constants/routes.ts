import Home from "../components/Home/Home";
import Chat from "../components/Chat/Chat";

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