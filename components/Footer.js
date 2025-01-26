import React from "react";
import { Facebook, Instagram } from "lucide-react";

const Footer = ({ onDistanceChange, onCityChange, selectedCity, selectedDistance }) => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-20">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <img src="/IR-logo.svg" alt="IR Logo" className="h-10" />
          </div>
          <div className="space-y-2">
            <a href="#" className="block text-[#FF0066] hover:text-[#ff1a75]">Contact Us</a>
            <a href="#" className="block text-[#FF0066] hover:text-[#ff1a75]">Terms and Conditions</a>
            <a href="#" className="block text-[#FF0066] hover:text-[#ff1a75]">Privacy Policy</a>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#FF0066]">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-[#FF0066]">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-lg">Events by Distance</h3>
          <ul className="space-y-2">
            <li onClick={()=>onDistanceChange('2K')}><a href="#" className={`hover:text-[#FF0066] ${selectedDistance === '2K' ? 'text-red-500' : ''}`}>&lt;5K</a></li>
            <li onClick={()=>onDistanceChange('5K')}><a href="#" className={`hover:text-[#FF0066] ${selectedDistance === '5K' ? 'text-red-500' : ''}`}>5K</a></li>
            <li onClick={()=>onDistanceChange('10K')}><a href="#" className={`hover:text-[#FF0066] ${selectedDistance === '10K' ? 'text-red-500' : ''}`}>10K</a></li>
            <li onClick={()=>onDistanceChange('21.1K')}><a href="#" className={`hover:text-[#FF0066] ${selectedDistance === '21.1K' ? 'text-red-500' : ''}`}>Half Marathon</a></li>
            <li onClick={()=>onDistanceChange('42.1K')}><a href="#" className={`hover:text-[#FF0066] ${selectedDistance === '42.1K' ? 'text-red-500' : ''}`}>Marathon</a></li>
            <li onClick={()=>onDistanceChange('Ultra Marathon')}><a href="#" className={`hover:text-[#FF0066] ${selectedDistance === 'Ultra Marathon' ? 'text-red-500' : ''}`}>Ultra Marathon</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-lg">Events by City</h3>
          <ul className="space-y-2">
            <li onClick={() => onCityChange('Mumbai')}><a href="#" className={`hover:text-[#FF0066] ${selectedCity === 'Mumbai' ? 'text-red-500' : ''}`}>Mumbai</a></li>
            <li onClick={() => onCityChange('Pune')}><a href="#" className={`hover:text-[#FF0066] ${selectedCity === 'Pune' ? 'text-red-500' : ''}`}>Pune</a></li>
            <li onClick={() => onCityChange('Delhi')}><a href="#" className={`hover:text-[#FF0066] ${selectedCity === 'Delhi' ? 'text-red-500' : ''}`}>Delhi</a></li>
            <li onClick={() => onCityChange('Bangalore')}><a href="#" className={`hover:text-[#FF0066] ${selectedCity === 'Bangalore' ? 'text-red-500' : ''}`}>Bangalore</a></li>
            <li onClick={() => onCityChange('Chennai')}><a href="#" className={`hover:text-[#FF0066] ${selectedCity === 'Chennai' ? 'text-red-500' : ''}`}>Chennai</a></li>
            <li onClick={() => onCityChange('Hyderabad')}><a href="#" className={`hover:text-[#FF0066] ${selectedCity === 'Hyderabad' ? 'text-red-500' : ''}`}>Hyderabad</a></li>
            <li onClick={() => onCityChange('Kolkata')}><a href="#" className={`hover:text-[#FF0066] ${selectedCity === 'Kolkata' ? 'text-red-500' : ''}`}>Kolkata</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-lg">Download Fitpage App</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:opacity-90">
              <img src="/play-store-logo1.svg" alt="Play Store" className="h-12" />
            </a>
            <a href="#" className="hover:opacity-90">
              <img src="/app-store-logo1.svg" alt="App Store" className="h-12" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-20">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-sm">Copyright © 2025 IndiaRunning, All Right Reserved</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Powered by</span>
            <img src="/fitpage-logo.svg" alt="Fitpage Logo" className="h-6" />
            <span className="text-sm">Saransh Ventures Private Limited</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;