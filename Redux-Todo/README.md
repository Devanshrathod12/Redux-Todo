# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduser, removeuser, editUser } from '../Redux/ReduxSlice';

const Home = () => {
  const [data, setData] = useState(null);
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [edit, setedit] = useState(null);
  console.log(users);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit !== null) {
      dispatch(editUser({ data, index: edit }));
      setedit(null);
    } else {
      dispatch(adduser(data));
    }
    setData(null);
  };
  

  const handleremove = (index) => {
    dispatch(removeuser(index));
  };

  const eedit = (index) => {
    setData(users[index]);
    setedit(index);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (edit !== null) {
      dispatch(editUser({ data, index: edit }));
      setData(null);
      setedit(null);
    }
  };
  
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value, 
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Basic Form</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={data?.name || ''}
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
              value={data?.age || ''}
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
              value={data?.phone || ''}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-200"
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">User Data</h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.age}</td>
                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => eedit(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-200 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleremove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;


=============================

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduser, removeuser, editUser } from '../Redux/ReduxSlice';

const Home = () => {
  const [data, setData] = useState({ name: '', age: '', phone: '', additionalFields: [] });
  const [additionalFields, setAdditionalFields] = useState([]); // Track additional fields
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [edit, setedit] = useState(null);
  console.log(users);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...data, additionalFields }; // Combine the data with additional fields

    if (edit !== null) {
      dispatch(editUser({ data: finalData, index: edit }));
      setedit(null);
    } else {
      dispatch(adduser(finalData));
    }

    setData({ name: '', age: '', phone: '', additionalFields: [] });
    setAdditionalFields([]); // Reset additional fields on submit
  };

  const handleremove = (index) => {
    dispatch(removeuser(index));
  };

  const eedit = (index) => {
    setData({ ...users[index], additionalFields: users[index].additionalFields || [] });
    setedit(index);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Add a new additional field
  const addAdditionalField = () => {
    setAdditionalFields([...additionalFields, '']);
  };

  // Handle change in dynamic fields
  const handleAdditionalChange = (index, e) => {
    const values = [...additionalFields];
    values[index] = e.target.value;
    setAdditionalFields(values);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Basic Form</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={data?.name || ''}
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
              value={data?.age || ''}
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
              value={data?.phone || ''}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Dynamic Additional Fields */}
          {additionalFields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Additional Name:</label>
              <input
                type="text"
                value={field}
                onChange={(e) => handleAdditionalChange(index, e)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          ))}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={addAdditionalField} // Add new additional field
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
            >
              Add Additional Name Field
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* User Data Table */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">User Data</h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">other details</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.age}</td>
                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{user.additionalFields}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => eedit(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-200 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleremove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

