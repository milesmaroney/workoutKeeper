import axios from 'axios';
import React from 'react';
import Logo from './assets/workoutKeeper.png';
import config from './config';

function Login(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newUsername, setNewUsername] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

  function handleLogin() {
    axios
      .get(`${config.server}/api/login/${username}/${password}`)
      .then((res) => {
        if (res.data.username) {
          props.setUser(res.data);
        }
      })
      .catch((err) => console.error('Incorrect Login', err));
  }

  function handleSignup() {
    if (newPassword === confirmNewPassword) {
      axios
        .post(`${config.server}/api/signup`, {
          username: newUsername,
          password: newPassword,
        })
        .then((res) => {
          props.setUser({
            _id: res.data._id,
            username: res.data.username,
            exercises: res.data.exercises,
            workouts: res.data.workouts,
          });
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <div className='h-screen w-screen bg-slate-500'>
      <img src={Logo} alt='workoutKeeper' className='mx-auto py-12 w-1/2' />
      <div className='h-full w-full flex justify-evenly'>
        <div className='w-1/3 flex flex-col'>
          Username:
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className='w-1/3 flex flex-col'>
          Username:
          <input
            type='text'
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          Password:
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          Password:
          <input
            type='password'
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
