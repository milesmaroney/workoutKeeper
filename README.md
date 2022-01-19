# workoutKeeper

This is a for-fun project that I worked on over the last 48 hours or so to help me practice utilizing the full stack more in React. This project utilizes React, Tailwind, Express, and MongoDB to create a complete workout keeper unique to every user. All passwords are salted and hashed with bCrypt and every change client side is reflected immediately in the database, ensuring data is always up to date no matter which device you access from.

This was also my first real attempt at making a UI that worked well on mobile devices (primarily targeting iOS/current iPhones) as well as desktop as the target audience for this app will be people at the gym or somewhere to work out instead of at their desk.

While it functions and accomplishes the bare needs of what I had hoped for, I'm happy to receive any input on potential improvements or feature requests and would love to open this up for collaboration to anyone interested.

# Running this App

DEV:
- npm start will launch the live updating webpack bundle
- npm run server:dev will run the server via nodemon so any changes serverside will implement immediately
- there are 2 configEXAMPLE.js files you'll need to rename to config.js and swap the contents accordingly

PRODUCTION:
- npm run build will compile for production, you'll do this first
- npm run server will launch the server and serve the files compiled by 'npm run build' in the /build directory to your host at port 3001
