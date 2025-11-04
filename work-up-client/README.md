# WorkUp Client

This is the client-side application for WorkUp, a modern job portal built with React.

## Features

*   User authentication (Sign Up, Sign In, Sign Out) with Firebase.
*   Social login with Google and GitHub.
*   Protected routes to ensure only authenticated users can access certain pages.
*   Browse and search for job listings.
*   View detailed information for each job.
*   Apply for jobs.
*   Displays latest jobs on the home page.
*   View job details by clicking on a job card.

## Technologies Used

*   **Framework:** React
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS & DaisyUI
*   **Routing:** React Router
*   **Data Fetching:** TanStack Query
*   **Authentication:** Firebase

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env.local` file in the root of the project and add your Firebase project configuration:

```
VITE_SOME_apiKey=your-firebase-api-key
VITE_SOME_authDomain=your-firebase-auth-domain
VITE_SOME_projectId=your-firebase-project-id
VITE_SOME_storageBucket=your-firebase-storage-bucket
VITE_SOME_messagingSenderId=your-firebase-messaging-sender-id
VITE_SOME_appId=your-firebase-app-id
```

Replace `your-firebase-...` with the actual credentials from your Firebase project console.

### Running the Application

To run the development server, use the following command:

```bash
npm run dev
```

## Project Structure

The project follows a feature-based folder structure:

```
/src
├───assets/
├───components/
├───contexts/
│   └───firebaseAuthContext/
├───hooks/
├───layouts/
├───pages/
│   ├───blogs/
│   ├───contact/
│   ├───home/
│   ├───job-category/
│   ├───shares/
│   └───user-log/
├───routes/
├───services/
└───utils/
```