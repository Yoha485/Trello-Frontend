import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import columnsReducer from "../features/columns/columnSlice";
import cardsReducer from "../features/cards/cardSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    columns: columnsReducer,
    cards: cardsReducer,
  },
});
