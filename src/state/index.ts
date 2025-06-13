import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateTypes {
  user: {
    username: string;
    email: string;
    role: "Farmer" | "Admin" | "Engineer";
  } | null;
}

export const initialState: InitialStateTypes = {
  user: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        role: "Farmer" | "Admin" | "Engineer";
      }>
    ) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = globalSlice.actions;

export default globalSlice.reducer;
