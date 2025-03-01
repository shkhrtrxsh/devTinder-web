import NavBar from "./NavBar";
import Body from "./Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<div>Login</div>} />
            <Route path="/profile" element={<div>Profile</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
