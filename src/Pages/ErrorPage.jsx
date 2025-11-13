import React from 'react';
import { Link } from 'react-router'; // Assuming you are using react-router-dom for navigation

const ErrorPage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen  p-4'>
      <div className='max-w-[700px] border border-gray-300 rounded-lg shadow-lg bg-[#101228] p-8 text-center'>
        <h1 className='text-4xl font-bold text-red-600 mb-4'>Oops! Something went wrong.</h1>
        <p className='text-lg text-gray-500 mb-6'>
          We're sorry, but it looks like there was an error loading the page you requested.
          Don't worry, we're working to fix it!
        </p>
        <p className='text-md text-gray-500 mb-8'>
          In the meantime, you might find these links helpful:
        </p>
        <div className='flex flex-col space-y-4'>
          <Link to="/" className='text-blue-600 hover:underline text-lg font-medium'>
            Go to Homepage
          </Link>
          <Link to="/contact" className='text-blue-600 hover:underline text-lg font-medium'>
            Contact Support
          </Link>
          
   
        </div>
        <p className='text-sm text-gray-500 mt-8'>
          If the problem persists, please try again later or contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;