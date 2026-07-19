# SafeStadium AI - Local Desktop Version

SafeStadium AI is an intelligent stadium management and fan portal system. 
This version has been converted to a **fully offline, locally runnable application** that does not require any paid cloud services, external databases, or Gemini API keys. All API responses, authentication, databases, and AI generation are mocked locally in-memory.

## Prerequisites

- **Node.js LTS** (v18, v20, or v22 recommended)
- A Windows, macOS, or Linux Desktop.

## Setup & Running

This project uses a unified Express + Vite setup. The backend and frontend are served from the same process during development.

### 1. Install Dependencies

Open a terminal in this directory and run:

```bash
npm install
```

### 2. Configure Environment (Optional)

We have provided an `.env.example` file. You can simply copy it or rename it to `.env`:

```bash
copy .env.example .env
```

Since the app is fully mocked, you do not need to fill in any API keys or Database URLs.

### 3. Start the Application

To start both the frontend and backend locally, run:

```bash
npm run dev
```

### 4. Access the Application

Once the server has started, open your web browser and navigate to:

**http://localhost:3000**

You can use the application freely. 

### 5. Using the App

- **Authentication:** Any email/password combination will log you in successfully (an automatic mock user is created).
- **AI Assistant:** Type commands like "Find my seat", "food options", or "emergency plan" to test the mocked AI responses.
- **Data Persistence:** Because the app uses in-memory mocked databases, any changes will reset when you restart the server.

## Production Build

If you wish to create a production bundle:

```bash
npm run build
npm start
```

This will bundle the React frontend and compile the Node backend into a single `dist/server.cjs` file, and then serve it at `http://localhost:3000`.
