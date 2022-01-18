import axios from 'axios';
import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';

function Exercise(props) {
  const [hovered, setHovered] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  const [name, setName] = React.useState(props.exercise.name);
  const [type, setType] = React.useState(props.exercise.type);
  const [quantity, setQuantity] = React.useState(props.exercise.quantity);
  const [difficulty, setDifficulty] = React.useState(props.exercise.difficulty);
  const [category, setCategory] = React.useState(props.exercise.category);

  function handleSubmit() {
    axios
      .put(`http://localhost:3001/api/${props.user.username}/updateExercise`, {
        _id: props.exercise._id,
        name,
        type,
        quantity,
        difficulty,
        category,
      })
      .then((res) => {
        setShowEdit(false);
        props.refreshUser();
      })
      .catch((err) => console.error(err));
  }

  function handleDelete() {
    axios
      .delete(
        `http://localhost:3001/api/${props.user.username}/deleteExercise`,
        {
          data: {
            _id: props.exercise._id,
          },
        }
      )
      .then((res) => {
        setShowEdit(false);
        props.refreshUser();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className='flex flex-col border-b border-neutral-500'>
      <div
        className={`w-full h-8 px-4 flex items-center cursor-pointer transition-all duration-150`}
        style={{ backgroundColor: showEdit || hovered ? 'rgb(30,30,30)' : '' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setShowEdit((x) => !x)}
      >
        <div>
          {showEdit ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
        </div>
        <div
          className={`pl-2 font-semibold transition-all duration-150`}
          style={{ color: showEdit || hovered ? 'rgb(220, 20, 60)' : '' }}
        >
          {props.exercise.name}
        </div>
        <div className='ml-auto text-neutral-500'>
          {props.exercise.category}
        </div>
      </div>
      {showEdit && (
        <div className='flex flex-col gap-2 p-2'>
          <input
            className='rounded indent-1 input'
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            placeholder='Name'
          />
          <select
            className='rounded input'
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option>Rep Count</option>
            <option>Timed</option>
          </select>
          <input
            className='rounded input indent-1'
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            type='text'
            placeholder={
              type === 'Rep Count' ? 'Default Quantity' : 'Default Time'
            }
          />
          <select
            className='rounded input'
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <select
            className='rounded input'
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option>Arms</option>
            <option>Back</option>
            <option>Chest</option>
            <option>Core</option>
            <option>Legs</option>
            <option>Shoulders</option>
          </select>
          <button
            className='rounded w-full font-bold'
            onClick={handleSubmit}
            style={{ backgroundColor: 'rgb(220, 20, 60)' }}
          >
            Submit
          </button>
          <button
            className='rounded w-full font-semibold'
            onClick={handleDelete}
            style={{ backgroundColor: 'rgb(110, 10, 30)' }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Exercise;
