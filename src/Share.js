import axios from 'axios';
import React from 'react';
import {
  MdFavorite,
  MdFavoriteBorder,
  MdKeyboardArrowLeft,
} from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import WorkoutDetailExercise from './WorkoutDetailExercise';

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
        if (result.data.workouts[0].share) {
          setWorkout(result.data.workouts[0]);
          setName(result.data.workouts[0].name);
          setFavorite(result.data.workouts[0].favorite);
          setShare(result.data.workouts[0].share);
          setWorkoutExercises(result.data.workouts[0].exercises);
          setDuration(result.data.workouts[0].duration);
          setCategory(result.data.workouts[0].category);
        } else {
          setForbidden(true);
        }
      })
      .catch((err) => {
        setForbidden(true);
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
            className='flex flex-col justify-center items-center pb-4 border-b'
            style={{ borderColor: 'rgb(220, 40, 60)' }}
          >
            <div className='pt-3 md:pt-2 mx-auto font-bold text-lg md:text-3xl'>
              {workoutName}
            </div>
            <div className='text-neutral-400'>by {username}</div>
          </div>

          {exerciseElements}
        </div>
      )}
    </div>
  );
}

export default WorkoutDetail;
