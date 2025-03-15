
Contest Tracker is a web application that helps competitive programmers track upcoming and past coding contests from platforms like Codeforces, CodeChef, and LeetCode.

## Video link: https://drive.google.com/file/d/1ueMRx28rf28EHm0zoo3JFcab2oOc6L7c/view?usp=sharing

## Table of Contents

1. Project Overview
2. Features
3. Project Structure
4. Setup Instructions
5. Usage Guide
6. API Reference
7. Technologies Used

## Project Overview

Contest Tracker provides a centralized platform to monitor competitive programming contests across multiple platforms. It features a clean, responsive interface with dark mode support, detailed contest listings, and personalized bookmarking functionality.

## Features

- **Multi-platform Contest Tracking**: Monitor contests from Codeforces, CodeChef, and LeetCode
- **Upcoming Contests**: View all upcoming contests with countdown timers
- **Past Contests**: Access historical contest data
- **Bookmarking System**: Save favorite contests for quick access
- **Platform Filtering**: Filter contests by programming platform
- **Contest Details**: View contest duration, start time, and participant count
- **YouTube Solution Integration**: Access video solutions for past contests
- **Dark/Light Mode**: Toggle between visual themes
- **Responsive Design**: Optimized for desktop and mobile devices

## Project Structure

```
├── backend/
│   ├── app.js           # Main Express server
│   ├── codeChef.js      # CodeChef scraping functionality
│   ├── ytapi.js         # YouTube API integration
│   ├── package.json     # Backend dependencies
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── layout/      # React components
│   │   │   ├── adminPanel.jsx
│   │   │   ├── bookmarks.jsx
│   │   │   ├── dashboard.jsx
│   │   │   ├── header.jsx
│   │   │   ├── layout.jsx
│   │   │   ├── pastContests.jsx
│   │   │   ├── settings.jsx
│   │   │   ├── SiteNavigation.jsx
│   │   │   └── upcoming.jsx
│   │   ├── App.jsx      # Main React component
│   │   ├── main.jsx     # React entry point
│   │   └── index.css    # Global styles
│   ├── index.html       # HTML template
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
└── index.html           # Static demo page
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a 

.env

 file with required API keys:
   ```
   YT_API_KEY=your_youtube_api_key
   CLIST_USERNAME=your_username
   CLIST_API_KEY=your_api_key
   ```
4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. For production build:
   ```
   npm run build
   ```

## Usage Guide

### Dashboard
The dashboard provides an overview of upcoming contests across all platforms.

### Upcoming Contests
Browse and filter upcoming contests by platform (Codeforces, CodeChef, LeetCode).

### Past Contests
Access historical contest data and YouTube solutions when available.

### Bookmarks
Save your favorite contests for quick access. Bookmarks are stored in your browser's local storage.

### Settings
Customize your experience with options for notifications, appearance, and data preferences.

## API Reference

### Contest APIs
- `GET /api/contest/codeforces`: Retrieve Codeforces contests
- `GET /api/contest/codechef`: Retrieve CodeChef contests
- `POST /api/contests/leetcode`: Retrieve LeetCode contests with filtering options

### YouTube Integration
- YouTube playlists for contest solutions are configured in the admin panel

## Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS
  - Vite

- **Backend**:
  - Node.js
  - Express
  - Puppeteer (for web scraping)

- **APIs**:
  - Codeforces API
  - YouTube Data API
  - CLIST API (for LeetCode)

This documentation provides a comprehensive overview of the Contest Tracker project. For more specific questions or troubleshooting, please refer to the code or raise an issue in the repository.