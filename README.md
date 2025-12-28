# CloudBook

A full‑stack notes application where users can sign up, log in, and securely create, edit, and delete notes. The frontend is built with React and Bootstrap, and the backend is built with Express, MongoDB, and JWT‑based authentication.

---

## Project Overview

- **Frontend:** React app created with Create React App (CRA)
- **Backend:** Express REST API with MongoDB using Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** Bootstrap 5

---

## Tech Stack

- **Frontend:** React, React Router, Bootstrap
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt, express‑validator
- **Database:** MongoDB (local or MongoDB Atlas)

---

## Step 1: Download or Clone the Project

1. Download the project as a ZIP and extract it, **or**
2. Clone it with Git:

```bash path=null start=null
git clone <your-repo-url>
cd cloud-book
```

---

## Step 2: Install Dependencies

### 2.1 Install frontend dependencies (root folder)

From the project root (where `package.json` and `README.md` are):

```bash path=null start=null
npm install
```

### 2.2 Install backend dependencies

From the project root, go into the backend folder and install:

```bash path=null start=null
cd Cloud_book-backend
npm install
```

You can come back to the root later with:

```bash path=null start=null
cd ..
```

---

## Step 3: Configure Environment Variables

This project uses a `.env` file for backend configuration.

1. In the **project root** (same place as `package.json`), create a file named `.env` if it does not exist.
2. Add at least these variables (example values only — replace them with your own):

```env path=null start=null
CON_URL=mongodb+srv://<user>:<password>@<cluster>/<db-name>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
```

- `CON_URL` – your MongoDB connection string (local or Atlas)
- `JWT_SECRET` – any long random string used to sign JWT tokens

> Note: The backend uses these values via `Cloud_book-backend/config/keys.js`.

Make sure MongoDB is running (locally or your Atlas cluster is reachable).

---

## Step 4: Start the Backend Server (API)

You can run the backend directly from the backend folder:

```bash path=null start=null
cd Cloud_book-backend
npm start
```

This will start the Express server (by default on **http://localhost:7000**).

Main backend endpoints (base URL `http://localhost:7000`):

- `GET /api/v1/auth/user` – get current logged‑in user
- `POST /api/v1/auth/login` – log in
- `POST /api/v1/auth/signup` – sign up
- `GET /api/v1/note/getNotes` – fetch notes
- `POST /api/v1/note/add` – create a note
- `PUT /api/v1/note/updateNote/:id` – edit a note
- `DELETE /api/v1/note/deleteNote/:id` – delete a note

Leave this terminal running while you use the app.

---

## Step 5: Start the Frontend (React App)

Open a **new terminal** in the project root (not inside `Cloud_book-backend`) and run:

```bash path=null start=null
npm start
```

- This starts the React app in development mode on **http://localhost:3000**.
- The app expects the backend at **http://localhost:7000** (see `src/context/AuthProvider.js` and `src/context/noteState.js`).

When both frontend and backend are running, you can:

1. Open `http://localhost:3000` in your browser.
2. Sign up for a new account.
3. Log in.
4. Create, edit, and delete notes.

---

## Step 6: Start Frontend and Backend Together

In the project root there is a convenience script that runs both servers at once using `concurrently`:

```bash path=null start=null
npm run both
```

This will:

- Start the React app (`react-scripts start`)
- Start the backend with `nodemon ./Cloud_book-backend/index.js`

Use this when you want to develop both sides together.

---

## Step 7: Run Frontend Tests

The React app includes the default CRA testing setup.

From the project root:

```bash path=null start=null
npm test
```

- Runs tests in **watch mode**.
- Press `a` to run all tests, or follow on‑screen instructions.

(Backend currently has no automated tests configured.)

---

## Step 8: Build Frontend for Production

To create an optimized production build of the React app:

```bash path=null start=null
npm run build
```

- Builds the app into the `build` folder.
- Output is minified and ready to be served by any static file server.

You can then deploy the `build` folder to any static hosting provider (Netlify, Vercel, etc.) and host the backend separately.

---

## Step 9: Available Root Scripts (Summary)

From the project root you can run:

- `npm start` – start frontend only (React dev server on port 3000)
- `npm run both` – start frontend and backend together
- `npm test` – run frontend tests (watch mode)
- `npm run build` – build frontend for production

Backend‑only:

- `cd Cloud_book-backend && npm start` – start backend API on port 7000

---

## Folder Structure

High‑level structure of this project:

- `/src` – React source code (components, contexts, routing)
  - `components/` – UI components like Navbar, Home, About, Login, Signup
  - `context/` – React Context providers for Auth, Notes, and Alerts
- `/public` – Static files for the React app
- `/Cloud_book-backend` – Express + MongoDB backend
  - `index.js` – main server entry
  - `init/mongoDb.js` – MongoDB connection logic
  - `config/keys.js` – reads `.env` and exposes config values
  - `Routes/` – API route handlers for auth and notes

---

## Troubleshooting

- **Frontend cannot reach backend**
  - Ensure backend is running on `http://localhost:7000`.
  - Check that `CON_URL` in `.env` is valid and MongoDB is reachable.
- **Authentication issues**
  - Make sure `JWT_SECRET` in `.env` is set and not empty.
  - Clear `localStorage` token in your browser and try logging in again.

If you change ports or API URLs, also update them in:

- `src/context/AuthProvider.js` (`API_BASE`)
- `src/context/noteState.js` (`host`)
