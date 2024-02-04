# OnPoint - Your Ultimate Fashion Companion 👗👠

## Overview

OnPoint is a cutting-edge fashion assistant designed to revolutionize your style game. This project combines advanced technologies to provide users with a seamless and personalized fashion experience.

## Features

### 1. Fashion Outfit Generator 🌟

Generate complete outfits effortlessly by describing your occasion, age, and location. OnPoint's algorithm curates a complete outfit with footwear and accessories to create the perfect ensemble for any event.

### 2. Virtual Stylist 📸💄

Take a photo of your favorite clothing piece, and let the virtual stylist suggest complementary items. Receive expert advice on how to mix and match your wardrobe for a stylish look.

### 3. Color Palette Generator 🎨🌈

Discover your ideal color palette based on color therapy and facial complexion analysis. OnPoint helps you identify colors that enhance your natural features, ensuring you always look your best.

### 4. Virtual Try On 🤳👗

Visualize your selected outfits with the virtual try-on feature. Upload a photo, specify your desired outfits, and see how they look on you before making any decisions.

## Techstack 🖥️

1. Frontend: React JS
2. APIs: All connections are done through WebSockets in Flask
3. Backend: LLMs are implemented using Python


## Getting Started 🚀

1. Clone the repository: `git clone https://github.com/yourusername/OnPoint.git`
2. Install dependencies: `npm install`
3. Run the application: `npm start`

## How does it work?

Step 1: Insights from User Prompt : Problem : Understanding what user wants from the prompt. Solution : User’s prompt is processed to understand the different factors in the user's prompt. Factors such as Age, Location, Ocassion are all considered by the LLM

Step 2: Insights from Latest Fashion Trends: Problem : Finding & identifying latest trends from social media. Solution : Top trending fashion posts are scrapped from Instagram Fashion Influencers. These pictures are then passed through a Vision Assistance model to describe their outfits and then these descriptions are stored in a csv.

Step 3: Creating a VectorDB: A database of all the fashion products are vectorized for faster and efficient matching and retrieval.

Step 4: Searching the VectorDB: The three type of insights generated in the previous step are combined to generate a query to be used for searching in ChromaDB

![Fashion Assistant](Diagram1.png)


Step 5: Processing Insights: Problem : We need to process K-V pairs from insights to form a usable search query for ChromaDB Solution : We combine the K-V pairs from the insights to generate search query & filters for ChromaDB, later converted to embeddings for searching.



Step 6: Serving user: Problem : Serving the results through Backend Solution : Using Flask-SocketIO to serve ChromaDB search results to the user via a POST request.

Step 7: Incorporating the user requested outfit changes: Problem: Making changes to the outfit according to the user’s changing prompt. Solution: LLM identifies what needs to be changed and based on that VectorDB is searched again.

