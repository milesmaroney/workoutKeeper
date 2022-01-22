import axios from 'axios';
import React from 'react';
import Header from './Header';
import LeftBar from './LeftBar';
import Main from './Main';
import { Route, Routes } from 'react-router-dom';
import CreateWorkout from './CreateWorkout';
import WorkoutDetail from './WorkoutDetail';
import { useSwipeable } from 'react-swipeable';

function Home(props) {
  const [workouts, setWorkouts] = React.useState(props.user?.workouts);
  const [exercises, setExercises] = React.useState(props.user?.exercises);

  const [hide, setHide] = React.useState(
    window.screen.width >= 500 ? false : true
  );

  React.useEffect(() => {
    refreshUser();
  }, []);

  function refreshUser() {
    axios
      .get(`${process.env.REACT_APP_server}/api/${props.user.username}`)
      .then(({ data }) => {
        props.setUser({
          _id: data._id,
          username: data.username,
          exercises: data.exercises,
          workouts: data.workouts,
        });
        setExercises(data.exercises);
        setWorkouts(data.workouts);
      })
      .catch((err) => console.error(err));
  }

  function drawerClick() {
    if (!hide && window.screen.width <= 500) {
      setHide((x) => !x);
    }
  }

  const swipeHandler = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === 'Right') {
        setHide(false);
      }
      if (eventData.dir === 'Left') {
        setHide(true);
      }
    },
  });

  return (
    <div
      {...swipeHandler}
      className='h-screen min-w-screen flex bg-neutral-800 text-white overflow-hidden'
    >
      <div
        className={`${
          hide ? 'w-0' : 'min-w-[80%] md:min-w-fit w-5/6 md:w-1/3'
        } h-screen relative`}
      >
        <LeftBar
          user={props.user}
          exercises={exercises}
          refreshUser={refreshUser}
        />
      </div>
      <div className='flex flex-col h-screen grow'>
        <Header
          setUser={props.setUser}
          user={props.user}
          setHide={setHide}
          hide={hide}
        />
        <Routes>
          <Route
            path={`/`}
            element={
              <Main
                user={props.user}
                workouts={workouts}
                refreshUser={refreshUser}
                setHide={setHide}
                hide={hide}
                drawerClick={drawerClick}
              />
            }
          />
          <Route
            path={`/:workout`}
            element={
              <WorkoutDetail
                workouts={workouts}
                exercises={exercises}
                drawerClick={drawerClick}
                user={props.user}
                refreshUser={refreshUser}
              />
            }
          />
          <Route
            path={`/create`}
            element={
              <CreateWorkout
                workouts={workouts}
                exercises={exercises}
                drawerClick={drawerClick}
                user={props.user}
                refreshUser={refreshUser}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
