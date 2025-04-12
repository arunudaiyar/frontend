"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { BACKEND_URL } from "@/lib/config";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Bypass login for now - REMOVE THIS IN PRODUCTION
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/projects');
    }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      // Store the session (e.g., token or user info) in localStorage
      localStorage.setItem('user', JSON.stringify({ email })); // Store user info
      localStorage.setItem('isLoggedIn', 'true');

      // Redirect to the projects page
      router.push('/projects');


    } catch (e: any) {
      setError(e.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="container mx-auto py-10 flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-4 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
        <p className="text-center">
          Don't have an account? <Link href="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

