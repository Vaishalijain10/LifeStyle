import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import  set1  from "../images/trends.jpeg";
import  set2  from "../images/Wallcollection.jpeg";
import  set3  from "../images/SET 1.jpg";

// Sample advertisement data
const adsData = [
  {
    id: 1,
    image: `${set2}`,
    title: "Exciting Sale!",
    description: "Get up to 50% off on selected items.",
    tags: ["Discount", "Sale", "Limited Time"],
  },
  {
    id: 2,
    image: `${set1}`,
    title: "New Arrivals!",
    description: "Discover the latest trends in fashion.",
    tags: ["New", "Fashion", "Trends"],
  },
  {
    id: 3,
    image: `${set3}`,
    title: "Exclusive Offer!",
    description: "Free shipping on orders over $50.",
    tags: ["Free Shipping", "Offer", "Shop Now"],
  },
];

export default function AdsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? adsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === adsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-full mx-auto overflow-hidden mt-5">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {adsData.map((ad) => (
          <div key={ad.id} className="relative min-w-full">
            <img
              src={ad.image}
              alt={ad.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-40 p-4">
              <h1 className="text-2xl font-bold mb-2">{ad.title}</h1>
              <p className="text-lg mb-4">{ad.description}</p>
              <div className="flex space-x-2">
                {ad.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
