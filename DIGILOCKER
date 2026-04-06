# DigiLocker Web Application — Walkthrough

## Overview
A modern DigiLocker-like digital document vault built with **React + Vite**, featuring authentication, a dashboard with sidebar navigation, document management with CRUD operations, dark mode, and responsive glassmorphism UI.

## Application Demo

![Full application demo — signup, login, dashboard, documents, dark mode, upload, profile](C:/Users/sanga/.gemini/antigravity/brain/8091cde2-7643-4a52-8cb2-78f4ea4cef57/digilocker_final_demo_1773409105440.webp)

## Screenshots

````carousel
![Login page with glassmorphism card and DigiLocker branding](C:/Users/sanga/.gemini/antigravity/brain/8091cde2-7643-4a52-8cb2-78f4ea4cef57/login_screenshot.png)
<!-- slide -->
![Dashboard with sidebar, stat cards, and recent documents](C:/Users/sanga/.gemini/antigravity/brain/8091cde2-7643-4a52-8cb2-78f4ea4cef57/dashboard_screenshot.png)
<!-- slide -->
![Documents grid with search, filter, and action buttons](C:/Users/sanga/.gemini/antigravity/brain/8091cde2-7643-4a52-8cb2-78f4ea4cef57/documents_screenshot.png)
<!-- slide -->
![Dark mode enabled across the application](C:/Users/sanga/.gemini/antigravity/brain/8091cde2-7643-4a52-8cb2-78f4ea4cef57/darkmode_screenshot.png)
````

## Features Implemented

| Feature | Status |
|---|---|
| Login with show/hide password | ✅ |
| Signup with security question | ✅ |
| Forgot Password (3-step flow) | ✅ |
| Dashboard with stat cards | ✅ |
| Sidebar navigation | ✅ |
| Document grid with View/Edit/Delete | ✅ |
| 4 preloaded documents | ✅ |
| Upload with drag-and-drop | ✅ |
| Search & category filter | ✅ |
| Dark mode toggle | ✅ |
| Profile page with edit | ✅ |
| Glassmorphism UI | ✅ |
| Responsive layout | ✅ |
| localStorage persistence | ✅ |

## Project Structure

```
src/
├── context/
│   ├── AuthContext.jsx      # Auth state, signup, login, reset
│   ├── DocumentContext.jsx  # Document CRUD + stats
│   └── ThemeContext.jsx     # Dark/light mode toggle
├── components/
│   ├── Layout.jsx           # Sidebar + topbar shell
│   ├── DocumentCard.jsx     # Reusable document card
│   └── DocumentModal.jsx    # View/edit document modal
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── ForgotPassword.jsx
│   ├── DashboardHome.jsx
│   ├── Documents.jsx
│   ├── UploadDocument.jsx
│   └── Profile.jsx
├── App.jsx                  # Routes + protected route guards
├── main.jsx
└── index.css                # Full styling with dark mode vars
```

## How to Run

```bash
npm install
npm run dev
```

The app starts at `http://localhost:5173` (or the next available port).

## Verification Results

- **Signup → Login → Dashboard flow**: ✅ Working — account created, logged in, redirected to dashboard
- **Sidebar navigation**: ✅ All 5 links work correctly
- **Document cards**: ✅ 4 preloaded docs display with View/Edit/Delete
- **View modal**: ✅ Shows document details cleanly
- **Dark mode**: ✅ Smooth transition, persists in localStorage
- **Upload page**: ✅ Drag-and-drop zone, file picker, form inputs
- **Profile page**: ✅ Shows user info, editable fields, doc stats
- **No console errors detected**
