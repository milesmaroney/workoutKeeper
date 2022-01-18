const sampleWorkouts = [
  {
    _id: '1823y71823',
    name: 'WorkoutOne',
    favorite: false,
    category: 'Full Body',
    difficulty: 'Intermediate',
    duration: 45,
    exercises: [
      {
        name: 'Pull Ups',
        type: 'Rep Count',
        quantity: 20,
        difficulty: 'Advanced',
        category: 'Back',
      },
      {
        name: 'Squats',
        type: 'Rep Count',
        quantity: 20,
        difficulty: 'Beginner',
        category: 'Legs',
      },
      {
        name: 'Plank',
        type: 'Timed',
        quantity: 60,
        difficulty: 'Advanced',
        category: 'Core',
      },
    ],
  },
  {
    _id: '1iu2nkkajsd',
    name: 'WorkoutTwo',
    favorite: true,
    category: 'Lower Body',
    difficulty: 'Beginner',
    duration: 90,
    exercises: [
      {
        name: 'Push Ups',
        type: 'Rep Count',
        quantity: 20,
        difficulty: 'Advanced',
        category: 'Chest',
      },
      {
        name: 'Lunges',
        type: 'Rep Count',
        quantity: 20,
        difficulty: 'Beginner',
        category: 'Legs',
      },
      {
        name: 'Plank',
        type: 'Timed',
        quantity: 75,
        difficulty: 'Advanced',
        category: 'Core',
      },
    ],
  },
];
export default sampleWorkouts;
