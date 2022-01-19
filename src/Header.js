import React from 'react';
import { IoIosMenu } from 'react-icons/io';
import useClickOutside from './useClickOutside';

function Header(props) {
  const greetings = ['Welcome', 'Hey', 'Hello', 'Lets Get It', 'Stay Hard'];

  const [showLogout, setShowLogout] = React.useState(false);

  const logout = React.useRef();

  useClickOutside(logout, () => setShowLogout(false));

  return (
    <div className='flex py-2 px-4 items-center bg-neutral-900'>
      <div
        className='cursor-pointer text-neutral-400'
        onClick={() => props.setHide((x) => !x)}
      >
        <IoIosMenu size='30px' />
      </div>
      <div className='pl-4'>workoutKeeper</div>
      <div
        className={`relative ml-auto text-sm cursor-pointer font-semibold transition-all duration-300 ${
          props.hide ? '' : 'hidden md:flex'
        }`}
        onClick={() => setShowLogout((x) => !x)}
      >
        <div className='hover:text-rose-600 transition-all duration-300'>
          {greetings[Math.floor(Math.random() * greetings.length)]},{' '}
          {props.user.username}
        </div>
        {showLogout && (
          <div
            className='absolute right-0 top-7 px-4 py-1 rounded hover:text-rose-600 bg-neutral-600 z-10'
            ref={logout}
            onClick={() => props.setUser({})}
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
