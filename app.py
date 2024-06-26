from flask import Flask, request, jsonify, send_from_directory
import os
import shutil
from gradio_client import Client
import time
from datetime import datetime
from PIL import Image
from flask_cors import CORS


styles_prompts = {
    "lineart": "line art drawing {prompt} . professional, sleek, modern, minimalist, graphic, line art, vector graphics",
    "anime": "anime artwork {prompt} . anime style, key visual, vibrant, studio anime, highly detailed",
    "fantasy": "ethereal fantasy concept art of {prompt} . magnificent, celestial, ethereal, painterly, epic, majestic, magical, fantasy art, cover art, dreamy",
    "neonpunk": "neonpunk style {prompt} . cyberpunk, vaporwave, neon, vibes, vibrant, stunningly beautiful, crisp, detailed, sleek, ultramodern, magenta highlights, dark purple shadows, high contrast, cinematic, ultra detailed, intricate, professional",
    "digitalart": "concept art {prompt} . digital artwork, illustrative, painterly, matte painting, highly detailed",
    "comic": "comic {prompt} . graphic illustration, comic art, graphic novel art, vibrant, highly detailed"
}


def create_combined_image(input_image_path_1, input_image_path_2, base_image_path):
    # Open the images
    image1 = Image.open(input_image_path_1)
    image2 = Image.open(input_image_path_2)
    base_image = Image.open(base_image_path)

    # Print the size of each image
    print(f"Size of image1: {image1.size}")
    print(f"Size of image2: {image2.size}")
    print(f"Size of base_image: {base_image.size}")

    # Place images on the base image
    base_image.paste(image1, (0-100, 1024))
    base_image.paste(image2, (1414-832+100,0))

    # Generate a unique identifier (UID) using the current date and time
    now = datetime.now()
    timestamp_str = now.strftime("%Y%m%d_%H%M%S")
    output_image_name = f"UID_{timestamp_str}_final.png"

    # Save the final image in the static folder
    output_image_path = f"static/{output_image_name}"
    base_image.save(output_image_path)

    # Return the path of the saved image
    return output_image_path

def generate_image(input_image_path_1, input_image_path_2, style, gender_1, gender_2):
    client = Client("https://instantx-instantid.hf.space/")
    image_paths = []
    for input_image_path, reference_image_path, gender in [(input_image_path_1, "bp.png", gender_1), (input_image_path_2, "gp1.png", gender_2)]:
        while True:
            try:
                result = client.predict(
                    input_image_path,
                    reference_image_path,
                    styles_prompts[style].format(prompt=gender),
                    "(lowres, low quality, worst quality:1.2), (text:1.2), watermark, (frame:1.2), deformed, ugly, deformed eyes, blur, out of focus, blurry, deformed cat, deformed, photo, anthropomorphic cat, monochrome, pet collar, gun, weapon, blue, 3d, drones, drone, buildings in background, green",
                    "(No style)",
                    5,
                    1,
                    1,
                    0.4,
                    0.4,
                    0.4,
                    ["pose"],
                    1.5,
                    1692974466,
                    "DEISMultistepScheduler",
                    True,
                    True,
                    api_name="/generate_image"
                )
                
                # Get the first item in the result (assumed to be the image path)
                image_path = result[0]
                # Create a static directory if it doesn't exist
                if not os.path.exists('static'):
                    os.makedirs('static')
                # Get current time
                now = datetime.now()
                # Format as string in the format YYYYMMDD_HHMMSS
                timestamp_str = now.strftime("%Y%m%d_%H%M%S")
                # Use this timestamp as part of the image name
                image_name = f"UID_{timestamp_str}_{gender}.png"
                # Copy the image to the static directory
                shutil.copy(image_path, f'static/{image_name}')
                # Add the new image path to the list
                image_paths.append(f'static/{image_name}')
                break
            except Exception as e:
                print(f"Error: {e}. Retrying...")
                time.sleep(5)
    
    final_path = create_combined_image(image_paths[0], image_paths[1], "{style}_base.png".format(style=style))
    return final_path


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Welcome to the InstantX InstantID API!"

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    input_image_path_1 = data.get('input_image_path_1')
    input_image_path_2 = data.get('input_image_path_2')
    style = data.get('style')
    gender_1 = data.get('gender_1')
    gender_2 = data.get('gender_2')

    image_paths = generate_image(input_image_path_1, input_image_path_2, style, gender_1, gender_2)
    return {'image_paths': image_paths}

@app.route('/static/<filename>')
def custom_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run()