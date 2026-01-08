# Socialogram 🚀

Socialogram is a modern **social media web application** built with a cutting-edge tech stack, focusing on performance, scalability, and developer experience.

---

## ✨ Features

🔐 Secure authentication with Clerk

📝 Create, edit, and delete posts

💬 Comment on posts and interact with users

❤️ Like posts and comments

🧑‍🤝‍🧑 Add friends and build your network

🖼️ Upload & update profile picture

🖼️ Update cover photo

👤 Update profile information

⏳ Share stories that disappear after 24 hours

🖼️ Image & video uploads via Cloudinary CDN

⚡ Fast and responsive UI

🛡️ Type-safe validation using Zod

🎨 Clean, modern design with Tailwind CSS and shadcn/ui

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**

### Backend

* **Next.js (API Routes / App Router)**
* **Prisma ORM**
* **PostgreSQL**

### Authentication

* **Clerk Authentication**

### Media Storage

* **Cloudinary CDN** (Images & Videos)

### Validation

* **Zod**

---

## 📂 Project Structure (Simplified)

```
src/
├── app/            # Next.js App Router
├── components/     # Reusable UI components
├── lib/            # Utilities & helpers
├── generated/         # Prisma client
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=your_postgres_database_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SIGNING_SECRET=key_for_connection_between_clerk_prismadb
NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_sign_in_page_route
NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_sign_out_page_route
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_KEY=your_cloudinary_api_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=storage_name
CLOUDINARY_API_SECRET=cloudinary_api_key
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ammartalpur/next-social/
cd next-social
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Ammar Talpur**
Built with ❤️ using modern web technologies.
