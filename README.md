# Django and React Scrapping application

This is a scrapping application using django and react

## Prerequisites

- **Docker**: Ensure Docker is installed on your machine. [Download Docker](https://www.docker.com/get-started).
- **React.js**: Ensure React app is started (vite@latest).
- **Django**: Django must be available

## Project Setup

### 1. Install React.js Dependencies

To install the required dependencies for the project, run the following commands:

```bash
cd frontend
npm install axios react-router-dom @reduxjs/toolkit react-redux gsap sass swiper vite-plugin-svgr react-chartjs-2 chart.js @gsap/react
```

### 2. Run the project
To run the backend execute :
```bash
docker-compose up --build
```
To run the frontend :
```bash
cd frontend
npm run dev
```

And you will find the Django admin site in the link (http://localhost:8000/admin)
And you will find the Home page in the link (http://localhost:5173)