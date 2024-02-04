from flask_socketio import SocketIO, emit, send
from flask import Flask, request
import g4f
import chromadb
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from chromadb.config import DEFAULT_DATABASE, DEFAULT_TENANT, Settings
from sympy import Q
from torch import ge
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import os
import requests
from flask_cors import CORS
import base64
import functions as f
import skin_model as m
from collections import Counter

chroma_client = chromadb.Client(
    Settings(
        is_persistent=True,
        persist_directory="myntra_chroma_db_final_35000",
    )
)
collection_new = chroma_client.get_collection("myntra_db_final_35k")
collection_new.get()

app = Flask(__name__)
CORS(app)
socket = SocketIO(app, transports="polling", cors_allowed_origins="*")



history_openai_format = []

# keys = ['category', 'color', 'article_type', 'brand_name', 'occasion', 'other_info']
# categories = ['topwear','bottomwear','footwear','accessories']

history_openai_format.append({"role": "user", "content": "You are E-Commerce GPT, a professional Analyst from Fashion E-commerce industry with expertise in analysing user needs As E-Commerce GPT, generate an outfit for all four categories: topwear, bottomwear, footwear and accessories based on the user prompt For each category provide a general one line description of the product. If the user asks for a change, maintain the template(Topwear: ,Bottomwear: ,Footwear: ,Accessories: ) of the four categories and just change your answer in the field that requires change"})

@app.route('/')
def index():
    return "Client Connected"

@app.route("/virtual_stylist",methods=["POST"])
def virt_style():
    data = request.json
    image_url = data["url"]
    input_text = data["question"]
    # image_url = "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/16344092/2021/12/2/2d1d0dd2-20f0-4959-8a90-2a0923d4a6bc1638442948656ISUPinkFloralRegularTop1.jpg"
    # input_text = "Suggest some pants for this top"
    print(image_url)
    print(input_text)
    with open("image.jpg", "wb") as f:
        f.write(requests.get(image_url).content)
    driver = webdriver.Chrome()
    driver.get("https://llava.hliu.cc/")
    driver.implicitly_wait(10)
    drag_and_drop = driver.find_element(By.XPATH, '//input[@accept="image/*"]')
    drag_and_drop.send_keys(os.getcwd() + "/image.jpg")

    input_box = driver.find_element(By.XPATH, '//textarea[@data-testid="textbox"]')
    input_box.send_keys(input_text)
    input_box.send_keys(Keys.RETURN)
    time.sleep(30)
    output = driver.find_element(By.XPATH, '//div[@data-testid="bot"]/span').text
    driver.close()
    print(output) 
    return {"output": output}

@app.route("/color",methods=["POST"])
async def lip():

    data = request.json
    image_url = data["url"]
    with open("image_color.jpg", "wb") as fi:
        fi.write(requests.get(image_url).content)
    print("Image_saved")
    rgb_codes = f.get_rgb_codes('image_color.jpg')  #check point
    print("rgb_codes")
    random_rgb_codes = f.filter_lip_random(rgb_codes,40) #set number of randomly picked sample as 40
    print("haha")
    # os.remove("saved.jpg")
    
    types = Counter(f.calc_dis(random_rgb_codes))
    print("hello")
    max_value_key = max(types, key=types.get)
    print(max_value_key)
    if max_value_key == 'sp':
        result = "spring"
    elif max_value_key == 'su':
        result = "summer"
    elif max_value_key == 'au':
        result = "autumn"
    elif max_value_key == 'win':
        result = "winter"
    return {'output':result}
        
        
    # except Exception as e:
    #     return {"message":"fail"}

@socket.on('connect')
def handle_connect():
    print('Client connected')


@socket.on('llm_chat_bot')
def handle_message_bot(message_input):
    print("User connected here")
    message_text = message_input["text"]
    if message_input['gender'].lower()=='male':
        gender = "Men"
    else:
        gender = "Women"
    history_openai_format.append({"role": "user", "content": message_text})
    response = g4f.ChatCompletion.create(
        model="gpt-4",
        provider=g4f.Provider.Bing,
        messages=history_openai_format,
        stream=False)
    print(response)
    # emit('llm_chat', response)

    # Starting querying code
    query_text= response
    try:
        topwear_text = query_text.split("Topwear:")[1].split("Bottomwear:")[0].strip()
    except:
        topwear_text = ""
    try:
        bottomwear_text = query_text.split("Bottomwear:")[1].split("Footwear:")[0].strip()
    except:
        bottomwear_text = ""
    try:
        footwear_text = query_text.split("Footwear:")[1].split("Accessories:")[0].strip()
    except:
        footwear_text = ""
    try:
        accessories_text = query_text.split("Accessories:")[1].split("\n")[0].strip()
    except:
        accessories_text = ""


    print("Topwear Text:")
    print(topwear_text)
    print("Bottomwear Text:")
    print(bottomwear_text)
    print("Footwear Text:")
    print(footwear_text)
    print("Accessories Text:")
    print(accessories_text)

    id_to_img = pd.read_csv("images.csv")
    id_to_img["filename"] = [x.split(".")[0] for x in id_to_img["filename"]]

    # Extracting IDs for the best match products

    # Getting topwear
    if topwear_text == "":
        topwear_name, topwear_price, topwear_discounted_price, topwear_img = "", "", "", ""
    else:
        topwear_results = collection_new.query(
            query_texts=[topwear_text], n_results=2, where={"$and":[{"gender":gender},{"subCategory": "Topwear"}]}
        )
        try:
            topwear_results_final = topwear_results["ids"][0][0]

            topwear_img = id_to_img[id_to_img["filename"] == topwear_results_final][
                "link"
            ].values[0]

            # Getting topwear name, price, description
            topwear_path = f"/home/devashish/Desktop/work/DATATHON/file/content/fashion-dataset/styles/{topwear_results_final}.json"
            topwear_json = pd.read_json(topwear_path)
            topwear_name = topwear_json["data"]["productDisplayName"]
            topwear_price = topwear_json["data"]["price"]
            topwear_discounted_price = topwear_json["data"]["discountedPrice"]
        except:
            topwear_name, topwear_price, topwear_discounted_price, topwear_img = (
                "",
                "",
                "",
                "",
            )

    # Getting bottomwear
    if bottomwear_text == "":
        bottomwear_name, bottomwear_price, bottomwear_discounted_price, bottomwear_img = (
            "",
            "",
            "",
            "",
        )
    else:
        bottomwear_results = collection_new.query(
            query_texts=[bottomwear_text], n_results=2, where={"$and":[{"gender":gender},{"subCategory": "Bottomwear"}]}
        )
        try:
            bottomwear_results_final = bottomwear_results["ids"][0][0]
            bottomwear_img = id_to_img[id_to_img["filename"] == bottomwear_results_final][
                "link"
            ].values[0]
            # Getting bottomwear name, price, description
            bottomwear_path = f"/home/devashish/Desktop/work/DATATHON/file/content/fashion-dataset/styles/{bottomwear_results_final}.json"
            bottomwear_json = pd.read_json(bottomwear_path)
            bottomwear_name = bottomwear_json["data"]["productDisplayName"]
            bottomwear_price = bottomwear_json["data"]["price"]
            bottomwear_discounted_price = bottomwear_json["data"]["discountedPrice"]
        except:
            bottomwear_name, bottomwear_price, bottomwear_discounted_price, bottomwear_img = (
                "",
                "",
                "",
                "",
            )


    # Getting footwear
    if footwear_text == "":
        footwear_name, footwear_price, footwear_discounted_price, footwear_img = (
            "",
            "",
            "",
            "",
        )
    else:
        footwear_results = collection_new.query(
            query_texts=[footwear_text], n_results=2, where={"$and":[{"gender":gender},{"masterCategory": "Footwear"}]}
        )
        try:
            footwear_results_final = footwear_results["ids"][0][0]
            footwear_img = id_to_img[id_to_img["filename"] == footwear_results_final][
                "link"
            ].values[0]

            # Getting footwear name, price, description
            footwear_path = f"/home/devashish/Desktop/work/DATATHON/file/content/fashion-dataset/styles/{footwear_results_final}.json"
            footwear_json = pd.read_json(footwear_path)
            footwear_name = footwear_json["data"]["productDisplayName"]
            footwear_price = footwear_json["data"]["price"]
            footwear_discounted_price = footwear_json["data"]["discountedPrice"]
        except:
            footwear_name, footwear_price, footwear_discounted_price, footwear_img = (
                "",
                "",
                "",
                "",
            )

    # Getting accessories
    if accessories_text == "":
        (
            accessories_name,
            accessories_price,
            accessories_discounted_price,
            accessories_img,
        ) = ("", "", "", "")
    else:
        accessories_results = collection_new.query(
            query_texts=[accessories_text],
            n_results=2,
            where={"$and":[{"gender":gender},{"masterCategory": "Accessories"}]},
        )
        try:
            accessories_results_final = accessories_results["ids"][0][0]

            accessories_img = id_to_img[id_to_img["filename"] == accessories_results_final][
                "link"
            ].values[0]

            # Getting accessories name, price, description
            accessories_path = f"/home/devashish/Desktop/work/DATATHON/file/content/fashion-dataset/styles/{accessories_results_final}.json"
            accessories_json = pd.read_json(accessories_path)
            accessories_name = accessories_json["data"]["productDisplayName"]
            accessories_price = accessories_json["data"]["price"]
            accessories_discounted_price = accessories_json["data"]["discountedPrice"]
        except:
            (
                accessories_name,
                accessories_price,
                accessories_discounted_price,
                accessories_img,
            ) = ("", "", "", "")

    print(topwear_name, topwear_price, topwear_discounted_price, topwear_img)
    print(bottomwear_name, bottomwear_price, bottomwear_discounted_price, bottomwear_img)
    print(footwear_name, footwear_price, footwear_discounted_price, footwear_img)
    print(
        accessories_name, accessories_price, accessories_discounted_price, accessories_img
    )

    final_output_data = {
        "text": query_text,
        "topwear": {
            "name": topwear_name,
            "price": topwear_price,
            "img": topwear_img,
        },
        "bottomwear": {
            "name": bottomwear_name,
            "price": bottomwear_price,
            "img": bottomwear_img,
        },
        "footwear": {
            "name": footwear_name,
            "price": footwear_price,
            "img": footwear_img,
        },
        "accessories": {
            "name": accessories_name,
            "price": accessories_price,
            "img": accessories_img,
        },
    }


    # Emitting the final output
    emit('llm_chat', final_output_data)



    # Appending response to the output for history
    output = ""
    for message in response:
        output = output + message
        # emit('llm_chat', output)
        # print(output)
    history_openai_format.append({"role": "assistant", "content": output})

@socket.on('clear_chat')
def clear_chat():
    history_openai_format.clear()
    history_openai_format.append({"role": "system", "content": "You are E-Commerce GPT, a professional Analyst from Fashion E-commerce industry with expertise in analysing user needs As E-Commerce GPT, generate an outfit for all four categories: topwear, bottomwear, footwear and accessories based on the user prompt For each category provide a general one line description of the product. If the user asks for a change, keep the previous response intact and just change your answer in the field that requires change"})
    emit('clear_chat', "Chat cleared")
    
@socket.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

    
if __name__ == '__main__':
    app.run(debug=True)