import React, { useEffect } from 'react';
import SignInSide from './components/SignInSide';

import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
// import Posts from './components/Posts/Posts';
// import Form from './components/SignInSide';
//import useStyles from './components/SignInSide';

const App = () => {
  //const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      {/*<Posts />*/}
      <SignInSide />
    </div>
  );
};

export default App;
