import axios from 'axios';
import React from 'react';
import {
  MdFavorite,
  MdFavoriteBorder,
  MdKeyboardArrowLeft,
} from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

function WorkoutDetail(props) {
  const workout =
    props.workouts[
      props.workouts.map((x) => x.name).indexOf(useParams().workout)
    ];
  const [favorite, setFavorite] = React.useState(workout?.favorite);

  const exercises = workout?.exercises.map((x, i) => (
    <div
      key={i}
      className='flex items-center px-4 h-10 border-b border-neutral-600'
    >
      <div className='font-bold'>{x.name}</div>
      <div className='pl-4 text-neutral-400'>
        {x.type === 'Rep Count' ? `x${x.quantity}` : `${x.quantity}s`}
      </div>
    </div>
  ));

  function handleFavorite() {
    axios
      .put(
        `http://localhost:3001/api/${props.user.username}/updateWorkoutFavorite`,
        {
          _id: workout._id,
          favorite: !workout.favorite,
        }
      )
      .then((res) => {
        props.refreshUser();
        setFavorite((x) => !x);
      });
  }

  function handleDelete() {
    axios
      .delete(
        `http://localhost:3001/api/${props.user.username}/deleteWorkout`,
        {
          data: {
            _id: workout._id,
          },
        }
      )
      .then((res) => {
        props.refreshUser();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className='h-screen' onClick={props.drawerClick}>
      <div className='flex relative'>
        <Link to='..'>
          <button
            className='flex items-center rounded py-1 pr-3 absolute top-2 left-2 font-bold text-xl'
            style={{ backgroundColor: 'rgb(220, 20, 60)' }}
          >
            <MdKeyboardArrowLeft size='25px' /> Back
          </button>
        </Link>
        <div className='pt-2 mx-auto text-2xl'>{workout.name}</div>
      </div>
      <div className='flex justify-center items-center h-16 gap-3 md:gap-4 text-xs md:text-base'>
        <button
          onClick={handleFavorite}
          value={favorite}
          className='rounded px-1 flex items-center justify-center'
          style={{
            color: favorite ? 'rgb(220, 20, 60)' : 'rgb(82, 82, 82)',
          }}
        >
          {favorite ? (
            <MdFavorite size='25px' color='rgb(220, 20, 60)' />
          ) : (
            <MdFavoriteBorder size='25px' />
          )}
        </button>
        <button
          className='rounded px-2 py-1 md:py-0 font-semibold'
          style={{ backgroundColor: 'rgb(220, 20, 60)' }}
        >
          Edit Workout
        </button>
        <Link to='..'>
          <button
            className='rounded px-2 py-1 md:py-0 font-semibold'
            style={{ backgroundColor: 'rgb(220, 20, 60)' }}
            onClick={handleDelete}
          >
            Delete Workout
          </button>
        </Link>
      </div>
      {exercises}
    </div>
  );
}

export default WorkoutDetail;
