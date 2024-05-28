# Video Calling Website using WebRTC

This project is a video calling website built with WebRTC. It allows users to make peer-to-peer video calls directly in their browser.

## Project Structure

The project is divided into two main parts:

- `client/`: Contains the frontend code of the application, built with React.
- `server/`: Contains the backend code of the application, which sets up the WebRTC connections.

### Client

The client-side of the application is located in the `client/` directory. It was bootstrapped with [Create React App]

The main entry point of the application is [client/src/index.js](client/src/index.js). The main App component is defined in [client/src/App.js](client/src/App.js) and styled with [client/src/App.css](client/src/App.css).

The application uses a context provider for managing socket connections, defined in [client/src/context/SocketProvider.jsx](client/src/context/SocketProvider.jsx).

### Server

The server-side of the application is located in the `server/` directory.

The server is set up in [server/index.js](server/index.js), where a new Socket.IO server is created and configured.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repo
    ```sh
    https://github.com/Ilham-Syed/P2P-Video-Calling-Website.git