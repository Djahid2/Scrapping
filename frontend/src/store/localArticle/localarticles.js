import { createSlice } from "@reduxjs/toolkit";

const localArticles = createSlice({
    name: "localArticles",
    initialState: { articles: [] },
    reducers: {
        addArticle: (state, action) => {
            state.articles = [...state.articles, action.payload];
        },
        removeArticle: (state, action) => {
            state.articles = state.articles.filter((article) => article.title !== action.payload)
        },

    },
})

export const { addArticle, removeArticle } = localArticles.actions;

export default localArticles.reducer;