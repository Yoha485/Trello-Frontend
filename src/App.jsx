import Welcome from "./components/welcome/Welcome";
import { MainPage } from "./components/MainPage";

import { useEffect } from "react";
import { setUserFromLocalStorage } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getUser } from "./features/user/userSlice";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      try {
        dispatch(getUser(foundUser.token));
        navigate(`/user/${foundUser.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Welcome />} />
      <Route path="/user">
        <Route path=":userId" element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default App;
