from PIL import Image
from datetime import datetime

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
    output_image_name = f"UID_{timestamp_str}_fantasy.png"

    # Save the final image in the static folder
    output_image_path = f"static/{output_image_name}"
    base_image.save(output_image_path)

    # Return the path of the saved image
    return output_image_path

output_image_path = create_combined_image("static/UID_boy.png", "static/UID_girl.png", "fantasy_base.png")
print(f"Saved combined image to: {output_image_path}")