import { createSlice } from "@reduxjs/toolkit";

const fetchedArticles = createSlice({
    name: "fetchedArticles",
    initialState: { articles: [], loading: false },
    reducers: {
        addArticles: (state, action) => {
            state.articles = action.payload;
            state.loading = false;
        },
        startFetching: (state) => {
            state.loading = true
        }
    }
})

export const { addArticles, startFetching } = fetchedArticles.actions
export default fetchedArticles.reducer;