import { useState } from "react";
import axios from "axios";
// import { storage } from "../firebaseConfig"; // Assuming you have a firebaseConfig file where you initialize Firebase

const images = [
  {
    name: "comic",
    url: "/comic.png",
  },
  {
    name: "anime",
    url: "/anime.png",
  },
  {
    name: "fantasy",
    url: "/fantasy.png",
  },
  {
    name: "neonpunk",
    url: "/neonpunk.png",
  },
  {
    name: "digitalart",
    url: "/digitalart.png",
  },
  {
    name: "lineart",
    url: "/lineart.png",
  },
];

function Home() {
  // const [style, setStyle] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const [herImage, setHerImage] = useState(null);
  const [hisImage, setHisImage] = useState(null);
  const [style, setStyle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({
    herUrl: "",
    hisUrl: "",
  });

  const handleFileChange = (setImage) => (event) => {
    if (event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  // Function to handle image upload to Firebase Storage
  const uploadImageToFirebase = async (file, path) => {
    try {
      const snapshot = await storage.ref(path).put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  };

  async function handleClick() {
    console.log("Sending request");
    setIsLoading(true);
    try {
      const response = await axios.post("http://13.200.175.247/generate", {
        input_image_path_1:
          "https://manofmany.com/wp-content/uploads/2021/04/Hair-for-Your-Face-Shape-1067x800.jpg",
        input_image_path_2: "g1.jpeg",
        style: "comic",
        gender_1: "boy",
        gender_2: "girl",
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-center text-5xl font-fancyFont font-bold my-6">
        Cupid Canvas
      </h1>
      <h3 className="text-center mb-8 font-semibold text-2xl">
        Choose your art style
      </h3>
      <div className="carousel relative shadow-2xl bg-white">
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-item cursor-pointer"
            onClick={() => setStyle(image.name)}
          >
            <img
              src={image.url}
              alt={image.name}
              height="500"
              width="353.5"
              // className="w-full h-auto"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <input
          type="file"
          accept="image/*"
          hidden
          id="herImageInput"
          onChange={handleFileChange(setHerImage)}
        />
        <label
          htmlFor="herImageInput"
          className="btn btn-primary place-self-center mb-4 lg:my-0"
        >
          Upload hers
        </label>
        <input
          type="file"
          accept="image/*"
          hidden
          id="hisImageInput"
          onChange={handleFileChange(setHisImage)}
        />
        <label
          htmlFor="hisImageInput"
          className="btn btn-primary place-self-center mt-4 lg:my-0"
        >
          Upload his
        </label>
        <button
          className="mx-auto btn btn-primary my-8 lg:col-span-3 place-self-center"
          onClick={handleClick}
        >
          Generate Picture
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default Home;
