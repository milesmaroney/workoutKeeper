const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const db = require('../db');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const PORT = process.env.REACT_APP_PORT || 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../build')));

// ------- LOAD USER CONTENT -------
app.get('/api/:username', (req, res) => {
  db.User.findOne({ username: req.params.username })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
});

// ------- ADD CONTENT TO USER -------
app.post('/api/:username/createExercise', (req, res) => {
  db.User.findOneAndUpdate(
    { username: req.params.username },
    {
      $push: {
        exercises: {
          name: req.body.name,
          type: req.body.type,
          quantity: req.body.quantity,
          difficulty: req.body.difficulty,
          category: req.body.category,
        },
      },
    }
  )
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err));
});

app.post('/api/:username/createWorkout', (req, res) => {
  db.User.findOneAndUpdate(
    { username: req.params.username },
    {
      $push: {
        workouts: {
          name: req.body.name,
          category: req.body.category,
          difficulty: req.body.difficulty,
          duration: req.body.duration,
          exercises: req.body.exercises,
        },
      },
    }
  )
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err));
});

app.post('/api/:username/createWorkout', (req, res) => {
  db.User.findOneAndUpdate(
    { username: req.params.username },
    {
      $push: {
        workouts: {
          name: req.body.name,
          category: req.body.category,
          difficulty: req.body.difficulty,
          duration: req.body.duration,
          exercises: req.body.exercises,
        },
      },
    }
  )
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err));
});

// ------- EDIT USER CONTENT -------

app.put('/api/:username/updateExercise', (req, res) => {
  db.User.findOneAndUpdate(
    { username: req.params.username, 'exercises._id': req.body._id },
    {
      'exercises.$.name': req.body.name,
      'exercises.$.type': req.body.type,
      'exercises.$.quantity': req.body.quantity,
      'exercises.$.difficulty': req.body.difficulty,
      'exercises.$.category': req.body.category,
    }
  )
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err));
});

app.put('/api/:username/updateWorkoutFavorite', (req, res) => {
  db.User.findOneAndUpdate(
    { username: req.params.username, 'workouts._id': req.body._id },
    {
      'workouts.$.favorite': req.body.favorite,
    }
  )
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err));
});

app.put('/api/:username/updateWorkout', (req, res) => {
  db.User.findOneAndUpdate(
    { username: req.params.username, 'workouts._id': req.body._id },
    {
      'workouts.$.name': req.body.name,
      'workouts.$.favorite': req.body.favorite,
      'workouts.$.duration': req.body.duration,
      'workouts.$.difficulty': req.body.difficulty,
      'workouts.$.category': req.body.category,
      'workouts.$.exercises': req.body.exercises,
    }
  )
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err));
});

// ------- DELETE USER CONTENT -------

app.delete('/api/:username/deleteExercise', (req, res) => {
  db.User.findOneAndUpdate(
    { username: req.params.username },
    {
      $pull: {
        exercises: {
          _id: req.body._id,
        },
      },
    }
  )
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err));
});

app.delete('/api/:username/deleteWorkout', (req, res) => {
  db.User.findOneAndUpdate(
    { username: req.params.username },
    {
      $pull: {
        workouts: {
          _id: req.body._id,
        },
      },
    }
  )
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(400).send(err));
});

// ------- LOGIN -------
app.get('/api/login/:username/:password', (req, res) => {
  db.User.findOne({ username: req.params.username })
    .then(async (data) => {
      let match = await bcrypt.compare(req.params.password, data.password);
      if (match) {
        res.status(200).send({
          _id: data._id,
          username: data.username,
          workouts: data.workouts,
          exercises: data.exercises,
        });
      } else {
        res.status(400).send('Incorrect Password');
      }
    })
    .catch((err) => res.status(400).send('Username Not Found'));
});

app.post('/api/signup', (req, res) => {
  db.User.create({ username: req.body.username, password: req.body.password })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => res.status(400).send(err));
});

// ------- LAUNCH -------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server Listening on ${PORT}`);
});
