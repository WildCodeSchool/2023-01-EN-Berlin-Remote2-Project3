import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useState, useEffect } from "react";
import useToken from "./useToken";
import { fetchMenuData, fetchTokenValidation, Category } from "./api";
import { LoginPage } from "./routes/LoginPage";
// import Menu from "./routes/Menu";
// import MenuContent from "./components/MenuContent";
import Dashboard from "./routes/Dashboard";
import ErrorDisplayView from "./components/ErrorDisplayView";

export interface UserInfo {
  id: number;
  name: string;
  typeId: number;
}

const App = () => {
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  const { token, setToken } = useToken();
  const [menuDataApi, setMenuDataApi] = useState([] as Category[]);

  // On component mount
  useEffect(() => {
    // Load menu data on startup
    const data = async () => {
      const res = await fetchMenuData();
      if (res !== undefined) {
        setMenuDataApi(res);
      } else {
        throw Error("failed to fetch menu data from server");
      }
    };
    data();

    // Validate token on startup and set user info if empty
    // (fixes issue when refresh is pressed)
    const validateToken = async () => {
      if (typeof token === "string") {
        const userInfo = await fetchTokenValidation(token);
        if (userInfo) setUserInfo(userInfo);
        else setToken("");
      }
    };
    validateToken();
  }, []);

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route
            path="/"
            errorElement={<ErrorDisplayView />}
            element={
              <LoginPage
                setToken={setToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                token={token}
              />
            }
          >
            <Route
              path="dashboard"
              errorElement={<ErrorDisplayView />}
              element={
                <Dashboard
                  token={token ?? ""}
                  userInfo={userInfo}
                  menuData={menuDataApi}
                />
              }
            >
              {/* <Route
                path="menu"
                errorElement={<h1>Error in menu</h1>}
                element={<Menu menuData={menuDataApi} />}
              >
                <Route
                  path=":tableId/:menuCategory?"
                  element={<MenuContent data={menuDataApi} />}
                  errorElement={<h1>yet another error</h1>}
                />
              </Route> */}
            </Route>
          </Route>
        )
      )}
    />
  );
};

export default App;
