# 🛍️ Next.js Product Management App

A simple full-stack Next.js application demonstrating:

-   Product creation and storage using MongoDB + Mongoose
-   Server and Client Components
-   Dynamic + static rendering
-   Data fetching and rendering strategies

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/amanraj078/ecommerce-talantoncore.git
cd next-mongo-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
MONGODB_URI=your_actual_mongodb_uri
```

### 4. Run the Development Server

```bash
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🏗️ Rendering Strategy

| Page               | File Path                                                  | Rendering Type           | Reason                                        |
| ------------------ | ---------------------------------------------------------- | ------------------------ | --------------------------------------------- |
| `/`                | `app/page.js`                                              | Static                   | Simple homepage with minimal data             |
| `/products`        | `app/products/page.js`                                     | Client                   | Handles form submission and interactivity     |
| `/recommendations` | `app/recommendations/page.js` + `RecommendationsClient.js` | Hybrid (Server + Client) | Fetch data on server, handle clicks on client |

---

## 🧩 Database Setup

1. Create a free MongoDB Atlas cluster or run MongoDB locally.
2. Copy your MongoDB connection string.
3. Paste it into `.env.local`:

    ```
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
    ```

4. On first run, Mongoose auto-creates the `products` collection.

---

## 📂 Folder Overview

| Folder    | Purpose                      |
| --------- | ---------------------------- |
| `app/`    | All routes and UI components |
| `lib/`    | Database connection helper   |
| `models/` | Mongoose models              |
| `public/` | Screenshots, static assets   |

---

## 🖼️ Screenshots

-   ![Home](public/home.png)
-   ![Add Product](public/product-form.png)
-   ![Recommendations](public/recommendations.png)

---

## 🧠 Tech Stack

-   Next.js 16
-   React 19
-   MongoDB + Mongoose
-   Tailwind CSS

---

# Made by Aman Raj Kashyap - 31-10-2025
