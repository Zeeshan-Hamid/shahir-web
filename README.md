# Uber Eats for Merchants - Form Submission Backend

This is a simple Node.js backend for handling form submissions and sending emails from the Uber Eats for Merchants website.

## Features

- Express.js server for handling form submissions
- Nodemailer integration for sending emails
- Environment variable configuration for sensitive information
- Static file serving for the frontend

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository or download the source code
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   RECIPIENT_EMAIL=where-to-receive-emails@example.com
   PORT=3000
   ```

   **Note for Gmail users:** You'll need to create an "App Password" for your Gmail account. Follow these steps:
   - Go to your Google Account > Security
   - Enable 2-Step Verification if not already enabled
   - Under "Signing in to Google," select "App passwords"
   - Create a new app password for "Mail" and use it in your `.env` file

### Running the Server

Development mode (with automatic restart on file changes):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start at http://localhost:3000 (or the PORT specified in your .env file).

## How It Works

1. The Express server listens for POST requests at `/api/submit-form`
2. When a form is submitted, the server processes the data
3. Nodemailer sends an email with the form data to the specified recipient
4. A response is sent back to the client indicating success or failure

## Customization

- Modify the email template in `server.js` to change the format of emails sent
- Add additional middleware or routes as needed for your specific requirements 