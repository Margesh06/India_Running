'use client';
import { useState } from 'react';

export default function EventForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    location: '',
    description: '',
    category: '',
    price: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Add API integration or further processing here
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">Create Marathon Event</h2>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Event Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              >
                <option value="">Select a category</option>
                <option value="full-marathon">Full Marathon</option>
                <option value="half-marathon">Half Marathon</option>
                <option value="10k">10K</option>
                <option value="5k">5K</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Event Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                rows="4"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Event Price (INR)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Event Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
