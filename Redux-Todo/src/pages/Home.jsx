import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduser, removeuser, editUser } from '../Redux/ReduxSlice';

const Home = () => {
  const [data, setData] = useState({ name: '', age: '', phone: '', additionalFields: [] });
  const [additionalFields, setAdditionalFields] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...data, additionalFields };
    if (edit !== null) {
      dispatch(editUser({ data: finalData, index: edit }));
      setEdit(null);
    } else {
      dispatch(adduser(finalData));
    }

    setData({ name: '', age: '', phone: '', additionalFields: [] });
    setAdditionalFields([]); 
  };

  const handleRemove = (index) => {
    dispatch(removeuser(index));
  };

  const handleEdit = (index) => {
    setData({ name: users[index].name, age: users[index].age, phone: users[index].phone });
    setAdditionalFields(users[index].additionalFields || []); 
    setEdit(index);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

 
  const addAdditionalField = () => {
    setAdditionalFields([...additionalFields, '']);
  };

  const handleAdditionalChange = (index, e) => {
    const values = [...additionalFields];
    values[index] = e.target.value;
    setAdditionalFields(values);
  };

  const removeAdditionalField = (index) => {
    const values = [...additionalFields];
    values.splice(index, 1);
    setAdditionalFields(values);
  };
  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

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
          {additionalFields.map((field, index) => (
            <div key={index} className="mb-4 flex items-center">
              <label className="block text-gray-600 font-medium mb-2">Additional Name:</label>
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

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={addAdditionalField}
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

    
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
        <label className="block text-gray-600 font-medium mb-2">Search by Name or Phone:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700">User Data</h2>
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Additional Details</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.age}</td>
                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.additionalFields.length > 0 ? user.additionalFields.join(', ') : 'No additional details'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-200 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemove(index)}
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
