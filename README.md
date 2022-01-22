<p align='center'>
  <img src='/src/assets/workoutKeeperSmall.png' />
</p>
<hr/>

This is a for-fun project that I worked on over the last 48 hours or so to help me practice utilizing the full stack more in React. This project utilizes React, Tailwind, Express, and MongoDB to create a complete workout keeper unique to every user. All passwords are salted and hashed with bCrypt and every change client side is reflected immediately in the database, ensuring data is always up to date no matter which device you access from.

This was also my first real attempt at making a UI that worked well on mobile devices (primarily targeting iOS/current iPhones) as well as desktop as the target audience for this app will be people at the gym or somewhere to work out instead of at their desk.

While it functions and accomplishes the bare needs of what I had hoped for, I'm happy to receive any input on potential improvements or feature requests and would love to open this up for collaboration to anyone interested.

![image](https://user-images.githubusercontent.com/91905768/150658751-ef8b17ae-08e7-4835-a46c-c55f5b672767.png)

# Demo
You can find the live version of this project at <a target='_blank'>https://workoutkeeper.com</a>


# Running this App

DEV:
- `npm start` will launch the live updating webpack bundle
- `npm run server:dev` will run the server via nodemon so any changes serverside will implement immediately
- you'll need to recreate `.env` in the root directory and give it the proper values for these 3 keys:
  - `REACT_APP_server`
  - `REACT_APP_mongoURI`
  - `REACT_APP_PORT`

PRODUCTION:
- `npm run build` will compile for production, you'll do this first
- `npm run server` will launch the server and serve the files compiled by `npm run build` in the /build directory to your host at the specified port or 3001
