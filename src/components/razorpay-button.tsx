
'use client';

import React, { useEffect } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayButtonProps {
  buttonId: string;
}

export const RazorpayButton: React.FC<RazorpayButtonProps> = ({ buttonId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.async = true;
    script.dataset.payment_button_id = buttonId;

    const form = document.getElementById(`razorpay-form-${buttonId}`);
    if (form) {
      form.appendChild(script);
    }

    return () => {
      if (form && script.parentNode === form) {
        form.removeChild(script);
      }
    };
  }, [buttonId]);

  return (
    <form id={`razorpay-form-${buttonId}`}>
      {/* The script will inject the button here */}
    </form>
  );
};
