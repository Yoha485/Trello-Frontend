import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/cardApi";

export const createCard = createAsyncThunk("cards/create", async (data) => {
  const res = await api.createCard(data.cardData, data.token);
  const payload = {
    columnId: data.cardData.columnId,
    data: res.data,
  };
  return payload;
});

export const fetchCards = createAsyncThunk("cards/fetch", async (data) => {
  const res = await api.fetchCards(data.columnId, data.token);
  const payload = {
    data: res.data,
    columnId: data.columnId,
  };
  return payload;
});

export const deleteCard = createAsyncThunk("cards/delete", async (data) => {
  const res = await api.deleteCard(data.cardId, data.token);
  const payload = {
    data: res.data,
    columnId: data.columnId,
  };
  return payload;
});

export const updateCard = createAsyncThunk("cards/update", async (data) => {
  const res = await api.updateCard(data.cardId, data.cardData, data.token);
  return res.data;
});

export const replaceCard = createAsyncThunk("cards/replace", async (data) => {
  const res = await api.updateCard(data.cardId, data.cardData, data.token);
  const payload = {
    cardId: data.cardId,
    prevColumnId: data.prevColumnId,
    newColumnId: data.cardData.columnId,
  };
  return payload;
});

export const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: {},
  },
  reducers: {
    clearCards(state) {
      state.cards = {};
    },
    changeName(state, action) {
      const index = state.cards[action.payload.columnId].findIndex(
        (item) => item.id === action.payload.id
      );
      state.cards[action.payload.columnId][index].name = action.payload.name;
    },
    changeDescription(state, action) {
      const index = state.cards[action.payload.columnId].findIndex(
        (item) => item.id === action.payload.id
      );
      state.cards[action.payload.columnId][index].description =
        action.payload.description;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createCard.fulfilled, (state, action) => {
        if (!state.cards[action.payload.columnId]) {
          state.cards[action.payload.columnId] = [];
        }
        state.cards[action.payload.columnId].push(action.payload.data);
      })
      .addCase(createCard.rejected, (state, action) => {
        console.log(action.error);
      });
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards[action.payload.columnId] = action.payload.data;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        console.log(action.error);
      });
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      const columnId = action.payload.columnId;
      const deletedCardId = action.payload.data.id;
      state.cards[columnId] = state.cards[columnId].filter(
        (item) => item.id !== deletedCardId
      );
    });
    builder.addCase(updateCard.fulfilled, (state, action) => {});
    builder.addCase(replaceCard.fulfilled, (state, action) => {
      console.log(action.payload);
      const card = state.cards[action.payload.prevColumnId].find(
        (item) => item.id === action.payload.cardId
      );

      state.cards[action.payload.prevColumnId] = state.cards[
        action.payload.prevColumnId
      ].filter((item) => item.id !== action.payload.cardId);

      state.cards[action.payload.newColumnId].push(card);
    });
  },
});

export const { clearCards, changeName, changeDescription } = cardsSlice.actions;
export default cardsSlice.reducer;
