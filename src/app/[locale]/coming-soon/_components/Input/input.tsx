'use client';
import * as React from 'react';

export const EmailInput = ({ ...props }) => {
  return (
    <div className="p-[10px] rounded-lg">
      <input
        type={'email'}
        className="h-12 w-full border-none text-black rounded-md px-3 py-2 text-base outline-none"
        {...props}
      />
    </div>
  );
};
