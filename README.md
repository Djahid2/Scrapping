# 🕵️‍♂️ Django and React Scrapping application  about Fraud Detection with Big Data, and Machine Learning

## Overview
This project is a full-stack web application that performs **web scraping** to support **fraud detection with Big Data technologies and Machine Learning algorithms**.  
It uses **Django** for the backend and **React.js (Vite)** for the frontend.

### 📁 Project File Structure

Here’s where these elements live in your project:

<pre> ```
  Projet-Scrapping/
│
├── backend/
│   ├── models.py         ← Add models: Article, Section, ThesisData
│   ├── serializers.py    ← Create one serializer for each model
│   ├── views.py          ← ViewSets to expose Article, Section, ThesisData
│   ├── urls.py           ← Define REST API endpoints here
│   ├── scraping/         ← Add your scraping logic (parsers, extractors)
│
├── frontend/
│   └── components/       ← Optional: UI to display Articles & visualizations
│
├── README.md
├── docker-compose.yml

  ``` </pre>

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

## Some picture 
![image](https://github.com/user-attachments/assets/821bd428-793e-4325-a336-a1e18ea2baef)
![image](https://github.com/user-attachments/assets/919f5d86-ceb5-46b9-9501-516c2f98ad52)
![image](https://github.com/user-attachments/assets/59301f6f-04af-4f0d-b5ac-9346a6129bea)
![image](https://github.com/user-attachments/assets/76552135-939e-475c-ab4c-e29b922aea4c)

