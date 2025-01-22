'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MarathonImage from '../../../public/register.webp';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block w-1/2">
        <Image src={MarathonImage.src} alt="Marathon" width={500} height={300} className="object-cover w-full h-full" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <div className="max-w-sm w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
