"use client";
import React, { useState } from "react";

export default function AiHelp() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const sendApiRequest = async () => {
    if (selectedImage) {
      console.log("Sending API request");
      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedImage);
      const ML_URL = process.env.NEXT_PUBLIC_ML_URL;
      try {
        const response = await fetch(`${ML_URL}/predict-image`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log(data);
        setResponse(data);
      } catch (error) {
        setResponse({ error: "Error: Memory Overflow. Upgrade the Deploy to get more requests." });
        console.error("Error:", error);
      }
      setLoading(false);
    } else {
      console.log("No image selected");
      alert("Please select an image to proceed");
    }
  };

  const handleAskAI = () => {
    sendApiRequest();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-4 pb-4">
        <h1 className="text-4xl font-bold">AI Helper</h1>
        <div className="flex justify-center items-center h-[500px] mb-10 gap-12">
          <div className="flex flex-col h-full w-[600px] shadow-lg rounded-lg p-10 mt-5">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="p-2"
            />
            <div className="h-96">
              {selectedImage && (
                <div>
                  <h2>Selected Image:</h2>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    width={400}
                  />
                </div>
              )}
            </div>
            <button className="btn btn-info" onClick={handleAskAI}>
              Ask AI
            </button>
          </div>
          <div className="flex flex-col w-[600px] p-10 mt-5 h-full shadow-lg rounded-lg">
            <h1 className="text-2xl">
              Leaf disease detection and Response
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <></>
              )}
            </h1>
            {response && !response.error ? (
              <>
                <div className="flex flex-col">
                  <br />
                  <h2 className="text-2xl">Diagnosis:</h2>
                  <br />
                  <p>{response.diagnosis}</p>
                  <br />
                  <h2 className="text-2xl">Treatment:</h2>
                  {/* <br /> */}
                  <ul className="list-disc ml-6">
                    {response?.treatment.map((point: string, index: number) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <p>{response?.error}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
