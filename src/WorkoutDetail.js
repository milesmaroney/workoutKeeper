import axios from 'axios';
import React from 'react';
import {
  MdFavorite,
  MdFavoriteBorder,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import WorkoutDetailExercise from './WorkoutDetailExercise';

function WorkoutDetail(props) {
  const workout =
    props.workouts[
      props.workouts.map((x) => x.name).indexOf(useParams().workout)
    ];
  const [name, setName] = React.useState(workout.name);
  const [workoutExercises, setWorkoutExercises] = React.useState(
    workout.exercises
  );
  const [favorite, setFavorite] = React.useState(workout.favorite);
  const [share, setShare] = React.useState(workout.share || false);
  const [duration, setDuration] = React.useState(workout.duration);
  const [category, setCategory] = React.useState(workout.category);
  const [toggleEdit, setToggleEdit] = React.useState(false);
  const [showCopied, setShowCopied] = React.useState(false);

  const [newExerciseName, setNewExerciseName] = React.useState(
    props.exercises[0]?.name
  );
  const [newExerciseQuantity, setNewExerciseQuantity] = React.useState('');

  React.useEffect(() => {
    document.title = workout.name;
  }, []);

  function compareName(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }
  function compareCategory(a, b) {
    if (a.category.toLowerCase() < b.category.toLowerCase()) {
      return -1;
    }
    if (a.category.toLowerCase() > b.category.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  const categoryNames = [
    ...new Set(
      props.workouts.sort(compareCategory).map((workout) => workout.category)
    ),
  ];

  const exerciseNames = props.exercises.map((x) => x.name);

  const categories = [
    ...categoryNames.map((option, i) => (
      <option key={i} value={option}>
        {option}
      </option>
    )),
    <option key={'AddNew'} value='addNew'>
      + Add New
    </option>,
  ];

  const exerciseOptions = props.exercises
    .sort(compareName)
    .map((x) => <option key={x._id}>{x.name}</option>);

  const [newCategory, setNewCategory] = React.useState('');

  React.useEffect(() => {
    updateWorkout();
  }, [workoutExercises, category]);

  function handleAdd() {
    setWorkoutExercises((x) => [
      ...x,
      {
        ...props.exercises[exerciseNames.indexOf(newExerciseName)],
        quantity: newExerciseQuantity,
      },
    ]);
    setNewExerciseQuantity('');
  }

  function handleClear() {
    setNewExerciseName(props.exercises[0]?.name);
    setNewExerciseQuantity('');
  }

  function handleCopy() {
    setTimeout(() => {
      setShowCopied(false);
    }, 3000);
  }

  const exerciseElements = workoutExercises.map((x, i) => (
    <WorkoutDetailExercise
      exercise={x}
      key={i}
      toggleEdit={toggleEdit}
      exercises={workoutExercises}
      setExercises={setWorkoutExercises}
      index={i}
      updateWorkout={updateWorkout}
    />
  ));

  function updateWorkout() {
    axios
      .put(
        `${process.env.REACT_APP_server}/api/${props.user.username}/updateWorkout`,
        {
          _id: workout._id,
          name: name,
          favorite: favorite,
          share: share,
          duration: duration,
          category: category,
          exercises: workoutExercises,
        }
      )
      .then((result) => props.refreshUser())
      .catch((err) => console.error(err));
  }

  function handleFavorite() {
    axios
      .put(
        `${process.env.REACT_APP_server}/api/${props.user.username}/updateWorkoutFavorite`,
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

  function handleShareToggle() {
    axios
      .put(
        `${process.env.REACT_APP_server}/api/${props.user.username}/updateWorkoutShare`,
        {
          _id: workout._id,
          share: !workout.share,
        }
      )
      .then((res) => {
        props.refreshUser();
        setShare((x) => !x);
      });
  }

  function handleShare() {
    if (!workout.share) {
      handleShareToggle();
    }
    setShowCopied(true);
    handleCopy();
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_server}/share/${
        props.user.username
      }/${name.replaceAll(' ', '%20')}`
    );
  }

  function handleDelete() {
    axios
      .delete(
        `${process.env.REACT_APP_server}/api/${props.user.username}/deleteWorkout`,
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
    <div
      className='h-screen overflow-y-scroll overflow-x-hidden'
      onClick={props.drawerClick}
    >
      <div className='flex relative'>
        <Link to='..' className='absolute top-3 left-2'>
          <MdKeyboardArrowLeft size='25px' />
        </Link>
        <div className='flex items-center pt-3 md:pt-2 mx-auto text-lg md:text-2xl relative'>
          {workout.name}
          <button
            onClick={handleFavorite}
            value={favorite}
            className='absolute -right-10 top-3'
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
        </div>
      </div>
      <div className='text-center text-sm text-neutral-500'>
        {toggleEdit ? (
          <input
            className='input rounded indent-1 mt-1 text-white'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        ) : (
          workout.category
        )}
      </div>
      <div className='flex justify-center items-center h-16 gap-3 md:gap-4 text-xs md:text-base'>
        <Link to={`../${name}`}>
          <button
            onClick={() => setToggleEdit((x) => !x)}
            className='rounded px-2 py-1 md:py-0 font-semibold'
            style={{ backgroundColor: 'rgb(220, 20, 60)' }}
          >
            {toggleEdit ? 'Finish Editing' : 'Edit Workout'}
          </button>
        </Link>

        <button
          onClick={handleShare}
          className='rounded px-2 py-1 md:py-0 font-semibold w-28 md:w-32'
          style={{ backgroundColor: 'rgb(220, 20, 60)' }}
        >
          {showCopied ? 'Link Copied!' : 'Share Workout'}
        </button>
      </div>
      {toggleEdit && (
        <>
          <div className='flex justify-center items-center pb-4 text-xs md:text-base gap-3 md:gap-4'>
            <Link to='..'>
              <button
                className='rounded px-2 py-1 md:py-0 font-semibold'
                style={{ backgroundColor: 'rgb(110, 10, 30)' }}
                onClick={handleDelete}
              >
                Delete Workout
              </button>
            </Link>
            <button
              className='rounded px-2 py-1 md:py-0 font-semibold w-24 md:w-32'
              style={{
                backgroundColor: share
                  ? 'rgb(220, 20, 60)'
                  : 'rgb(110, 10, 30)',
              }}
              onClick={handleShareToggle}
            >
              {share ? 'Set to Private' : 'Set to Public'}
            </button>
          </div>
          <div className='flex gap-2 md:gap-4 pt-2 px-4 pb-8 justify-between items-center text-sm md:text-base'>
            <div className='flex flex-col w-2/5'>
              <div className='font-bold'>Add Exercise</div>
              <select
                className='w-full input indent-1'
                onChange={(e) => {
                  setNewExerciseName(e.target.value);
                }}
                value={newExerciseName}
              >
                {exerciseOptions}
              </select>
            </div>
            <div className='flex flex-col w-2/5'>
              <div className='font-bold'>
                {props.exercises[exerciseNames.indexOf(newExerciseName)]
                  .type === 'Rep Count'
                  ? 'Reps / Sets'
                  : 'Time in Seconds'}
              </div>
              <input
                className='w-full input indent-1'
                onChange={(e) => setNewExerciseQuantity(e.target.value)}
                placeholder={
                  props.exercises[exerciseNames.indexOf(newExerciseName)]
                    .quantity
                }
                value={newExerciseQuantity}
              />
            </div>
            <div className='flex w-1/5 self-end'>
              <button
                className='rounded py-0.5 md:pt-0 px-2 w-full font-bold disabled:opacity-70 disabled:cursor-not-allowed'
                style={{ backgroundColor: 'rgb(220, 30, 60)' }}
                disabled={!newExerciseQuantity || !newExerciseName}
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}
      {exerciseElements}
    </div>
  );
}

export default WorkoutDetail;
