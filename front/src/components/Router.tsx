import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {PATHS, ROUTES} from "../constants/routes";
import {Socket} from "socket.io-client";
import {FC} from "react";
import { SocketContext } from "../contexts";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../redux/selectors";

interface RouterProps {
  socket: Socket;
}

const Router: FC<RouterProps> = ({socket}) => {
  const currentUser = useSelector(currentUserSelector);
  return (
    <SocketContext.Provider value={{socket}}>
      <BrowserRouter>
        <Routes>
          {ROUTES.map(({path, Component}) => (
            <Route path={path} element={<Component />} key={path} />
          ))}
          <Route
            path={PATHS.UNKNOWN}
            element={<Navigate to={currentUser ? PATHS.CHAT : PATHS.DEFAULT} replace />}
          />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  )
}

export default Router;
