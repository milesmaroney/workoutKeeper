import axios from 'axios';
import React from 'react';
import config from './config';

function AddExercise(props) {
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('Rep Count');
  const [quantity, setQuantity] = React.useState('');
  const [category, setCategory] = React.useState('Arms');

  function handleSubmit() {
    if (name) {
      axios
        .post(`${config.server}/api/${props.user.username}/createExercise`, {
          name,
          type,
          quantity,
          category,
        })
        .then(() => {
          setName('');
          setType('Rep Count');
          setQuantity('');
          setCategory('Arms');
          props.setShowAdd(false);
          props.refreshUser();
        })
        .catch((err) => console.error(err));
    } else {
      alert('Name is Required');
    }
  }

  return (
    <div className='absolute bottom-10 flex flex-col w-full gap-3 p-2 py-3 rounded-t bg-neutral-800'>
      <input
        className='indent-1 input'
        onChange={(e) => setName(e.target.value)}
        value={name}
        type='text'
        placeholder='Name'
      />
      <select
        onChange={(e) => setType(e.target.value)}
        value={type}
        className='input'
      >
        <option>Rep Count</option>
        <option>Timed</option>
      </select>
      <input
        className='indent-1 input'
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        type='text'
        placeholder={type === 'Rep Count' ? 'Default Quantity' : 'Default Time'}
      />
      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className='input'
      >
        <option>Arms</option>
        <option>Back</option>
        <option>Chest</option>
        <option>Core</option>
        <option>Full Body</option>
        <option>Legs</option>
        <option>Shoulders</option>
      </select>
      <button
        className='w-full rounded font-bold disabled:opacity-70 disabled:cursor-not-allowed'
        disabled={!name}
        onClick={handleSubmit}
        style={{ backgroundColor: 'rgb(220, 20, 60)' }}
      >
        Submit
      </button>
    </div>
  );
}

export default AddExercise;
