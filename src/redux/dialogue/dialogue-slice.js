import { createSlice } from '@reduxjs/toolkit';

import {
  createDialogue,
  getDialogue,
  getAllDialoguesData,
  deleteDialogue,
  deleteDialogueNewMessage,
} from './dialogue-operations';

const initialState = {
  loading: false,
  error: '',
  message: '',
  dialogueStore: [],
  dialoguesArray: [],
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
    clearDialoguesArray: store => {
      store.dialoguesArray = [];
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
    // * Create current dialogue
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
    // * Get all dialogues data
    [getAllDialoguesData.pending]: store => {
      store.loading = true;
      store.error = '';
      store.message = '';
    },
    [getAllDialoguesData.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.dialoguesArray = payload.dialoguesArray;
    },
    [getAllDialoguesData.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload?.data?.message || '';
    },
    // * Delete dialogue
    [deleteDialogue.pending]: store => {
      store.loading = true;
      store.error = '';
    },
    [deleteDialogue.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
    },
    [deleteDialogue.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload?.data?.message || '';
    },
    // delete new Message
    [deleteDialogueNewMessage.pending]: store => {
      store.error = '';
    },
    [deleteDialogueNewMessage.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.dialogueStore = payload.userDialogue;
    },
    [deleteDialogueNewMessage.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload?.data?.message || '';
    },
  },
});

export default dialogue.reducer;
export const {
  clearDialogueError,
  clearDialogue,
  clearDialogueMessage,
  clearDialoguesArray,
} = dialogue.actions;
