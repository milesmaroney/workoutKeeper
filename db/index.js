const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const defaultExercises = require('./defaultExercises');
const Options = require('./config.js');
const defaultWorkouts = require('./defaultWorkouts');

mongoose.connect(Options.mongoURI, (err) => {
  if (err) {
    throw err;
  }
  console.log('DB Connected');
});

const exerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: String,
  category: String,
});

const workoutSchema = new mongoose.Schema({
  name: String,
  favorite: { type: Boolean, default: false },
  category: String,
  duration: Number,
  exercises: [exerciseSchema],
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  workouts: { type: [workoutSchema], default: defaultWorkouts },
  exercises: { type: [exerciseSchema], default: defaultExercises },
});

userSchema.pre('save', function (next) {
  const thisUser = this;
  if (!thisUser.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(thisUser.password, salt, (err, hash) => {
      if (err) next(err);
      thisUser.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = (attempted, cb) => {
  bcrypt.compare(attempted, this.password, (err, isMatch) => {
    if (err) cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);
const Workout = mongoose.model('Workout', workoutSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = { User, Workout, Exercise };
