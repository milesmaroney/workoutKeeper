import axios from 'axios';
import React from 'react';
import {
  MdFavorite,
  MdFavoriteBorder,
  MdKeyboardArrowLeft,
} from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import WorkoutDetailExercise from './WorkoutDetailExercise';
import Logo from './assets/workoutKeeperSmall.png';

function WorkoutDetail(props) {
  const workoutName = useParams().workout;
  const username = useParams().user;

  const [forbidden, setForbidden] = React.useState(false);

  const [workout, setWorkout] = React.useState({});
  const [name, setName] = React.useState();
  const [workoutExercises, setWorkoutExercises] = React.useState([]);
  const [favorite, setFavorite] = React.useState();
  const [share, setShare] = React.useState();
  const [duration, setDuration] = React.useState();
  const [category, setCategory] = React.useState();
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    loadWorkout();
  }, []);

  const exerciseElements = workoutExercises.map((x, i) => (
    <WorkoutDetailExercise
      exercise={x}
      key={i}
      exercises={workoutExercises}
      setExercises={setWorkoutExercises}
      index={i}
    />
  ));

  function loadWorkout() {
    axios
      .get(`${process.env.REACT_APP_server}/api/${username}/${workoutName}`)
      .then((result) => {
        setWorkout(result.data.workouts[0]);
        setName(result.data.workouts[0].name);
        setFavorite(result.data.workouts[0].favorite);
        setShare(result.data.workouts[0].share);
        setWorkoutExercises(result.data.workouts[0].exercises);
        setDuration(result.data.workouts[0].duration);
        setCategory(result.data.workouts[0].category);
        document.title = `${workoutName} by ${username} - workoutKeeper`;
      })
      .catch((err) => {
        setForbidden(true);
        document.title = `Not Found - workoutKeeper`;
      });
  }

  function handleSave() {
    axios
      .post(
        `${process.env.REACT_APP_server}/api/${props.user.username}/createWorkout`,
        {
          name,
          exercises: workoutExercises,
          duration: duration,
          category,
        }
      )
      .then(() => setSaved(true))
      .catch((err) => {
        alert('Could not save workout');
        console.error(err);
      });
  }

  return (
    <div className='bg-neutral-800 text-white h-screen w-screen'>
      {forbidden && (
        <div className='h-full w-full flex items-center justify-center text-3xl'>
          WORKOUT NOT FOUND
        </div>
      )}
      {!forbidden && (
        <div className='overflow-y-scroll overflow-x-hidden'>
          <div
            className='flex flex-col justify-center items-center pt-4 md:pt-0 border-b'
            style={{ borderColor: 'rgb(220, 40, 60)' }}
          >
            <div className='flex flex-col md:flex-row w-full px-8 items-center justify-center'>
              <div className='flex items-center justify-center md:justify-start md:w-1/3 pb-2 md:pb-0'>
                <Link to='/' className='w-3/4 md:w-1/2'>
                  <img src={Logo} alt='Logo' />
                </Link>
              </div>
              <div className='flex flex-col items-center md:w-1/3'>
                <div className='pt-3 md:pt-2 mx-auto font-bold text-2xl md:text-3xl'>
                  {workoutName}
                </div>
                <div className='text-neutral-400 pb-4'>
                  created by {username}
                </div>
              </div>
              <div className='flex md:w-1/3 pb-4 md:pb-0'>
                {props.user.username && (
                  <button
                    className='flex md:ml-auto items-center rounded py-1 px-3 font-bold text-sm md:text-xl'
                    style={{
                      backgroundColor: saved
                        ? 'rgb(100, 100, 100)'
                        : 'rgb(220, 20, 60)',
                    }}
                    onClick={handleSave}
                    disabled={saved}
                  >
                    {saved ? 'Saved' : 'Save Workout'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {exerciseElements}
        </div>
      )}
    </div>
  );
}

export default WorkoutDetail;
