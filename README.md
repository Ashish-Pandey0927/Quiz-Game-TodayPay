# Quiz Game App

A responsive React quiz application that loads questions from the Open Trivia DB API, tracks your score, shows progress, and displays results.  
Built with React, React Router, and modern CSS.

## Features

- Responsive UI for desktop and mobile
- Loads 10 multiple-choice questions from Open Trivia DB
- Timer bar (30 seconds per question)
- Progress navigation menu (see answered/left questions, jump to any question)
- Score tracking and results summary
- Restart quiz option

## Setup & Run

### 1. Clone the repository

```sh
git clone https://github.com/your-username/quiz-game.git
cd quiz-game
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the development server

```sh
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  App.jsx
  main.jsx
  index.css
  Components/
  Pages/
    Home.jsx
    Quiz.jsx
    Results.jsx
  assets/
```

## Customization

- To use a local JSON file for questions, replace the API fetch in `Quiz.jsx` with your file import.
- You can adjust timer duration in `Quiz.jsx` by changing `TIMER_DURATION`.

## Build for Production

```sh
npm run build
```

## License

Ashish Pandey
---

Made with ❤️ by Ashish Pandey
