import { createAsyncThunk } from "@reduxjs/toolkit"
import blog from "../../../blog"
import { emtyArticles } from "../../../utils/emtyArticles"
// import axios from "axios"
const actGetAtricles = createAsyncThunk("allArticles/actGetAtricles", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        // const req = await axios.get("http://localhost:8000/blog/articles/?format=json")
        const data = blog.get(`/blog/articles/?format=json`)
            .then((res) => res.data)
            .then((data) => {
                // 47
                let verified = data.filter((item) => {
                    if (!emtyArticles(item.content)) {
                        return item
                    }
                })
                // 40
                return verified;

            })
            .catch((err) => alert(err));
        return data;
    } catch (error) {
        return rejectWithValue(error)
    }
})
export default actGetAtricles;