import React, { useEffect } from "react";
import SignInSide from "./components/SignInSide";
import SignUp from "./components/SignUp";
import Forgot from "./components/Forgot";
import Map from "./components/Map";
import Verified from "./components/Verified";
import Password from "./components/Password";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/posts";

// import Posts from './components/Posts/Posts';
// import Form from './components/SignInSide';
//import useStyles from './components/SignInSide';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  //const classes = useStyles();
  /*
  const dispatch = useDispatch();

  /*useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
*/
  return (
    <div>
      {/* use router switch */}
      <Router>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Verified/:parameter1" element={<Verified />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Password/:parameter2" element={<Password />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
