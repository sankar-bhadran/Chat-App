# Chat App

A real-time chat application built with Next.js, ShadCN for UI components, NestJS, GraphQL for API integration, Socket.io for real-time communication, and MongoDB as the database.

## Technologies Used

### Frontend (Client)

- Next.js
- ShadCN
- Socket.io-client

### Backend (Server)

- NestJS
- GraphQL
- Socket.io
- MongoDB

## Features

- User authentication (Session-based or alternative method, no JWT)
- Real-time messaging using Socket.io
- GraphQL API for data fetching and mutations
- Modern UI with ShadCN components
- MongoDB for storing user and message data

## Installation

### Prerequisites

- Node.js installed
- MongoDB database setup

### Setup

#### Clone the repository

```sh
git clone https://github.com/your-repo/chat-app.git
cd chat-app
```

### Client Setup

```sh
cd client
npm install
npm run dev
```

### Server Setup

```sh
cd server
npm install
npm run start
```

## API Endpoints (GraphQL)

- `query { messages { id, content, sender } }`
- `mutation { sendMessage(content: "Hello", sender: "User1") { id, content } }`

## WebSocket Events

- `connect` - Establishes socket connection
- `message` - Listens and sends real-time messages
- `disconnect` - Handles disconnection

##
