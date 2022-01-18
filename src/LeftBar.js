import React from 'react';
import AddExercise from './AddExercise';
import Exercise from './Exercise';

function LeftBar(props) {
  const [filter, setFilter] = React.useState('');
  const [hide, setHide] = React.useState(false);

  function compare(a, b) {
    if (a.category.toLowerCase() < b.category.toLowerCase()) {
      return -1;
    }
    if (a.category.toLowerCase() > b.category.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  const exerciseList = props.exercises
    .sort(compare)
    .filter((x) => x.category.includes(filter))
    .map((exercise) => (
      <Exercise
        key={exercise._id}
        exercise={exercise}
        refreshUser={props.refreshUser}
        user={props.user}
      />
    ));

  const exerciseCategories = [
    ...new Set(props.exercises.sort(compare).map((x) => x.category)),
  ];

  const exerciseOptions = [
    <option key={'All'} value={''}>
      All
    </option>,
    ...exerciseCategories.map((option, i) => <option key={i}>{option}</option>),
  ];

  const [showAdd, setShowAdd] = React.useState(false);

  return (
    <div
      className='flex-col w-full h-screen bg-neutral-700 border-r relative overflow-y-scroll'
      style={{
        borderColor: 'rgb(220, 20, 60)',
        display: hide ? 'none' : 'flex',
      }}
    >
      <select
        className='rounded input m-2'
        onChange={(e) => setFilter(e.target.value)}
      >
        {exerciseOptions}
      </select>
      {exerciseList}
      <button
        className='align-middle font-semibold py-2 mt-auto sticky bottom-0'
        onClick={() => setShowAdd((x) => !x)}
        style={{ backgroundColor: 'rgb(220, 20, 60)' }}
      >
        {showAdd ? 'Cancel' : 'Add New Exercise'}
      </button>
      {/* <div className='mt-auto text-center h-10 min-h-max w-full shadow hover:shadow-black sticky bottom-0 z-10 cursor-pointer'></div> */}
      {showAdd && (
        <AddExercise
          user={props.user}
          setShowAdd={setShowAdd}
          refreshUser={props.refreshUser}
        />
      )}
    </div>
  );
}

export default LeftBar;
