import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useState } from "react";
import useToken from "./useToken";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

type UserInfo = {
  id?: number;
  name?: string;
  typeId?: number;
};

const App = () => {
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  const { token, setToken } = useToken();

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route
            path="/"
            errorElement={<h1>Error mada faka :</h1>}
            element={!token ? 
              <Login setToken={setToken} setUserInfo={setUserInfo} /> : 
              <Dashboard userInfo={userInfo} />}
          />
        )
      )}
    />
  );
};

export default App;
