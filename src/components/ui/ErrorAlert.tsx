import React from 'react';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto my-6"
      role="alert"
    >
    
      <strong className="font-bold mr-2">¡Error!</strong>
      <span className="block sm:inline">{message}</span>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-700 hover:text-red-900 focus:outline-none"
          aria-label="Cerrar mensaje de error"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;


/**
<ErrorAlert message={error} onClose={() => setError(null)} />

 */