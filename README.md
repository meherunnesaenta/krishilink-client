# 🌾 KrishiLink

A full-stack web application that connects farmers directly with buyers. Farmers can list their crops, and buyers can show interest in purchasing them.

🔗 **Live Demo:** https://endearing-bubblegum-6944b3.netlify.app/

---

## 🚀 Features

* 🌱 **Crop Listing & Details**
  Farmers can post crops with images, price, quantity, location, and description.

* 🤝 **Show Interest**
  Buyers can send purchase requests with quantity and optional messages.

* ✅❌ **Accept / Reject Interests**
  Farmers can accept or reject incoming requests.

* 📌 **My Interests Page**
  Buyers can track all their requests (Pending, Accepted, Rejected).

* 🔐 **Authentication**
  Secure login using email/password or Google (via NextAuth).

* 📱 **Responsive Design**
  Mobile-friendly UI built with Tailwind CSS & DaisyUI.

* 🎬 **Animations**
  Smooth UI interactions using modern animation libraries.

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16
* React 19
* Tailwind CSS
* DaisyUI
* React Icons
* Recharts (for data visualization)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Atlas)

### Authentication

* NextAuth.js
* Firebase Admin SDK (for token verification if used)

### Payment (Optional Feature)

* Stripe

### Maps & Location

* React Leaflet / Mapbox (react-map-gl)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/krishilink.git
cd krishilink
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

👉 Open http://localhost:3000 in your browser

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

STRIPE_SECRET_KEY=your_stripe_secret
```

---

## 📁 Folder Structure

```
/app            → App router pages
/components     → Reusable UI components
/lib            → Database & utility functions
/models         → Mongoose schemas
/public         → Static assets
/styles         → Global styles
```

---

## 📡 API Overview

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| GET    | /api/crops     | Get all crops         |
| POST   | /api/crops     | Add new crop          |
| POST   | /api/interests | Send interest request |
| PATCH  | /api/interests | Accept/Reject request |

---

## 🚀 Deployment

* **Frontend:** Netlify / Vercel
* **Backend:** Render / Railway / VPS

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed with ❤️ to empower farmers and simplify agricultural trade.
