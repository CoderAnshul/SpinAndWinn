import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import image1 from './assets/images/phonepay.PNG';
import image2 from './assets/images/gpay.JPG';
import image3 from './assets/images/bhim.jpg';
import image4 from './assets/images/paytm.PNG';
import back from './assets/images/back.PNG';

const PaymentMethodsPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle go back
  const handleGoBack = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3D8ADC] to-[#A7F3D0] flex flex-col items-center justify-center py-8">
      {/* Go Back Button */}
      <button
        onClick={handleGoBack}
        className="absolute top-6 left-4 text-white bg-blue-500 px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        <img className='h-4 rotate-[225deg]' src={back} alt="" />
      </button>

      <h1 className="text-4xl font-bold text-gray-800 mb-8">Withdrawal Methods</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
        <div className="flex justify-center items-center p-4 bg-white shadow-lg rounded-lg">
          <img src={image1} className="h-16 w-auto" alt="Mastercard" />
        </div>
        <div className="flex justify-center items-center p-4 bg-white shadow-lg rounded-lg">
          <img src={image2} alt="PayPal" className="h-16 w-auto" />
        </div>
        <div className="flex justify-center items-center p-4 bg-white shadow-lg rounded-lg">
          <img src={image3} alt="Google Pay" className="h-16 w-auto" />
        </div>
        <div className="flex justify-center items-center p-4 bg-white shadow-lg rounded-lg">
          <img src={image4} alt="Apple Pay" className="h-16 w-auto" />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
