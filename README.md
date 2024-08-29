
# TODO App

This is a simple yet functional TODO application designed to manage individual tasks. The application allows users to add, edit, and delete tasks, mark tasks as completed or undone, and store them locally using the browser's local storage. The UI is responsive, intuitive, and styled using Materialize CSS.

## Features

- **Add Tasks**: Users can add new tasks with a description and a start date.
- **Edit Tasks**: Users can edit existing tasks, including changing the task description and start date.
- **Delete Tasks**: Users can delete tasks that are no longer needed.
- **Mark as Done**: Users can mark tasks as completed, which will move them to the end of the list and display the date they were completed.
- **Mark as Undone**: Completed tasks can be marked as undone, returning them to their original position in the list.
- **Drag and Drop Sorting**: Users can reorder tasks within the list by dragging and dropping them.
- **Responsive Design**: The application is responsive and works well on different screen sizes.
- **Task Persistence**: Tasks are stored in a MySQL database to persist data across sessions.

## Technologies Used

- **React**: The project is built using React, a popular JavaScript library for building user interfaces.
- **Node.js & Express**: Backend services are handled by Node.js and Express, providing APIs for authentication and task management.
- **Materialize CSS**: The UI is styled using Materialize CSS, a modern responsive front-end framework based on Material Design.
- **FontAwesome**: Icons are provided by FontAwesome, a widely used icon library.
- **ESLint**: The project uses ESLint for maintaining consistent code style and catching errors early.

## Getting Started

Follow the steps below to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v12 or later)
- **npm** (v6 or later) or **yarn**
- **MySQL** (for database setup)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/todo-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd todo-app
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. **Set up the MySQL database:**

   - Create a MySQL database and user.
   - Import the provided database schema to set up the required tables.

5. **Configure the environment variables:**

   - Create a `.env` file in the root directory.
   - Add your database credentials and other environment variables as needed:

   ```plaintext
   DB_HOST=your-database-host
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   DB_PORT=3306
   ```

### Running the Project

1. **Start the backend server:**

   ```bash
   node server.js
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

3. **Open your browser and go to:**

   ```http://localhost:3000```

   The TODO App should be running and accessible from your browser.

### Running in Production

1. **Build the React application:**

   ```bash
   npm run build
   ```

   or

   ```bash
   yarn build
   ```

2. **Serve the static files and start the server:**

   ```bash
   node server.js
   ```

   This will start the server and serve the built React app from the `/build` directory.

## License

This project is open-source and available under the MIT License.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## Acknowledgments

The project is inspired by various task management tools and aims to provide a simple and clean solution for managing daily tasks.
