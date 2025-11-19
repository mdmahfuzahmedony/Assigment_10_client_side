# 🚗 **Roam Rides – Website Overview**

---

## 🌍 **Live Website**

🔗 **[https://assigment-10-client-side-lul3.vercel.app/](https://assigment-10-client-side-lul3.vercel.app/)**

📸 **Screenshot:** [https://i.ibb.co.com/cKcyD087/image.png](https://i.ibb.co.com/cKcyD087/image.png)

---

## 🌟 **Key Features & User Experience**

### 1️⃣ **Header Section**

* **Navigation:** Home, Browse Cars, Add Car, My Listing, My Booking
* **Authentication:** Easy Login / Register options
* **User Profile Modal:**

  * User Name & Email
  * Quick links: My Listing, My Booking
  * Logout button
* **Brand Logo:** "Roam Rides" branding at the top

---

### 2️⃣ **Home Page (`/`)**

#### 📌 **Banner Section**

* Catchy headline (e.g., *Your Next Adventure Starts Here*)
* High-quality image/video
* CTA buttons like **Browse Cars** / Search bar

#### 🚘 **Featured Products**

* Specially highlighted cars
* Cards include: Image, Name, Price, Rating, View Details

#### 🎡 **Product Carousel**

* Swiper-based car/category slider

#### ⭐ **Why Rent With Us?**

* Unique selling points: Easy booking, wide selection, flexible rental

#### 📰 **News & Articles**

* Blog posts, travel tips, rental guides

#### 💬 **Testimonial Section**

* Customer reviews and feedback

#### 📞 **Contact Section**

* Contact prompt or CTA to browse cars

---

### 3️⃣ **Browse Cars Page (`/browse-cars`)**

* Full car listing
* **Search bar** for car name
* **Filters:** Car type, price range, provider
* **Pagination** for large listings
* Cards show: Car image, name, type, rental price, View Details

---

### 4️⃣ **Add Car Page (`/add-car`)**

* Only authenticated users can access
* **Form Fields:**

  * Car Name
  * Type/Model
  * Provider
  * Rent Price
  * Image Upload
  * Description
* **Validation:** react-hook-form
* **Toast Notifications:** react-toastify

---

### 5️⃣ **My Listing Page (`/my-listing`)**

* User-specific car listings
* **Features:**

  * Edit car details
  * Delete listing
  * Status: Active / Pending / Rented

---

### 6️⃣ **Car Details Page (`/cars/:id`)**

* Full car specifications
* Large image gallery
* Provider information
* Rent price & availability

#### 📅 **Booking System**

* "Book Now" button
* Date selection (using **date-fns**)
* Booking form for contact info
* Availability check

---

### 7️⃣ **My Booking Page (`/my-booking`)**

* Shows all rentals made by the user
* Displays: Car info, rental dates, total price
* Neatly formatted dates using **date-fns**

---

### 8️⃣ **User Profile Modal**

* User name, email, photo
* Quick access links
* Logout option

---

## 🧩 **Essential NPM Packages & Tools**

| Package          | Purpose                  |
| ---------------- | ------------------------ |
| tailwindcss      | Styling                  |
| daisyui          | UI components            |
| react-router-dom | Routing                  |
| lucide-react     | Clean icons              |
| react-icons      | Icon collection          |
| date-fns         | Date formatting          |
| firebase         | Authentication & storage |
| framer-motion    | Animations               |
| react-tooltip    | Tooltip support          |
| react-hook-form  | Form handling            |
| react-toastify   | Notifications            |
| swiper           | Sliders & carousels      |

---

## ⬇️ **Footer Section**

* **Brand Name:** Roam Rides
* **Sections:** Home, Browse Cars, About, FAQ
* **Contact Information:** Email, phone
* **Newsletter Form:** Email subscription
* **Social Icons:** Facebook, Twitter, Instagram
* **Copyright:** © 2024 Roam Rides. All rights reserved.

---

## 🛠️ **How to Run the Project Locally**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-username/Roam_Rides.git
```

### **2️⃣ Enter the Project Directory**

```bash
cd Roam_Rides
```

### **3️⃣ Install Dependencies**

```bash
npm install
```

### **4️⃣ Setup Firebase Config**

Create a file:

```
src/firebase.config.js
```

Add your Firebase keys:

```js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export default app;
```

### **5️⃣ Start the Development Server**

```bash
npm run dev
```

🎉 Your **Roam Rides** website is now ready to run locally!
