# Collaborative Document Editor

A real-time collaborative document editor with AI-powered suggestions.

## Table of Contents

1. [Project Setup](#project-setup)
   - [Prerequisites](#prerequisites)
   - [Cloning the Repository](#cloning-the-repository)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
2. [Running the Application](#running-the-application)
3. [Troubleshooting](#troubleshooting)
4. [Contributing](#contributing)

## Project Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (if using the provided database setup)

### Cloning the Repository

Clone the repository and navigate to the project directory:

git clone https://github.com/your-username/collaborative-document-editor.git
cd collaborative-document-editor

Backend Setup
Navigate to the backend directory:

`cd server`
Install backend dependencies:

`npm install`
Set up environment variables:

Create a .env file in the server directory with the following content:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/collaborative-editor
OPENAI_API_KEY=your-openai-api-key

Run the backend server:

`npm start`

Frontend Setup
Navigate to the frontend directory:

`cd client`
Install frontend dependencies:

`npm install`
Run the frontend development server:

`npm start`
Access the application:

Open your browser and navigate to http://localhost:3000 to view the application.

Running the Application
Once both the backend and frontend servers are running, you can access the application at http://localhost:3000. The backend API will be available at http://localhost:5000.

Troubleshooting
Issue with connecting to MongoDB:

Ensure MongoDB is running and the connection URI is correctly set in the .env file.
Frontend not loading:

Check the console for errors and ensure the backend server is running and accessible.
Socket.io connection issues:

Verify the server URL in the frontend matches the URL where the backend is hosted.
Quill.js errors:

Ensure that Quill.js is correctly integrated and that all required configuration options are provided.
Contributing
Feel free to submit issues or pull requests. Follow the coding style and include tests for new features.

Steps to Contribute
1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure they are well-tested.
4. Submit a pull request with a clear description of your changes.

This version omits the deployment, license, and contact sections as requested.
