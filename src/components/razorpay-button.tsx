
'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonId: string;
}

export const RazorpayButton: React.FC<RazorpayButtonProps> = ({ buttonId, className, ...props }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.async = true;
    script.dataset.payment_button_id = buttonId;

    const form = document.getElementById(`razorpay-form-${buttonId}`);
    if (form) {
      // Clear previous script if any
      while (form.firstChild) {
        form.removeChild(form.firstChild);
      }
      form.appendChild(script);
    }

    // This is a workaround for when the script fails to load the first time.
    // It's a known issue with how these scripts sometimes interact with SPA navigations.
    const checkButtonRender = setTimeout(() => {
        if (form && form.childElementCount < 2) { // script + button = 2
             if (form.firstChild) form.removeChild(form.firstChild);
             form.appendChild(script);
        }
    }, 1000);


    return () => {
      if (form && script.parentNode === form) {
        form.removeChild(script);
      }
      clearTimeout(checkButtonRender);
    };
  }, [buttonId]);

  return (
    <div className={cn("w-full h-[44px] -mt-2", className)} {...props}>
        <div className="transform scale-[1.2] origin-top-left">
            <form id={`razorpay-form-${buttonId}`}>
                {/* The script will inject the button here */}
            </form>
        </div>
    </div>
  );
};
