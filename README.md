# OnPoint - Your Ultimate Fashion Companion 👗👠

Welcome to OnPoint, where fashion meets technology to redefine your style experience. 🌟 This cutting-edge fashion assistant combines advanced technologies to bring you a seamless and personalized journey through the world of style.

## Features

### 1. Fashion Outfit Generator 🌈

Effortlessly create complete outfits by describing your occasion, age, and location. OnPoint's algorithm curates the perfect ensemble, including footwear and accessories, for any event.

### 2. Virtual Stylist 📸💄

Capture the essence of your favorite clothing piece through a photo and let the virtual stylist suggest complementary items. Receive expert advice on how to mix and match your wardrobe for an effortlessly stylish look.

### 3. Color Palette Generator 🎨🌈

Discover your ideal color palette based on color therapy and facial complexion analysis. OnPoint helps you identify colors that enhance your natural features, ensuring you always look and feel your best.

### 4. Virtual Try On 🤳👗

Visualize your selected outfits with the virtual try-on feature. Upload a photo, specify your desired looks, and see how they enhance your style before making any decisions.

## Techstack 🖥️

- **Frontend:** React JS
- **APIs:** All connections are done through WebSockets in Flask
- **Backend:** LLMs are implemented using Python

## Getting Started 🚀

1. **Clone the repository:** `git clone https://github.com/yourusername/OnPoint.git`
2. **Install dependencies:** `npm install`
3. **Run the application:** `npm start`

## How does it work?

🔍 **Step 1: Insights from User Prompt:** 
   - **Problem:** Understanding what the user wants from the prompt.
   - **Solution:** The user's prompt is processed to understand factors such as Age, Location, and Occasion using LLM.

🌟 **Step 2: Insights from Latest Fashion Trends:**
   - **Problem:** Identifying latest trends from social media.
   - **Solution:** Top trending fashion posts are scraped from Instagram Fashion Influencers, processed through a Vision Assistance model, and stored for reference.

🗃️ **Step 3: Creating a VectorDB:**
   - A database of all fashion products is vectorized for faster and efficient matching and retrieval.

🔍 **Step 4: Searching the VectorDB:**
   - The insights from the user prompt and latest fashion trends are combined to generate a query for searching in ChromaDB.

🛠️ **Step 5: Processing Insights:**
   - Combining insights from user prompts to generate a usable search query for ChromaDB, later converted to embeddings for efficient searching.

🚀 **Step 6: Serving User:**
   - Using Flask-SocketIO to serve ChromaDB search results to the user via a POST request.

🔄 **Step 7: Incorporating User-Requested Outfit Changes:**
   - Identifying necessary changes based on the user's evolving prompt and searching VectorDB again to adjust the outfit accordingly.

![Diagram1](https://github.com/divijakinger/fashionAI/assets/79623853/cf752988-0c27-4998-aad5-006c4bc3649c)

OnPoint - Where Fashion Meets Innovation! 🚀✨👗👠
