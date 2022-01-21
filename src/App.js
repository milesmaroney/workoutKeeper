import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Share from './Share';

function App(props) {
  const [user, setUser] = React.useState(
    () => JSON.parse(localStorage.getItem('workoutUser')) || {}
  );

  React.useEffect(() => {
    localStorage.setItem('workoutUser', JSON.stringify(user));
  }, [user]);

  return (
    <Routes>
      <Route path='*' element={<Navigate to='/login' />} />
      <Route
        path={`/${user.username}/*`}
        element={
          user.username ? (
            <Home setUser={setUser} user={user} />
          ) : (
            <Navigate to='/login' />
          )
        }
      />
      <Route
        path='/login'
        element={
          user.username ? (
            <Navigate to={`/${user.username}`} />
          ) : (
            <Login setUser={setUser} />
          )
        }
      />
      <Route path='/share/:user/:workout' element={<Share />} />
    </Routes>
  );
}

export default App;
