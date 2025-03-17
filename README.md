# Chat App

This is a real-time chat application built using NestJS, GraphQL, and a client-server architecture.

## Project Structure

```
chat-app/
├── client/   # Frontend (React, Vue, etc.)
├── server/   # Backend (NestJS, GraphQL, WebSockets)
└── README.md
```

## Technologies Used

### Backend (Server)

- **NestJS** - Modular and scalable backend framework.
- **GraphQL** - API for querying and updating chat data.
- **WebSockets** - Real-time communication for chat.
- **MongoDB** - Database for storing chat messages.
- **TypeORM/Mongoose** - ORM/ODM for database interactions.
- **JWT Authentication** - Secure user authentication.

### Frontend (Client)

- **React / Vue.js** - UI framework for chat interface.
- **Apollo Client** - GraphQL client for handling API calls.
- **Socket.io** - Real-time chat functionality.
- **Material UI / TailwindCSS** - Styling for the UI.

## Installation & Setup

### Prerequisites

- Node.js (>= 16.x)
- MongoDB
- Yarn / npm

### Backend Setup

```sh
cd server
npm install
npm run start:dev
```

### Frontend Setup

```sh
cd client
npm install
npm run dev
```

## Features

- Real-time chat with WebSockets
- User authentication (JWT)
- GraphQL API for chat messages
- User-friendly UI

## API Endpoints (GraphQL)

- `users`: Manage user authentication.
- `messages`: Send & receive chat messages.
- `subscriptions`: Real-time updates for new messages.

## Contributing

Feel free to fork and contribute via pull requests.

## License

This project is licensed under the MIT License.

