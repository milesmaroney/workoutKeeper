import axios from 'axios';
import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import CreateWorkoutExercise from './CreateWorkoutExercise';

function CreateWorkout(props) {
  const [name, setName] = React.useState(
    () => JSON.parse(localStorage.getItem('workoutInProgress'))?.name || ''
  );
  const [exercises, setExercises] = React.useState(
    () => JSON.parse(localStorage.getItem('workoutInProgress'))?.exercises || []
  );

  const exerciseNames = props.exercises.map((x) => x.name);

  const [newExerciseName, setNewExerciseName] = React.useState(
    props.exercises[0]?.name
  );
  const [newExerciseQuantity, setNewExerciseQuantity] = React.useState('');

  React.useEffect(() => {
    document.title = 'Create a Workout';
  }, []);

  function compare(a, b) {
    if (a.category.toLowerCase() < b.category.toLowerCase()) {
      return -1;
    }
    if (a.category.toLowerCase() > b.category.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  function compareName(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  const categoryNames = [
    ...new Set(props.workouts.sort(compare).map((workout) => workout.category)),
  ];

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

  const [category, setCategory] = React.useState(
    () =>
      JSON.parse(localStorage.getItem('workoutInProgress'))?.category ||
      categoryNames[0] ||
      'addNew'
  );
  const [newCategory, setNewCategory] = React.useState(
    () =>
      JSON.parse(localStorage.getItem('workoutInProgress'))?.newCategory || ''
  );

  React.useEffect(() => {
    localStorage.setItem(
      'workoutInProgress',
      JSON.stringify({
        name: name.trim(),
        exercises,
        category: category.trim(),
        newCategory: newCategory.trim(),
      })
    );
  }, [name, exercises, category, newCategory]);

  function handleAdd() {
    setExercises((x) => [
      ...x,
      {
        ...props.exercises[exerciseNames.indexOf(newExerciseName)],
        quantity: newExerciseQuantity.trim(),
      },
    ]);
    setNewExerciseQuantity('');
  }

  function handleClear() {
    if (
      window.confirm("Are you sure? This will reset what you've done so far")
    ) {
      setNewExerciseName(props.exercises[0]?.name);
      setNewExerciseQuantity('');
      setName('');
      setExercises([]);
      setCategory(categoryNames[0] || 'addNew');
      setNewCategory('');
    }
  }

  function handleSubmit() {
    axios
      .post(
        `${process.env.REACT_APP_server}/api/${props.user.username}/createWorkout`,
        {
          name: name.trim(),
          exercises,
          category:
            category === 'addNew' ? newCategory.trim() : category.trim(),
        }
      )
      .then((res) => {
        props.refreshUser();
        localStorage.removeItem('workoutInProgress');
      });
  }

  return (
    <div
      className='h-screen flex flex-col overflow-y-scroll overflow-x-hidden'
      onClick={props.drawerClick}
    >
      <div className='flex h-16 relative'>
        <Link to='..' className='absolute top-3 left-2'>
          <MdKeyboardArrowLeft size='25px' />
        </Link>
        <div className='pt-2 mx-auto text-2xl'>Create Workout</div>
      </div>
      <div className='flex flex-col px-2 md:px-8 text-sm md:text-base'>
        <div className='flex w-full justify-between gap-2 md:gap-4 pt-2'>
          <div className='flex flex-col w-1/2'>
            <div className='font-bold'>Workout Name</div>
            <input
              className='w-full input indent-1'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className='flex flex-col w-1/2'>
            <div className='font-bold'>Category</div>
            <select
              className='w-full min-w-fit input indent-1'
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {categories}
            </select>
          </div>
        </div>
        {category === 'addNew' && (
          <input
            className='w-full input indent-1 mt-2'
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder='New Category'
            value={newCategory}
          />
        )}
        <div className='flex gap-2 md:gap-4 pt-2 pb-8 justify-between items-center'>
          <div className='flex flex-col w-1/3'>
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
          <div className='flex flex-col w-1/3'>
            <div className='font-bold'>
              {props.exercises[exerciseNames.indexOf(newExerciseName)]?.type ===
              'Rep Count'
                ? 'Sets x Reps'
                : 'Time in Seconds'}
            </div>
            <input
              className='w-full input indent-1'
              onChange={(e) => setNewExerciseQuantity(e.target.value)}
              placeholder={
                props.exercises[exerciseNames.indexOf(newExerciseName)].quantity
              }
              value={newExerciseQuantity}
            />
          </div>
          <div className='flex w-1/3 self-end'>
            <button
              className='rounded-l py-0.5 md:pt-0 px-2 w-3/5 md:w-2/3 font-bold disabled:opacity-70 disabled:cursor-not-allowed'
              style={{ backgroundColor: 'rgb(220, 30, 60)' }}
              disabled={!newExerciseQuantity || !newExerciseName}
              onClick={handleAdd}
            >
              Add
            </button>
            <button
              className='rounded-r px-1 md:px-2 w-2/5 md:w-1/3'
              style={{ backgroundColor: 'rgb(110, 15, 30)' }}
              onClick={handleClear}
              disabled={!name && !exercises.length}
            >
              Reset
            </button>
          </div>
        </div>
        {!exercises.length && <div className='pt-2'>No Exercises Yet...</div>}
        <div className='pt-2'>
          {exercises.map((exercise, i) => (
            <CreateWorkoutExercise
              key={uuid()}
              exercise={exercise}
              index={i}
              setExercises={setExercises}
              exercises={exercises}
            />
          ))}
        </div>
      </div>
      <Link to='..' className='mt-auto sticky bottom-0'>
        <button
          className='align-middle w-full font-semibold py-2 mt-auto sticky bottom-0 border-l border-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={handleSubmit}
          disabled={
            !exercises.length ||
            !name ||
            (category === 'addNew' && !newCategory)
          }
          style={{
            backgroundColor: 'rgb(220, 20, 60)',
          }}
        >
          Create
        </button>
      </Link>
    </div>
  );
}

export default CreateWorkout;
