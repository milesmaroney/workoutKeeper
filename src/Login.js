import axios from 'axios';
import React from 'react';
import Logo from './assets/workoutKeeper.png';

function Login(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newUsername, setNewUsername] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const validation = '^[a-zA-Z0-9_]*$';

  function handleLogin() {
    if (!username.match(validation) || !password.match(validation)) {
      setErrorMessage('Invalid Fields');
      handlePopup();
      return;
    }
    if (!username || !password) {
      setErrorMessage('Complete All Fields');
      handlePopup();
      return;
    }
    axios
      .get(`${process.env.REACT_APP_server}/api/login/${username}/${password}`)
      .then((res) => {
        if (res.data.username) {
          props.setUser(res.data);
        }
      })
      .catch((err) => {
        console.error('Bad Login');
        setErrorMessage('Incorrect Login');
        handlePopup();
      });
  }

  function handlePopup() {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  }

  function handleSignup() {
    if (
      !newUsername.match(validation) ||
      !newPassword.match(validation) ||
      !confirmNewPassword.match(validation)
    ) {
      setErrorMessage('Invalid Fields');
      handlePopup();
      return;
    }
    if (!newUsername || !newPassword || !confirmNewPassword) {
      setErrorMessage('Complete All Fields');
      handlePopup();
      return;
    }
    if (newPassword === confirmNewPassword) {
      axios
        .post(`${process.env.REACT_APP_server}/api/signup`, {
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
        .catch((err) => {
          console.error('User Exists');
          setErrorMessage('User Exists');
          handlePopup();
        });
    } else {
      setErrorMessage('Passwords Dont Match');
      handlePopup();
    }
  }

  return (
    <div className='h-screen w-screen bg-neutral-800 text-white'>
      <div className='mx-auto py-12 w-2/3 relative'>
        <img src={Logo} alt='workoutKeeper' />
        <div
          className='absolute bottom-0 left-1/2 -translate-x-1/2 text-sm md:text-base border border-red-600 text-red-600 font-bold px-4 py-2 min-w-fit rounded transition-all duration-300'
          style={{
            opacity: showError ? '1' : '0',
            display: showError ? '' : 'hidden',
          }}
        >
          {errorMessage}
        </div>
      </div>
      <div className='md:h-full w-full flex flex-col md:flex-row md:justify-evenly'>
        <div className='px-4 md:px-0 md:w-1/3 flex flex-col'>
          <div className='font-bold pt-4'>Username:</div>
          <input
            className='input rounded'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className='font-bold pt-4'>Password:</div>
          <input
            className='input rounded'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='rounded w-full font-bold mt-2'
            style={{ backgroundColor: 'rgb(240, 20, 60)' }}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className='pt-12 md:pt-0 px-4 md:px-0 md:w-1/3 flex flex-col'>
          <div className='font-bold pt-4'>Username:</div>
          <input
            className='input rounded'
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <div className='font-bold pt-4'>Password:</div>
          <input
            className='input rounded'
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className='font-bold pt-4'>Confirm Password:</div>
          <input
            className='input rounded'
            type='password'
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button
            className='rounded w-full font-bold mt-2'
            style={{ backgroundColor: 'rgb(240, 20, 60)' }}
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
