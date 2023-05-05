import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ROUTES} from "../constants/routes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map(({path, Component}) => (
          <Route path={path} element={<Component />} key={path} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
