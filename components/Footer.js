import React from "react";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
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
            <li><a href="#" className="hover:text-[#FF0066]">&lt;5K</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">5K</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">10K</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">Half Marathon</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">Marathon</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">Ultra Marathon</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-lg">Events by City</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#FF0066]">Mumbai</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">Pune</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">Delhi</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">Bangalore</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">Chennai</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">Hyderabad</a></li>
            <li><a href="#" className="hover:text-[#FF0066]">Kolkata</a></li>
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