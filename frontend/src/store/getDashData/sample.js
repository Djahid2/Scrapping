import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getsample = createAsyncThunk("sample/getsample", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.get('https://raw.githubusercontent.com/Nai1a1/react-chartjs/refs/heads/master/src/data/sample.json');
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }

})

const sample = createSlice({
    name: "sample",
    initialState: { data: [] },
    extraReducers: (builder) => {
        builder.addCase(getsample.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

export default sample.reducer;