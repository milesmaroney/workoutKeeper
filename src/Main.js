import Workout from './Workout';
import sampleWorkouts from './sampleWorkouts';
import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Main(props) {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [favorites, setFavorites] = React.useState(false);

  function compareCategory(a, b) {
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
    ...new Set(
      props.workouts.sort(compareCategory).map((workout) => workout.category)
    ),
  ];

  const categories = [
    <option key={'All'} value=''>
      All
    </option>,
    ...categoryNames.map((option, i) => (
      <option key={i} value={option.toLowerCase()}>
        {option}
      </option>
    )),
  ];

  const workouts = props.workouts
    .filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
    .filter((x) => x.category.toLowerCase().includes(category))
    .filter((x) => (favorites ? x.favorite : x))
    .sort(compareName)
    .map((workout) => (
      <Workout
        workout={workout}
        key={workout._id}
        setWorkout={props.setWorkout}
      />
    ));

  return (
    <div className='h-screen' onClick={props.drawerClick}>
      <div className='flex justify-center items-center h-16 gap-3 md:gap-4 text-xs md:text-base'>
        <button
          onClick={() => setFavorites((x) => !x)}
          value={favorites}
          className='rounded px-1 flex items-center justify-center'
          style={{
            backgroundColor: favorites ? 'rgb(220, 20, 60)' : 'rgb(82, 82, 82)',
          }}
        >
          {favorites ? (
            <MdFavorite size='25px' />
          ) : (
            <MdFavoriteBorder size='25px' />
          )}
        </button>
        <input
          className='input indent-1 w-1/4'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className='input pl-1 pr-2'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories}
        </select>
        <Link to='create'>
          <button
            className='rounded px-2 py-1 md:py-0 font-semibold'
            style={{ backgroundColor: 'rgb(220, 20, 60)' }}
          >
            Create Workout
          </button>
        </Link>
      </div>
      {workouts}
    </div>
  );
}

export default Main;
