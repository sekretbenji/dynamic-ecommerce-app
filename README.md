# Dynamic E‑Commerce App

This repository contains a minimal full‑stack e‑commerce application written in **Node.js** (Express) on the backend and **React** on the frontend.  It is designed as a starting point for projects that require user accounts, product management, video uploads, live streaming via HLS (`.m3u8`), and an administrative dashboard.

## Features

### User Authentication

* Register and log in with a hashed password.
* JSON Web Tokens (JWT) for authentication on protected routes.

### Admin Dashboard

* Upload new products (title, description, price, image/video).
* Upload standalone videos for a video library.
* Create and manage live stream sessions (store `m3u8` URL).
* Delete products or videos.

### Public Site

* Browse products with a simple search bar.
* Watch uploaded videos and active live streams via HLS.

### Tech Stack

* **Backend:** Node.js, Express, Sequelize ORM, PostgreSQL, Multer (file uploads).
* **Frontend:** React, React Router DOM.
* **Database:** PostgreSQL; connection parameters can be configured via environment variables.

This skeleton does not implement every feature in production detail; instead it provides a structure you can build on.  Endpoints are defined and wired up, and the React app has basic pages to demonstrate routing and API calls.  You should replace dummy implementations and placeholder components with your own business logic, styling, and error handling.
