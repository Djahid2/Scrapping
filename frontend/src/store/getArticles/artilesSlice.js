import { createSlice, } from "@reduxjs/toolkit";
import actGetAtricles from "./actGetArticles/actGetArticles";
const allArticlesSlice = createSlice({
    name: 'allArticles',
    initialState: {
        articles: [],
        waiting: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actGetAtricles.fulfilled, (state, action) => {
            state.articles = (action.payload)

        })
    }
})

export default allArticlesSlice.reducer;