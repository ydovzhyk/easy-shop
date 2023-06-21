import { createSlice } from '@reduxjs/toolkit';

const verifiEmailSlice = createSlice({
  name: 'verifiEmail',
  initialState: '',
  reducers: {
    setVerifiEmail: (state, action) => {
      return action.payload;
    },
  },
});

export default verifiEmailSlice.reducer;
export const { setVerifiEmail } = verifiEmailSlice.actions;
