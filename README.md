## Frontend coding challenge

### Overview

- This codebase is based on [create-react-app](https://github.com/facebook/create-react-app) with typescript.
- Please fork, complete your challenge, and create a PR to this repository.
- How we assess your code:
  - Easy to understand
  - Well organized
  - Performance
  - Test cases
  - Your mindset when approaching a new technology
- Don't worry if you can't complete this challenge in time. Just do your best in a mindful way.
- If you can't fully complete the challenge, please note the completed features.

### Simple app diagram

![App diagram](diagram.png)

### Requirements

#### Common (required for both positions)

- Our codebase has some strange bugs and anti-patterns, please help us find and fix them (comment the reasons why you change it).
- Write some tests (prefer unit tests) to help us ensure that what you have ADDED or FIXED are correct.

#### Front-end engineer

- Use `localStorage` instead of calling remote APIs.
- We've provided a simple UI for todo app, please enhance it with your creative mind (we prefer not using any CSS framework as we want to see your CSS skills).
- Please help split huge code blocks in `App.tsx` into reusable UI components.
- Kindly add some features to the application by:
    - Implementing the persistent feature. After refreshing, our todos will be disappeared, that's annoying for our users, let's use `localStorage` (or API calls for fullstack engineer) to keep them.
    - Implementing the edit feature. Currently, users cannot edit the todos, please help them (user double-click the todo to edit, press enter to apply the changes, or click outside to discard).

#### Fullstack engineer

- You have to make sure your code satisfy the back-end requirements in <https://github.com/akaru-io/backend-todo-exam>.
- We do not require you to enhance the UI, but it is preferable.

### How to run the app

- Run ```yarn``` or ```npm install``` if this is the first time you clone this repo (`master` branch).
- Run ```yarn start:fullstack``` in case you are doing a fullstack test, else run ```yarn start:frontend``` to start this project in development mode.
- Sign in using username: `firstUser`, password: `example`

Last updated: 2021/08/01
