import React, { useEffect } from "react";
import SignInSide from "./components/SignInSide";
import SignUp from "./components/SignUp";
import Forgot from "./components/Forgot";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
// import Posts from './components/Posts/Posts';
// import Form from './components/SignInSide';
//import useStyles from './components/SignInSide';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  //const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      {/* use router switch */}
      <Router>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/FOrgot" element={<Forgot />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
