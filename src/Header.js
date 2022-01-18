import React from 'react';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs';
import useClickOutside from './useClickOutside';

function Header(props) {
  const greetings = ['Welcome', 'Hey', 'Hello', 'Lets Get It', 'Stay Hard'];

  const [showLogout, setShowLogout] = React.useState(false);

  const logout = React.useRef();

  useClickOutside(logout, () => setShowLogout(false));

  return (
    <div className='flex pr-8 py-2 items-center bg-neutral-900'>
      <div
        className='pl-2 cursor-pointer'
        onClick={() => props.setHide((x) => !x)}
      >
        {props.hide ? (
          <BsArrowBarRight size='30px' />
        ) : (
          <BsArrowBarLeft size='30px' />
        )}
      </div>
      <div
        className={`relative ml-auto text-sm cursor-pointer font-semibold transition-all duration-300 ${
          props.hide ? '' : 'hidden md:flex'
        }`}
        onClick={() => setShowLogout((x) => !x)}
      >
        <div className='hover:text-rose-600'>
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
