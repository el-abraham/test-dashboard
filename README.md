# Test Submission Dashboard

This repository contains the code for a dashboard application designed to streamline the process of submitting tests. The application is built using modern web technologies, providing a responsive and user-friendly interface.

## Technologies Used

- **Next.js**: The base framework for building the application, providing server-side rendering and static site generation.
- **TailwindCSS**: A utility-first CSS framework for styling the application with a modern and responsive design.
- **Shadcn UI**: A component library integrated into the project for consistent UI elements.
- **TypeScript**: A statically typed superset of JavaScript used to improve code quality and maintainability.
- **Docker**: The application is containerized using Docker to ensure consistency across different environments and ease of deployment.

## Getting Started

### Prerequisites

- **Docker**: Make sure Docker is installed and running.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/el-abraham/test-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd test-dashboard
   ```

3. Build the Docker image:

   ```bash
   docker build -t test-dashboard .
   ```

4. Run the Docker container:

   ```bash
   docker run -p 3000:3000 test-dashboard
   ```

This will start the application in a Docker container accessible at http://localhost:3000.

