import React from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutButton = ({ amount }: { amount: number }) => {
  const handlePayment = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    if (!data.success) {
      alert('Order creation failed');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,
      name: 'The Pickle Mom',
      description: 'Order Payment',
      handler: function (response: any) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        // Optionally, verify payment on the backend here
      },
      prefill: {
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: { color: '#F37254' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay with Razorpay</button>;
};

export default CheckoutButton;