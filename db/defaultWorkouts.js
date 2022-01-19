const defaultWorkouts = [
  {
    name: 'Example Workout 1',
    favorite: false,
    category: 'Back & Biceps',
    duration: 45,
    exercises: [
      {
        name: 'One Arm Dumbbell Rows',
        type: 'Rep Count',
        quantity: '4 x 10e',
        category: 'Back',
      },
      {
        name: 'Lat Pulldowns',
        type: 'Rep Count',
        quantity: '4 x 10',
        category: 'Back',
      },
      {
        name: 'Seated Rows',
        type: 'Rep Count',
        quantity: '4 x 10',
        category: 'Back',
      },
      {
        name: 'One Arm Dumbbell Rows',
        type: 'Rep Count',
        quantity: '4 x 10e',
        category: 'Back',
      },
      {
        name: 'Hammer Curls',
        type: 'Rep Count',
        quantity: '4 x 10e',
        category: 'Arms',
      },
      {
        name: 'Preacher Curls',
        type: 'Rep Count',
        quantity: '4 x 10e',
        category: 'Arms',
      },
      {
        name: 'Pull Ups',
        type: 'Rep Count',
        quantity: '100',
        category: 'Back',
      },
    ],
  },
  {
    name: 'Example Favorite Workout',
    favorite: true,
    category: 'Lower Body',
    duration: 90,
    exercises: [
      {
        name: 'Jump Rope',
        type: 'Timed',
        quantity: '2 x 60',
        category: 'Legs',
      },
      {
        name: 'Walking Lunges',
        type: 'Rep Count',
        quantity: '4 x 10e',
        category: 'Legs',
      },
      {
        name: 'Squats',
        type: 'Rep Count',
        quantity: '4 x 20',
        category: 'Legs',
      },
      {
        name: 'Reverse Lunges',
        type: 'Rep Count',
        quantity: '3 x 10e',
        category: 'Legs',
      },
      {
        name: 'Jump Rope',
        type: 'Timed',
        quantity: '90',
        category: 'Legs',
      },
      {
        name: 'Bicycles',
        type: 'Rep Count',
        quantity: '3 x 15e',
        category: 'Core',
      },
    ],
  },
];

module.exports = defaultWorkouts;
