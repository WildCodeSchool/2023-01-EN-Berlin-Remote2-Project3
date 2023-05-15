import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import useToken from "./useToken";
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
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
