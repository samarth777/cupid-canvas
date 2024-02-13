from gradio_client import Client
import time

# Define the styles and their prompts
styles_prompts = {
    "lineart": "line art drawing {prompt} . professional, sleek, modern, minimalist, graphic, line art, vector graphics",
    "anime": "anime artwork {prompt} . anime style, key visual, vibrant, studio anime, highly detailed",
    "fantasy": "ethereal fantasy concept art of {prompt} . magnificent, celestial, ethereal, painterly, epic, majestic, magical, fantasy art, cover art, dreamy",
    "neonpunk": "neonpunk style {prompt} . cyberpunk, vaporwave, neon, vibes, vibrant, stunningly beautiful, crisp, detailed, sleek, ultramodern, magenta highlights, dark purple shadows, high contrast, cinematic, ultra detailed, intricate, professional",
    "digitalart": "concept art {prompt} . digital artwork, illustrative, painterly, matte painting, highly detailed",
    "comic": "comic {prompt} . graphic illustration, comic art, graphic novel art, vibrant, highly detailed"
}

def generate_image(input_image_path, reference_image_path, style, gender):
    client = Client("https://instantx-instantid.hf.space/--replicas/pv5ou/")
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
            return result
        except Exception as e:
            print(f"Error: {e}. Retrying...")
            time.sleep(5)
            

result_path = generate_image("b4.png", "gp1.png", "digitalart", "boy")
print(result_path)