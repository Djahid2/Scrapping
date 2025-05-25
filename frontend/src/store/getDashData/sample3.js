import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getsample3 = createAsyncThunk("sample3/getsample3", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.get('https://raw.githubusercontent.com/Nai1a1/react-chartjs/refs/heads/master/src/data/sample3.json');

        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }

})

const sample3 = createSlice({
    name: "sample3",
    initialState: { data: [] },
    extraReducers: (builder) => {
        builder.addCase(getsample3.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

export default sample3.reducer;