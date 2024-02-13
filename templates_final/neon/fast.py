from gradio_client import Client

client = Client("https://instantx-instantid.hf.space/--replicas/pv5ou/")
result = client.predict(
		"g1.jpeg",	# filepath  in 'Upload a photo of your face' Image component
		"gp1.png",	# filepath  in 'Upload a reference pose image (Optional)' Image component
		"neonpunk style {prompt} . cyberpunk, vaporwave, neon, vibes, vibrant, stunningly beautiful, crisp, detailed, sleek, ultramodern, magenta highlights, dark purple shadows, high contrast, cinematic, ultra detailed, intricate, professional",	# str  in 'Prompt' Textbox component
		"(lowres, low quality, worst quality:1.2), (text:1.2), watermark, (frame:1.2), deformed, ugly, deformed eyes, blur, out of focus, blurry, deformed cat, deformed, photo, anthropomorphic cat, monochrome, pet collar, gun, weapon, blue, 3d, drones, drone, buildings in background, green",	# str  in 'Negative Prompt' Textbox component
		"(No style)",	# Literal['(No style)', 'Spring Festival', 'Watercolor', 'Film Noir', 'Neon', 'Jungle', 'Mars', 'Vibrant Color', 'Snow', 'Line art']  in 'Style template' Dropdown component
		5,	# float (numeric value between 1 and 100) in 'Number of sample steps' Slider component
		1,	# float (numeric value between 0 and 1.5) in 'IdentityNet strength (for fidelity)' Slider component
		1,	# float (numeric value between 0 and 1.5) in 'Image adapter strength (for detail)' Slider component
		0.4,	# float (numeric value between 0 and 1.5) in 'Pose strength' Slider component
		0.4,	# float (numeric value between 0 and 1.5) in 'Canny strength' Slider component
		0.4,	# float (numeric value between 0 and 1.5) in 'Depth strength' Slider component
		["pose"],	# List[Literal['pose', 'canny', 'depth']]  in 'Controlnet' Checkboxgroup component
		1.5,	# float (numeric value between 0.1 and 20.0) in 'Guidance scale' Slider component
		1692974466,	# float (numeric value between 0 and 2147483647) in 'Seed' Slider component
		"DEISMultistepScheduler",	# Literal['DEISMultistepScheduler', 'HeunDiscreteScheduler', 'EulerDiscreteScheduler', 'DPMSolverMultistepScheduler', 'DPMSolverMultistepScheduler-Karras', 'DPMSolverMultistepScheduler-Karras-SDE']  in 'Schedulers' Dropdown component
		True,	# bool  in 'Enable Fast Inference with LCM' Checkbox component
		True,	# bool  in 'Enhance non-face region' Checkbox component
		api_name="/generate_image"
)
print(result)