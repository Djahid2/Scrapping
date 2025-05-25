import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getrevenueData = createAsyncThunk("revenueData/getrevenueData", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.get('https://raw.githubusercontent.com/Nai1a1/react-chartjs/refs/heads/master/src/data/revenueData.json');
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }

})

const revenueData = createSlice({
    name: "revenueData",
    initialState: { data: [] },
    extraReducers: (builder) => {
        builder.addCase(getrevenueData.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

export default revenueData.reducer;