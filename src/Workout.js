import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Workout(props) {
  function convertTime(timeInMinutes) {
    if (timeInMinutes < 60) {
      return timeInMinutes + 'min';
    }
    let minutes = timeInMinutes % 60;
    let hours = Math.floor(timeInMinutes / 60);
    return `${hours}h ${minutes}min`;
  }
  return (
    <Link to={props.workout.name}>
      <div className='flex items-center px-4 h-16 bg-neutral-700 text-neutral-400 hover:bg-neutral-900 transition-all duration-150 cursor-pointer border-b border-neutral-500 relative'>
        <div
          className='absolute left-0 w-2 h-full'
          style={{
            backgroundColor: props.workout.favorite ? 'rgb(240, 40, 60)' : '',
          }}
        ></div>
        <div className='text-white font-bold'>{props.workout.name}</div>
        <div className='pl-4 mr-auto text-sm'>{props.workout.category}</div>
        {props.workout.favorite && (
          <div className='pr-2'>
            <MdFavorite size='20px' />
          </div>
        )}
        <div className=''>{convertTime(props.workout.duration)}</div>
      </div>
    </Link>
  );
}

export default Workout;
