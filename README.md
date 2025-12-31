# Digital Life Lessons 🌟

A platform where users can **create, store, and share meaningful life lessons**, personal growth insights, and wisdom gathered over time. Users can organize lessons, mark favorites, track learning progress, and explore public lessons shared by others.

Server site repo: https://github.com/ahnafabid10/digital-life-lessons-server-side/tree/my-new-branch<br>

Live Site: https://digital-life-lesson11.netlify.app/

---

## Table of Contents
- Features
- Demo
- Technology Stack
- Project Structure
- Pages & Functionality
- Installation

---

## Features

- User Authentication: Email/password + Google login.
- Free and Premium subscription plans with **Stripe payment integration**.
- Add, update, delete, and view life lessons.
- Public and private lesson visibility, with Premium-only access.
- Browse and search public lessons with **category & emotional tone filters**.
- Favorite lessons and track your own contributions.
- Engagement features: Likes, comments, share buttons, and reporting inappropriate lessons.
- Admin dashboard for managing users, lessons, and reported content.
- Responsive design for desktop, tablet, and mobile devices.
- Lottie animations for dynamic feedback and better UX.
- Secure Firebase and MongoDB integration with environment variables.
- Fully protected routes and token verification for authenticated actions.
- Loading spinners, toast notifications, and SweetAlert2 for user feedback.

---

## Demo

Here’s a quick overview of the main sections:

- **Home Page:** Hero banner, featured lessons, top contributors, most saved lessons.
- **Dashboard:** Add lessons, manage favorites, profile info, analytics charts.
- **Public Lessons:** Browse all public lessons, filter by category or emotional tone, search by keyword.
- **Lesson Details:** Full lesson view, like/save/report options, comments, related lessons.
- **Pricing/Upgrade:** Free vs Premium plan comparison, Stripe checkout.
- **Admin Panel:** Manage users, featured lessons, reported content, platform analytics.

---

## Technology Stack

**Frontend:**
- React 19.x
- Vite
- TailwindCSS + DaisyUI
- Styled Components
- React Router v7
- React Query
- React Hook Form
- Lottie React
- Recharts
- React Icons
- React Share
- Swiper (carousel)
- SweetAlert2

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Firebase Admin SDK (for authentication token verification)
- Stripe (payment processing)
- CORS enabled and secure routes
- RESTful APIs

**Dev Tools:**
- ESLint + Prettier
- GitHub for version control with notable commits
- Environment variables for sensitive credentials

---

## Project Structure


---

## Pages & Functionality

**1. Authentication**
- Register: Name, email, photoURL, password validation.
- Login: Email/password + Google login.
- Protected routes for logged-in users.

**2. Home Page**
- Hero banner with carousel.
- Featured lessons, top contributors, most saved lessons.
- “Why Learning From Life Matters” section.

**3. Lesson Management**
- Add Lesson: Title, description, category, emotional tone, image, visibility, access level.
- Update Lesson: Editable form prefilled with existing data.
- Delete Lesson: Confirmation popup, instant UI update.

**4. Public Lessons**
- Browse all public lessons.
- Filter by category/emotional tone.
- Sort by newest or most saved.
- Premium lessons blurred for free users.

**5. Lesson Details**
- Full lesson view with stats (likes, favorites, views).
- Author info and related lessons.
- Comment system with real-time updates.
- Like, save, share, report actions.

**6. Dashboard**
- User Dashboard: Analytics, recent lessons, quick links.
- Admin Dashboard: Manage users, manage lessons, view reported content.

**7. Pricing / Upgrade**
- Free vs Premium comparison.
- Stripe integration for premium subscription.
- Payment success & cancel pages.

**8. Other Features**
- 404 Not Found Page
- Loading spinner
- Responsive layout
- Dark/Light mode toggle (optional)
- Social sharing and PDF export (optional)

## Installation
  ```bash
  # Clone the repository
git clone https://github.com/yourusername/digital-life-lessons-client-side.git

# Navigate into the project directory
cd digital-life-lessons-client-side

# Install dependencies
npm install

# Create a `.env` file in the root directory
# Add your Firebase, MongoDB, and Stripe credentials
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storageBucket
VITE_messagingSenderId= your_messagingSenderId
VITE_appId= your_appId

# Run the development server
npm run dev

# Build and preview production version
npm run build
npm run preview


