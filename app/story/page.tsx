'use client';
import React from 'react';
import { PencilLine, ArrowLeft, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/navigation";

function App() {
    const router = useRouter();

  const handleBack = () => {
    router.push("/"); 
  };


  const handleRedirect = () => {
    router.push("story/create-story"); 
  };
  return (
    
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900" onClick={handleBack}>
              <ArrowLeft className="w-6 h-6" />
              <span className="sr-only">Back</span>
            </button>
            <Link href="/" className="flex justify-center w-full sm:w-auto">
          <Image
            src={"/Lg.PNG"}
            alt="Marathon Platform Logo"
            layout="intrinsic"
            width={300}
            height={60}
            className="cursor-pointer object-contain w-32 sm:w-48 ml-6"
          />

        </Link>
          </div>
          <div className="flex items-center">
              <Link href="/userProfile" className="text-gray-600 hover:text-gray-900">
                <img src="/DefaultUserProfile.svg" alt="IR Logo" className="h-11 px-6" />
              </Link>

            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Stories</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-12">
          <nav className="-mb-px flex space-x-8">
            <a href="#" className="border-b-2 border-pink-500 pb-4 px-1 text-sm font-medium text-gray-900">
              Drafts
            </a>
            <a href="#" className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              In-Review
            </a>
            <a href="#" className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Rejected
            </a>
            <a href="#" className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Published
            </a>
          </nav>
        </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <PencilLine className="w-16 h-16 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nothing in the Draft.</h3>
          <p className="text-sm text-gray-500 mb-2">Ready, Set, Write ...</p>
          <p className="text-sm text-gray-500 mb-8">Share your first running adventure or insight with our community</p>
          <button
      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      onClick={handleRedirect}
    >
      + Write your story
    </button>
        </div>
      </main>
    </div>
  );
}

export default App;