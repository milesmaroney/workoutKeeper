import React from 'react';
import { MdDeleteForever, MdEdit, MdKeyboardArrowRight } from 'react-icons/md';

function WorkoutDetailExercise(props) {
  const [showEdit, setShowEdit] = React.useState(false);
  const [editQuantity, setEditQuantity] = React.useState(
    props.exercise.quantity
  );

  // const [hover, setHover] = React.useState(false);

  function handleDelete(index) {
    let spliced = [...props.exercises];
    spliced.splice(index, 1);
    props.setExercises(spliced);
  }

  function handleEdit(index) {
    let copy = [...props.exercises];
    copy[index].quantity = editQuantity;
    props.setExercises(copy);
    setShowEdit(false);
    props.updateWorkout();
  }

  return (
    <div
      className='flex md:text-2xl border-b border-neutral-500 py-2 px-2 md:px-4 items-center h-16'
      // onMouseEnter={() => setHover(true)}
      // onMouseLeave={() => setHover(false)}
    >
      <div className='w-2/5'>{props.exercise.name}</div>
      <div
        className={`ml-${props.toggleEdit ? '4' : 'auto'} text-sm md:text-base`}
      >
        {props.exercise.type === 'Rep Count'
          ? `${props.exercise.quantity} Reps`
          : `${props.exercise.quantity}s`}
      </div>
      {showEdit && (
        <div className='flex ml-2 items-center'>
          <MdKeyboardArrowRight />
          <input
            className='input rounded indent-1 ml-2 w-1/2'
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
          />
          <button
            className='rounded text-base font-bold px-1 ml-2'
            style={{ backgroundColor: 'rgb(220, 40, 60)' }}
            disabled={editQuantity === ''}
            onClick={() => handleEdit(props.index)}
          >
            Save
          </button>
        </div>
      )}
      {props.toggleEdit && (
        <>
          <div
            className='ml-auto cursor-pointer transition-all duration-300'
            onClick={() => setShowEdit((x) => !x)}
          >
            <MdEdit size='25px' />
          </div>
          <div
            className='pl-4 cursor-pointer transition-all duration-300'
            onClick={() => handleDelete(props.index)}
          >
            <MdDeleteForever size='25px' />
          </div>
        </>
      )}
    </div>
  );
}

export default WorkoutDetailExercise;
