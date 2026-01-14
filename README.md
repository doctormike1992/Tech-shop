# 🛒 Tech-Eshop

A modern **e-commerce web application** for computer parts, built with **React**, **Redux Toolkit**, **React Router**, and **Firebase**.

🔗 **Live Demo:**  
https://tech-shop-1axp.vercel.app/

---

## 🚀 Features

### 🔐 User Authentication
- Sign up & Login with Firebase Authentication  
- Only authenticated users can place orders  
- Users can **add and update their personal information**

---

### 🛍️ Product Browsing
- View all available products  
- Product details page for each item  

---

### 📦 Order System
- Users can place orders  
- Each order:
  - Is linked to the authenticated user
  - Has an **order date**
  - Has a **delivery date**, based on the product’s delivery time  
- Order status **updates dynamically** depending on:
  - The day the order was placed
  - The delivery time of each product

---

### 👤 User Orders
- Users can:
  - View their own orders
  - See order status and delivery progress  

---

### 🔐 Admin Access
- Admin authentication is handled via Firebase  
- Admin functionality includes:
  - Adding new products
  - Updating existing products
  - Deleting products  

⚠️ **Note:**  
The administrator **cannot view orders** or see which users placed them.

---

### 🌐 Routing
- Clean and dynamic navigation using **React Router**
- Protected routes for authenticated users and admin pages

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router
- Tailwind CSS

### Backend / Services
- Firebase Authentication
- Firebase Firestore
- Firebase Storage

---

## 📌 Project Status

✅ **Finished**

This project is complete and fully functional, serving as a **portfolio project** showcasing real-world e-commerce functionality using modern React tools.




