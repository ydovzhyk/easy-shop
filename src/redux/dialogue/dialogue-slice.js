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
  dialoguesArrayNew: [],
  isNewMessage: false,
  statusDialogueList: true,
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
    changeStatusIsNewMessage: (store, action) => {
      store.isNewMessage = action.payload;
    },
    updateDialoguesArray: (store, action) => {
      const currentDialogue = action.payload;
      const updatedArray = store.dialoguesArrayNew.map(dialogue => {
        if (dialogue._id === currentDialogue) {
          return {
            ...dialogue,
            newMessages: [],
          };
        }
        return {
          ...dialogue,
        };
      });
      store.dialoguesArrayNew = updatedArray;
    },
    updateDialogueStore: (store, action) => {
      const currentDialogue = action.payload;
      if (
        store.dialogueStore._id === currentDialogue &&
        store.dialogueStore.newMessages.length !== 0
      ) {
        const updatedDialogue = { ...store.dialogueStore, newMessages: [] };
        store.dialogueStore = updatedDialogue;
      } else {
        return;
      }
    },
    updateStatusDialogueList: (store, action) => {
      store.statusDialogueList = action.payload;
    },
    clearDialogueState: store => {
      store.error = '';
      store.message = '';
      store.dialogueStore = [];
      store.dialoguesArray = [];
      store.dialoguesArrayNew = [];
      store.isNewMessage = false;
      store.statusDialogueList = true;
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
    },
    // * Get all dialogues data
    [getAllDialoguesData.pending]: store => {
      store.loading = true;
      store.error = '';
      store.message = '';
    },
    [getAllDialoguesData.fulfilled]: (store, { payload }) => {
      store.loading = false;
      // store.isNewMessage = false;
      store.dialoguesArray = payload.dialoguesArray;
      store.dialoguesArrayNew = payload.dialoguesArray;
    },
    [getAllDialoguesData.rejected]: (store, { payload }) => {
      store.loading = false;
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
    },
  },
});

export default dialogue.reducer;
export const {
  clearDialogueError,
  clearDialogue,
  clearDialogueMessage,
  clearDialoguesArray,
  changeStatusIsNewMessage,
  updateDialoguesArray,
  updateDialogueStore,
  updateStatusDialogueList,
  clearDialogueState,
} = dialogue.actions;
