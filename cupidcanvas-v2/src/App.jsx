import { useState } from "react";
import axios from "axios";

function App() {
  // const [style, setStyle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    console.log("Sending request");
    setIsLoading(true);
    try {
      const response = await axios.post("http://13.200.175.247/generate", {
        "input_image_path_1": "b4.png",
        "input_image_path_2": "g3.png",
        "reference_image_path_1": "bp.png",
        "reference_image_path_2": "gp1.png",
        "style": "neonpunk",
        "gender_1": "boy",
        "gender_2": "girl"
    });
      // const response = await axios.get("http://13.200.175.247");
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
        Generate AI art cards of yourselves for that special person in your life
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <button className="btn btn-primary place-self-center mb-4 lg:my-0">
          Upload hers
        </button>
        <textarea
          className="textarea textarea-primary text-lg m-2"
          rows="6"
          placeholder="Enter your customised message here"
        ></textarea>
        <button className="btn btn-primary place-self-center mt-4 lg:my-0">
          Upload his
        </button>
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

export default App;