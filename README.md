





# 🚗 Roam Rides Website Overview

**Website Name:** Roam Rides  
**Website URL:** https://assigment-10-client-side-lul3.vercel.app/
Srceenshort: https://i.ibb.co.com/cKcyD087/image.png

---

## 🌟 Key Features & User Experience

### 1️⃣ Header Section
- **Navigation:** Intuitive and responsive links for Home, Browse Cars, Add Car, My Listing, My Booking.  
- **User Authentication:** Prominent Login/Register options.  
- **User Profile Modal:**  
  - User information (Name, Email)  
  - Links: My Listing, My Booking  
  - Logout option  
- **Branding:** "Roam Rides" logo/name  

---

### 2️⃣ Home Page (`/`)
- **Banner Section:**  
  - Catchy headline (e.g., "Your Next Adventure Starts Here")  
  - High-quality background image/video  
  - Optional call-to-action: "Browse Cars" / quick search bar  

- **Featured Products Section:**  
  - Curated selection of top/new cars  
  - Each card shows: Car Name, Rent Price, Image  
  - "View Details" link  

- **Product Carousel:** Visually engaging slider showcasing cars/categories  

- **Why Rent with Us?:** Highlights USP (wide selection, easy booking, flexible rental)  

- **News & Articles:** Latest blog posts, travel guides, company news  

- **Testimonial Section:** Displays positive user reviews  

- **Call to Action / Contact:** Clear prompt to get in touch or browse more cars  

---

### 3️⃣ Browse Cars Page (`/browse-cars`)
- **Comprehensive Listing:** Displays all available cars  
- **Search & Filter:**  
  - Search bar by car name  
  - Filters: Car type, price range, provider  
- **Pagination:** Handles large number of listings  
- **Product Cards:** Car image, name, type, rental price + "View Details"  

---

### 4️⃣ Add Car Page (`/add-car`)
- **User Contribution:** Authenticated users can list cars  
- **Form Inputs:** Car Name, Type/Model, Provider, Rent Price, Image Upload, Description  
- **Validation & Feedback:**  
  - react-hook-form for validation  
  - react-toastify for success/error notifications  

---

### 5️⃣ My Listing Page (`/my-listing`)
- **User-Specific Content:** Shows all cars added by the user  
- **Management Actions:**  
  - Edit/Update car details  
  - Delete listing  
  - Status Display (Active, Pending Approval, Rented)  

---

### 6️⃣ Car Details Page (`/cars/:id`)
- **Detailed Information:** Large image gallery, full specs, rent price, provider details  
- **Booking Functionality:**  
  - "Book Now" button  
  - Date selection with **date-fns** integration  
  - Booking form collects user contact & payment placeholder  
  - Availability check for selected dates  

---

### 7️⃣ My Booking Page (`/my-booking`)
- **User's Rental History:** All cars booked by user  
- **Booking Details:** Car info, rental dates, total rent price  
- **Date Formatting:** Using **date-fns** for readable dates  

---

### 8️⃣ User Profile Modal (Accessed from Header)
- Displays user's name, email, profile picture  
- Quick Links: My Listing, My Booking  
- Logout option  

---

## 🧩 Essential NPM Packages & Tools
- **Styling:** tailwind css, daisy ui  
- **Routing:** react-router-dom  
- **Icons:** lucid-react, react-icons  
- **Date Management:** date-fns  
- **Authentication:** firebase  
- **Animations:** framer-motion, react-tooltip  
- **Form Management:** react-hook-form  
- **Notifications:** react-toastify  
- **Carousels/Sliders:** swiper  

---

## ⬇️ Footer Section
- **Website Name:** "Roam Rides" branding  
- **Explore:** Links to Home, Browse Cars, About Us, FAQ  
- **Contact:** Email, Phone, or Contact page link  
- **Newsletter:** Simple subscription form  
- **Social Media Links:** Icons linking to profiles  
- **Copyright:** © 2024 Roam Rides. All rights reserved.
