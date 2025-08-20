# Wordlee

A word-guessing game inspired by Wordle, built with React, TypeScript, and Vite.

## Game Overview

Wordlee is a web-based word puzzle game where players attempt to guess a randomly selected 5-letter word. After each guess, the game provides visual feedback:

- **Green**: Letter is correct and in the right position
- **Orange**: Letter is in the word but in the wrong position
- **Gray**: Letter is not in the word at all

## Features

- **Random Word Generation**: Fetches random 5-letter words from an external API
- **Interactive Gameplay**: Click on cells or use your keyboard to input letters
- **Visual Feedback**: Color-coded tiles show your progress after each guess
- **Word Hint**: See the first and last letters of the target word (masked display)
- **Game States**: Win/lose notifications with game reset functionality

## Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/) with TypeScript
- **Build Tool**: [Vite](https://vitejs.dev/) for fast development and building
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) for modern, responsive design
- **State Management**: React Hooks (useState, useCallback, useEffect)
- **HTTP Client**: [Axios](https://axios-http.com/) for API requests
- **Icons**: [Heroicons](https://heroicons.com/) for UI icons
- **Utilities**:
  - `clsx` and `tailwind-merge` for conditional styling

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/umaireu/wordlee.git
   cd wordlee
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to play the game

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Play

1. **Start the Game**: A random 5-letter word is automatically selected
2. **Make Your Guess**:
   - Type letters using your keyboard, or
   - Click on the input cells and type
3. **Submit**: Press `Enter` to submit your 5-letter guess
4. **Read the Feedback**: Check the color of each tile:
   - Green = Correct letter, correct position
   - Orange = Correct letter, wrong position
   - Gray = Letter not in the word
5. **Keep Guessing**: You have 6 attempts to find the correct word
6. **Win or Lose**: Game ends when you guess correctly or run out of attempts
