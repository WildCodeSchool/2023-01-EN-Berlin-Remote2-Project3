import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useState, useEffect } from "react";
import useToken from "./useToken";
import Menu from "./routes/Menu";
import { menuData, Category } from "./api";
import { LoginPage } from "./routes/LoginPage";

export interface UserInfo {
  id: number;
  name: string;
  typeId: number;
}

const App = () => {
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  const { token, setToken } = useToken();
  const [menuDataApi, setMenuDataApi] = useState([] as Category[]);

  useEffect(() => {
    const data = async () => {
      const res = await menuData();
      if (res) {
        setMenuDataApi(res);
      } else {
        throw Error("failed to fetch data from server");
      }
    };
    data();
  }, []);

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route
            path="/"
            errorElement={<h1>Error mada faka :</h1>}
            element={<LoginPage setToken={setToken} setUserInfo={setUserInfo} userInfo={userInfo} token={token} />
            }
          >
            <Route
              path="menu"
              errorElement={<h1>another error</h1>}
              element={<Menu menuDataApi={menuDataApi} activeCategory={-1} />}
            >
              {menuDataApi.map((category, index) => (
                <Route
                  path={encodeURIComponent(category.name)}
                  errorElement={<h1>yet another error</h1>}
                  element={
                    <Menu menuDataApi={menuDataApi} activeCategory={index} />
                  }
                />
              ))}
            </Route>
          </Route>
        )
      )}
    />
  );
};

export default App;
