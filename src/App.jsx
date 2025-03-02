import NavBar from "./NavBar";
import Body from "./Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<div>Profile</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
