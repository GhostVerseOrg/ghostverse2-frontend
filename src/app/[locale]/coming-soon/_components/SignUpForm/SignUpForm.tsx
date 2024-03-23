'use client';
import React, { useState } from 'react';
import GoldenGradientButton from '@/app/_components/Button/GoldenGradientButton'; // Adjust import path as necessary
import { EmailInput } from '../Input/input';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement submission logic here, e.g. POST to an API endpoint
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full flex flex-col justify-center mx-auto"
    >
      <EmailInput
        id="email"
        type="email"
        required
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <div className="px-2">
        <GoldenGradientButton
          text="Sign up for updates"
          onClick={() => console.log('Form submitted')} // Optional click handler if needed
        />
      </div>
    </form>
  );
};

export default SignUpForm;
