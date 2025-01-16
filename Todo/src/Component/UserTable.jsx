import React from 'react';

const UserTable = ({ filteredUsers, handleEdit, handleRemove }) => {
  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
  <h2 className="text-xl font-bold mb-4 text-gray-700">User Data</h2>
  <div className="overflow-x-auto">
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
        {filteredUsers.map((user, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.age}</td>
            <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
            <td className="border border-gray-300 px-4 py-2">
              {user.additionalFields.length > 0 ? (
                user.additionalFields.map((field, i) => (
                  <div key={i}>
                    Add Field Data {i + 1}: {field}
                  </div>
                ))
              ) : (
                'No additional details'
              )}
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

export default UserTable;
