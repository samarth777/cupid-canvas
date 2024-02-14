import { useEffect, useState } from "react";
import axios from "axios";
// import { storage } from "../firebaseConfig"; // Assuming you have a firebaseConfig file where you initialize Firebase
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [herImage, setHerImage] = useState(null);
  const [hisImage, setHisImage] = useState(null);
  const [style, setStyle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({
    herUrl: "",
    hisUrl: "",
  });
  const [herImageName, setHerImageName] = useState("");
  const [hisImageName, setHisImageName] = useState("");

  useEffect(() => {
    console.log(herImage, hisImage);
  }, [herImage, hisImage]);

  // const handleFileChange = (setImage) => (event) => {
  //   if (event.target.files[0]) {
  //     setImage(URL.createObjectURL(event.target.files[0]));
  //   }
  //   // console.log()
  // };

  const handleFileChange = (setImage, setImageName) => (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageName(event.target.files[0].name);
    }
  };

  // Function to handle image upload to Firebase Storage
  // const uploadImageToFirebase = async (file, path) => {
  //   try {
  //     const snapshot = await storage.ref(path).put(file);
  //     const downloadURL = await snapshot.ref.getDownloadURL();
  //     console.log(downloadURL);
  //     return downloadURL;
  //   } catch (error) {
  //     console.error("Error uploading image: ", error);
  //     throw error;
  //   }
  // };

  const uploadImageToFirebase = async (file, path) => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  };

  // async function handleClick() {
  // uploadImageToFirebase(herImage, "/imgs")
  // console.log("Sending request");
  // setIsLoading(true);
  // try {
  //   const response = await axios.post("http://13.200.175.247/generate", {
  //     input_image_path_1:
  //       "https://manofmany.com/wp-content/uploads/2021/04/Hair-for-Your-Face-Shape-1067x800.jpg",
  //     input_image_path_2: "g1.jpeg",
  //     style: "comic",
  //     gender_1: "boy",
  //     gender_2: "girl",
  //   });
  //   console.log(response);
  // } catch (error) {
  //   console.error("Error fetching data: ", error);
  // } finally {
  //   setIsLoading(false);
  // }
  // }

  async function handleClick() {
    if (style === "") {
      alert("Please click on an image to select a style before generating the picture.");
      return;
    }
    let downloadURL1, downloadURL2;
    try {
      downloadURL1 = await uploadImageToFirebase(
        herImage,
        `/imgs/${Math.floor(Math.random() * 10000000)}`
      );
      console.log(downloadURL1);
      downloadURL2 = await uploadImageToFirebase(
        hisImage,
        `/imgs/${Math.floor(Math.random() * 10000000)}`
      );
      console.log(downloadURL2);
    } catch (error) {
      console.error("Failed to upload image: ", error);
    }

    console.log("Sending request");
    setIsLoading(true);
    try { 
      const response = await axios.post("http://13.200.175.247/generate", {
        input_image_path_1: downloadURL2,
        input_image_path_2: downloadURL1,
        style: style,
        gender_1: "boy",
        gender_2: "girl",
      });
      console.log(response);
      navigate("/result?src=" + encodeURIComponent("http://13.200.175.247/"+response.data.image_paths));
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
      <h3 className="text-center mb-4 font-semibold text-2xl">
        Choose your art style: {style}
      </h3>
      <div className="carousel relative shadow-2xl bg-white mb-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-item cursor-pointer mx-2"
            onClick={() => setStyle(image.name)}
          >
            <img src={image.url} alt={image.name} height="500" width="353.5" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="place-self-center">
          <input
            type="file"
            accept="image/*"
            hidden
            id="herImageInput"
            onChange={handleFileChange(setHerImage, setHerImageName)}
          />
          <label
            htmlFor="herImageInput"
            className="btn btn-primary mt-4 lg:my-0"
          >
            Upload hers {herImageName && `(${herImageName})`}
          </label>
        </div>
        <h3 className="text-2xl font-semibold text-center">Generate AI Art Cards</h3>
        <div className="place-self-center">
          <input
            type="file"
            accept="image/*"
            hidden
            id="hisImageInput"
            onChange={handleFileChange(setHisImage, setHisImageName)}
          />
          <label
            htmlFor="hisImageInput"
            className="btn btn-primary mt-4 lg:my-0"
          >
            Upload his {hisImageName && `(${hisImageName})`}
          </label>
        </div>
        <button
          className="mx-auto btn btn-primary lg:col-span-3 place-self-center"
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
