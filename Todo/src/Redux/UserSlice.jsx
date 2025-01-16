import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: "users",
  initialState: [
    // {
    //   id: 1,
    //   name: "Devansh Rathod",
    //   age: 21,
    //   phone: "+91-9876543210",
    //   additionalFields: [],
    // },
  ],
  reducers: {
    adduser(state, action) {
      state.push({ ...action.payload, id: state.length + 1 });
    },
    removeuser(state, action) {
      return state.filter((user) => user.id !== action.payload);
    },
    editUser(state, action) {
      const { data, index } = action.payload;
      if (state[index]) {
        state[index] = { ...state[index], ...data };
      }
    },
  },
});

export const { adduser, removeuser, editUser } = UserSlice.actions;
export default UserSlice.reducer;
