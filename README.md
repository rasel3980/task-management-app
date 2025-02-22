# Task Management App

## Short Description

The **Task Management App** is a comprehensive web application designed to help users efficiently manage their tasks. It features a drag-and-drop task board where users can create, update, delete, and organize tasks across various categories such as "To-Do", "In Progress", and "Done". The app supports real-time updates through WebSockets and uses MongoDB for storing tasks, ensuring an interactive and seamless user experience.

## Live Links

- **App URL**: [Your Live App URL Here](https://task-management-app-server-lbsi.onrender.com)

## Features

- User registration and login functionality using Firebase.
- Real-time updates using WebSockets for task creation, deletion, and updates.
- A drag-and-drop task board for task management.
- Support for task editing and reordering.
- Smooth and responsive UI with Tailwind CSS.

## Dependencies

The project uses the following dependencies:

- **`@hello-pangea/dnd`**: Drag-and-drop library for task management.
- **`@tanstack/react-query`**: For data fetching and state management.
- **`axios`**: For making HTTP requests.
- **`firebase`**: For user authentication.
- **`lottie-react`**: For adding Lottie animations to the UI.
- **`react`**: The JavaScript library used to build the frontend.
- **`react-dom`**: For DOM-related methods.
- **`react-router-dom`**: For routing and navigation.
- **`socket.io-client`**: For real-time communication with the server.
- **`sweetalert2`**: For customizable alert messages.
- **`tailwindcss`**: Utility-first CSS framework for styling.

## Technologies Used

### Frontend:
- **React.js**: JavaScript library for building the user interface.
- **React Router**: For handling client-side routing.
- **WebSockets (via `socket.io-client`)**: For real-time communication between the client and server.
- **Drag-and-Drop (via `@hello-pangea/dnd`)**: For enabling drag-and-drop functionality on the task board.
- **Axios**: HTTP client for API requests.
- **Firebase**: Authentication service to handle user login and registration.
- **SweetAlert2**: For displaying elegant and customizable alerts (e.g., success or error messages).
- **Tailwind CSS**: A utility-first CSS framework for styling and responsive design.

### Backend:
- **Node.js with Express**: Used for building the backend server.
- **MongoDB**: NoSQL database for storing tasks and user data.
- **Socket.io**: Enables real-time communication for task updates between clients.

### Deployment:
- **Frontend**: Deployed on platforms like **Firebase**.
- **Backend**: Deployed on platforms like **Render**.