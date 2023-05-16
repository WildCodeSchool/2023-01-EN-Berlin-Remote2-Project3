import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import useToken from "./useToken";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const App = () => {
  const { token, setToken } = useToken();
  // window.onbeforeunload = function (e) {
  //   console.log(e);
  //   return "";
  // };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route errorElement={<h1>Error mada faka</h1>}>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        )
      )}
    />
  );
};

export default App;
