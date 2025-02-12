import React, { useState } from "react";

export default function CreateListing() {
  const [listingData, setListingData] = useState({
    name: "",
    description: "",
    address: "",
    sell: false,
    rent: false,
    parking: false,
    furnished: false,
    offer: false,
    numBedrooms: "",
    numBathrooms: "",
    images: [] // Add an images array to store file objects
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setListingData({
      ...listingData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setListingData({
      ...listingData,
      images: files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(listingData);
    alert("Listing submitted!");
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Create Listing</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={listingData.name}
                onChange={handleChange}
                className="p-4 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 hover:border-yellow-600"
                required
                placeholder="Enter listing name"
              />
            </div>

            {/* Description Input */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-lg font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={listingData.description}
                onChange={handleChange}
                className="p-4 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 hover:border-yellow-600"
                required
                placeholder="Enter description"
              />
            </div>
          </div>

          {/* Address Input */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-lg font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={listingData.address}
              onChange={handleChange}
              className="p-4 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 hover:border-yellow-600"
              required
              placeholder="Enter address"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label htmlFor="images" className="text-lg font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="p-4 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 hover:border-yellow-600"
            />
            {listingData.images.length > 0 && (
              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700">Selected Images:</h3>
                <ul>
                  {listingData.images.map((image, index) => (
                    <li key={index} className="text-sm text-gray-600">{image.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Checkboxes for Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Options (sell, rent, parking, furnished) */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sell"
                name="sell"
                checked={listingData.sell}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="sell" className="ml-2 text-lg text-gray-700">
                For Sale
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rent"
                name="rent"
                checked={listingData.rent}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="rent" className="ml-2 text-lg text-gray-700">
                For Rent
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="parking"
                name="parking"
                checked={listingData.parking}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="parking" className="ml-2 text-lg text-gray-700">
                Parking Spot
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="furnished"
                name="furnished"
                checked={listingData.furnished}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="furnished" className="ml-2 text-lg text-gray-700">
                Furnished
              </label>
            </div>
          </div>

          {/* Offer Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="offer"
              name="offer"
              checked={listingData.offer}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="offer" className="ml-2 text-lg text-gray-700">
              Special Offer
            </label>
          </div>

          {/* Number of Bedrooms and Bathrooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="numBedrooms" className="text-lg font-medium text-gray-700 mb-2">
                Number of Bedrooms
              </label>
              <input
                type="number"
                id="numBedrooms"
                name="numBedrooms"
                value={listingData.numBedrooms}
                onChange={handleChange}
                className="p-4 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 hover:border-yellow-600"
                required
                min="1"
                placeholder="Enter number of bedrooms"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="numBathrooms" className="text-lg font-medium text-gray-700 mb-2">
                Number of Bathrooms
              </label>
              <input
                type="number"
                id="numBathrooms"
                name="numBathrooms"
                value={listingData.numBathrooms}
                onChange={handleChange}
                className="p-4 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 hover:border-yellow-600"
                required
                min="1"
                placeholder="Enter number of bathrooms"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white text-lg font-semibold py-4 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </main>
  );
}
