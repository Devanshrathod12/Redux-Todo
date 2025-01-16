import React from 'react';

const InputFields = ({ data, handleChange, additionalFields, handleAdditionalChange, addAdditionalField, removeAdditionalField }) => {
  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Age:</label>
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Phone:</label>
        <input
          type="number"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>
      {additionalFields.map((field, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input
            type="text"
            value={field}
            onChange={(e) => handleAdditionalChange(index, e)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => removeAdditionalField(index)}
            className="bg-red-500 text-white px-2 py-1 ml-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addAdditionalField}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
      >
        Add Additional Field
      </button>
    </form>
  );
};

export default InputFields;
