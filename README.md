# 📘 Digital Life Lessons

**Live Site URL:** [https://digital-life-lessons-client.vercel.app]

**Live Server URL:** [https://digital-life-lessons-server.vercel.app]

Digital Life Lessons is a full-stack platform designed to preserve personal wisdom and facilitate community learning. Users can share their life experiences, learn from others, and organize their personal growth journey. The platform incorporates a premium membership model using Stripe payments.

## ✨ Key Features

- **🔐 Authentication & Roles:** Secure Email/Password and Google Login system with distinct roles for **Users** and **Admins**.
- **💰 Premium Membership System:** Integrated **Stripe Payment Gateway** allowing users to upgrade for accessing premium content.
- **📚 Content Management:** Users can create, update, and delete lessons. Features include **Public/Private** visibility and **Free/Premium** access levels.
- **🔍 Advanced Filtering & Search:** Public lessons page features robust searching, sorting (Newest/Oldest/Popular), and category-based filtering with **Pagination**.
- **📊 Interactive Dashboard:**
  - **User:** Analytics charts, My Lessons, and Favorites management.
  - **Admin:** Platform overview stats, User management (Make Admin/User), and Content moderation (Reported lessons).
- **❤️ Engagement:** Users can **Like**, **Comment**, **Report**, and **Share** lessons on social media.
- **🌓 Dark/Light Mode:** Fully responsive UI with theme toggle functionality.

## 🛠️ Technology Stack

- **Frontend:** React, Tailwind CSS, DaisyUI, React Router, Axios, Recharts, Lottie React, React Share, React Hook Form.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (CRUD operations, Aggregation).
- **Authentication:** Firebase Auth, JWT (JSON Web Token).
- **Payment:** Stripe.
