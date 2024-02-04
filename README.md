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

## What it looks like:
**This is the Home screen of the Application**
![SS1](https://github.com/divijakinger/fashionAI/assets/79623853/ae52c242-c023-4c77-bbdc-a5cbfc2acc2e)
![SS2](https://github.com/divijakinger/fashionAI/assets/79623853/16dec7fa-ed48-4a1a-9edb-7782e96c74ea)

**If you would like to talk to the Fashion Expert AI you can do so over here**
![SS3](https://github.com/divijakinger/fashionAI/assets/79623853/3bad0732-d819-46ff-bb12-8a06d49a3f5d)

**Like this**
![SS4](https://github.com/divijakinger/fashionAI/assets/79623853/b69dab48-ba0b-4d45-9896-75c99e7fb952)

![SS5](https://github.com/divijakinger/fashionAI/assets/79623853/4975fa54-8b9f-4dc0-8be4-c7dacba2c0a3)

**you can also ask for more suggestions for mixing and matching different styles**
![SS6](https://github.com/divijakinger/fashionAI/assets/79623853/170715ab-cca7-4170-b42f-7ea2a8e01143)
![SS7](https://github.com/divijakinger/fashionAI/assets/79623853/e162d11c-4ec1-4113-aaa0-0f02234419b4)

**If you are not sure what kind of colors to choose for your personal tone, Ask the Color Expert who can suggest the palette of colors that look the best with your skin tone**
![SS10](https://github.com/divijakinger/fashionAI/assets/79623853/b8fc472f-48e6-4bac-ab48-5c9373945d1d)
![SS9](https://github.com/divijakinger/fashionAI/assets/79623853/4d99cd73-608e-47a6-9762-9932d4ed4b6b)

**For example, This is Shubh,**

![shubh-removebg](https://github.com/divijakinger/fashionAI/assets/79623853/985b3cd8-f4ce-43be-829a-ed70e77bab6b)

**and he is not so sure about the type of clothes that he should wear for an outing with his friends but fret not, your Fashion Companion is here to save the Day!! with just a few clicks and a question to the Fashion expert you can get the best fashion suggestions ever, just like this:-**

![SS12](https://github.com/divijakinger/fashionAI/assets/79623853/456ad4ac-2fd8-4841-a4d1-d7457694f897)


OnPoint - Where Fashion Meets Innovation! 🚀✨👗👠
