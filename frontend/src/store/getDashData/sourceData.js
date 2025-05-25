import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getsourceData = createAsyncThunk("sourceData/getsourceData", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.get('https://raw.githubusercontent.com/Nai1a1/react-chartjs/refs/heads/master/src/data/sourceData.json');

        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }

})

const sourceData = createSlice({
    name: "sourceData",
    initialState: { data: [] },
    extraReducers: (builder) => {
        builder.addCase(getsourceData.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

export default sourceData.reducer;