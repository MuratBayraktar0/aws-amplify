# Full Stack React and Node.js Project using AWS Amplify

This project is a full stack React and Node.js application built using AWS Amplify. The project allows users to sign in with user credentials using AWS Cognito and then perform CRUD operations on a todo list.

## AWS Services Used

- **AWS Cognito:** Used for user authentication and management.
- **AWS Lambda Functions:** Used for backend business logic.
- **Amazon DynamoDB:** Used as the database.
- **AWS API Gateway:** Used to create and manage APIs.

## Project Overview

The application's purpose and functionalities:

- **Purpose:** The purpose of this application is to provide users with a platform to manage their todo lists. Users can sign in securely with their credentials and perform CRUD operations on their todo items.
- **Functionality:**
    - User Authentication: Users can sign in securely using AWS Cognito.
    - Todo List Management: Users can create, read, update, and delete todo items.
    - Secure Backend: Backend logic is handled using AWS Lambda functions, ensuring data security and integrity.
    - Data Persistence: Todo items are stored in Amazon DynamoDB, providing a scalable and reliable database solution.
    - API Management: AWS API Gateway is used to manage APIs, enabling seamless communication between the frontend and backend.

## Setup, Deployment, and Testing Procedures

- **Setup:**
    1. Clone the repository to your local machine.
    2. Navigate to the `aws-amplify` directory and run `npm install` to install frontend dependencies.
    3. Navigate to the `apmlify` directory and run `amplify init` to initialize the backend environment.
    4. Run `amplify push` to deploy the backend resources.
    5. Run `npm start` in the `aws-amplify` directory to start the frontend server.

- **Deployment:** This project can be deployed using AWS Amplify. After setting up the Amplify environment and pushing the changes, the application will be automatically deployed to the specified environments (e.g., development, production).

- **Testing:** Unit tests, integration tests, and end-to-end tests can be implemented using testing frameworks such as Jest, Cypress, Taiko with Gauge. Test scripts can be added to the `aws-amplify` and `amplify` directories to ensure the functionality and reliability of the application.

## Design Decisions and Assumptions

- **Frontend Design:** The frontend is designed using Vita and written in TypeScript to ensure type safety and code maintainability. The user interface follows modern design principles to provide a seamless user experience.
- **Backend Design:** The backend is designed using Amplify CLI to quickly set up and deploy AWS resources. AWS Lambda functions are used for business logic to ensure scalability and cost-effectiveness.
- **Assumptions:** It is assumed that users have basic knowledge of React, Node.js, and AWS services. Additionally, it is assumed that users have access to an AWS account to deploy the application.

## Development and Production Environments

- **Development URL:** [https://development.damp5lp6hzs3t.amplifyapp.com](https://development.damp5lp6hzs3t.amplifyapp.com)
- **Production URL:** [https://main.damp5lp6hzs3t.amplifyapp.com](https://main.damp5lp6hzs3t.amplifyapp.com)
