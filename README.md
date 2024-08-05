
# Game Lobby and Quiz Application

## Features

- User Character Selection: Users can select a character to represent them in the game.
- Timed Questions: Each question has a countdown timer to add an element of challenge.
- Host-Only Game Start: Only the host can start the game, ensuring controlled game flow.
- Multiplayer Rooms: Multiple players can join and play in the same room, enabling collaborative gameplay.

## Limitations

- Concurrent Players Issue: Currently, there might be issues with multiple players playing simultaneously, leading to a 429 Too Many Requests status code.
- No Leaderboard: There is no leaderboard feature to display all scores and players.

## Usage
- Select a Character: Upon entering the lobby, users can choose a character to represent them.
- Join a Room: Players can join an existing room or create a new one.
- Host Starts the Game: The designated host can start the game once all players are ready.
- Answer Questions: Players answer questions within a time limit. The correct answers are recorded, and scores are updated.
- View Scores: Currently, scores are displayed individually. Future updates will include a leaderboard.

## Figma design

![Screenshot 2024-08-05 at 14 05 35](https://github.com/user-attachments/assets/710d91fb-cd68-44b3-a6ae-0b68794fd40c)

- Clone the repository

- Move to the client folder and install dependencies:
cd client
npm install

- Start the development server for the client:
npm run start

- Open a new terminal, move to the socket folder, and install dependencies:
cd ../socket
npm install

- Start the development server for the socket:
npm run dev
