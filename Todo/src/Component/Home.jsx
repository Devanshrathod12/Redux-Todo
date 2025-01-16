import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduser, removeuser, editUser } from "./../Redux/UserSlice"
import InputFields from './InputFields';
import ActionButtons from './ActionButtons';
import UserTable from './UserTable';

const Home = () => {
  const [data, setData] = useState({ name: '', age: '', phone: '' });
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

    setData({ name: '', age: '', phone: '' });
    setAdditionalFields([]);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addAdditionalField = () => setAdditionalFields([...additionalFields, '']);
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

  const handleEdit = (index) => {
    setData({ name: users[index].name, age: users[index].age, phone: users[index].phone });
    setAdditionalFields(users[index].additionalFields || []);
    setEdit(index);
  };

  const handleRemove = (index) => {
    dispatch(removeuser(index));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-8">
        <InputFields
          data={data}
          handleChange={handleChange}
          additionalFields={additionalFields}
          handleAdditionalChange={handleAdditionalChange}
          addAdditionalField={addAdditionalField}
          removeAdditionalField={removeAdditionalField}
        />
        <ActionButtons handleSubmit={handleSubmit} />
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

      <UserTable
        filteredUsers={filteredUsers}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default Home;
