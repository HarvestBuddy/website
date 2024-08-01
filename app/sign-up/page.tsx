"use client";
import SignupFormDemo from "@/components/example/signup-form-demo";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation for Next.js 13

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      let response;
      if (!isLogin) {
        response = await fetch(`${BASE_URL}/auth/signUp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        // Store token in local storage
        localStorage.setItem("token", responseData.token);

        // Display success message
        alert("Login successful!");

        // Redirect to home page
        router.push("/");
      } else {
        // Handle errors
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="pt-4 pb-4 bg-base-200">
      <SignupFormDemo
        handleSubmit={handleSubmit}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
    </div>
  );
}
