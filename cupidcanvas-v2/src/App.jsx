import { useState } from "react";

function App() {
  return (
    <div>
      <h1 className="text-center text-5xl font-fancyFont font-bold my-6">
        Cupid Canvas
      </h1>
      <h3 className="text-center mb-8 font-semibold text-2xl">
        Generate AI art cards of yourselves for that special person in your life
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <button class="btn btn-primary place-self-center mb-4 lg:my-0">
          Upload hers
        </button>
        <textarea
          className="textarea textarea-primary text-lg m-2"
          rows="8"
          placeholder="Enter your customised message here"
        ></textarea>
        <button class="btn btn-primary place-self-center mt-4 lg:my-0">
          Upload his
        </button>
      </div>
      <button class="mx-auto btn btn-primary mt-8 mb-4">
        Generate Picture
      </button>
      {/* <div></div> */}
    </div>
  );
}

export default App;
