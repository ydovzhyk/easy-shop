import { createSlice } from '@reduxjs/toolkit';

import { createDialogue } from './dialogue-operations';

const initialState = {
  loading: false,
  error: '',
  message: '',
  dialogue: [],
};

const dialogue = createSlice({
  name: 'createDialogue',
  initialState,
  reducers: {
    clearDialogueError: store => {
      store.error = '';
    },
    clearDialogueMessage: store => {
      store.message = '';
    },
    clearDialogue: store => {
      store.message = null;
    },
  },

  extraReducers: {
    // * Create new dialogue
    [createDialogue.pending]: store => {
      store.loading = true;
      store.error = '';
      store.message = '';
    },
    [createDialogue.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
      store.dialogue = payload.dialogue;
    },
    [createDialogue.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload?.data?.message || '';
    },
  },
});

export default dialogue.reducer;
export const { clearDialogueError, clearDialogue, clearDialogueMessage } =
  dialogue.actions;
