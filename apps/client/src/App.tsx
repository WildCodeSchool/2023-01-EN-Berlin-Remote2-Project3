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

  if (!token) {
    return <Login setToken={setToken} setUserInfo={setUserInfo} />;
  }

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route errorElement={<h1>Error mada faka :)</h1>}>
            <Route path="/" element={<Dashboard userInfo={userInfo} />} />

            {/* Example how to use routes we need to fix this one */}

            {/* <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        )
      )}
    />
  );
};

export default App;
