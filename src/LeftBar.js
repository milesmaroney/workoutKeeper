import React from 'react';
import AddExercise from './AddExercise';
import Exercise from './Exercise';

function LeftBar(props) {
  const [filter, setFilter] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [hide, setHide] = React.useState(false);

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

  const exerciseList = props.exercises
    .sort(compareName)
    .sort(compareCategory)
    .filter((x) => x.category.includes(filter))
    .filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
    .map((exercise) => (
      <Exercise
        key={exercise._id}
        exercise={exercise}
        refreshUser={props.refreshUser}
        user={props.user}
      />
    ));

  const exerciseCategories = [
    ...new Set(props.exercises.sort(compareCategory).map((x) => x.category)),
  ];

  const exerciseOptions = [
    <option key={'All'} value={''}>
      All
    </option>,
    ...exerciseCategories.map((option, i) => <option key={i}>{option}</option>),
  ];

  return (
    <div
      className='flex-col w-full h-screen bg-neutral-700 border-r overflow-y-scroll'
      style={{
        borderColor: 'rgb(220, 20, 60)',
        display: hide ? 'none' : 'flex',
      }}
    >
      <div
        className='sticky top-0 bg-neutral-700 flex justify-center border-b gap-2 p-2'
        style={{ borderColor: 'rgb(220, 20, 60)' }}
      >
        <input
          className='rounded input w-1/2 indent-1'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder='Search'
        />
        <select
          className='rounded input w-1/2'
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          {exerciseOptions}
        </select>
      </div>
      {exerciseList}
      <AddExercise user={props.user} refreshUser={props.refreshUser} />
    </div>
  );
}

export default LeftBar;
