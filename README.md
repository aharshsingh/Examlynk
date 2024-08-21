# Test Environment Platform

## Introduction

This project is a Full-Stack Web Application designed for conducting multiple-choice question (MCQ) tests. It provides a platform where students can log in, take tests with real-time camera and microphone permissions, and receive their results via email.

## Features

- **User Authentication**: Secure login system using email and password.
- **Test Environment**: Requests permissions for camera and microphone, displays live preview, and shows error messages if permissions are not granted.
- **MCQ Test Interface**: Allows users to view questions, select and change answers, navigate between questions, and includes a camera preview.
- **Test Submission**: Users can submit their tests, which redirects them to a "Finish Test" page.
- **Score and Evaluation**: Cron job evaluates submitted tests, calculates scores, and sends results to users via email.

## Technologies

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT or session-based
- **Cron Jobs**: node-cron
- **Email Service**: Nodemailer

## Setup and Installation

### Prerequisites

- Node.js (>=14.x)
- MongoDB

### Frontend

1. Clone the repository:
   ```bash
   git clone <repository-url>
