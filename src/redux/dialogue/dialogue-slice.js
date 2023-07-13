import { createSlice } from '@reduxjs/toolkit';

import { createDialogue, getDialogue } from './dialogue-operations';

const initialState = {
  loading: false,
  error: '',
  message: '',
  dialogueStore: [],
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
      store.dialogueStore = [];
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
      store.dialogueStore = payload.userDialogue;
    },
    [createDialogue.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload?.data?.message || '';
    },
    [getDialogue.pending]: store => {
      store.loading = true;
      store.error = '';
      store.message = '';
    },
    [getDialogue.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.dialogueStore = payload.userDialogue;
    },
    [getDialogue.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload?.data?.message || '';
    },
  },
});

export default dialogue.reducer;
export const { clearDialogueError, clearDialogue, clearDialogueMessage } =
  dialogue.actions;
