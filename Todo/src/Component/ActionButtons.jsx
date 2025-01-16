import React from 'react';

const ActionButtons = ({ handleSubmit, addAdditionalField }) => {
  return (
    <div className="flex justify-between items-center mt-6">
   

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Submit
      </button>
    </div>
  );
};

export default ActionButtons;
