import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface New{
    title:string, 
    content:string
}
interface TotalNew{
    News: New[],
    allNew: New[]
}

interface States {
    News: TotalNew | null,
    allNew: TotalNew | null
}
const initialState: States = {
    News: null,
    allNew:null
  };
  
export const NewSlice: any = createSlice({
    name: 'news',
    initialState,
    reducers: {
      setNews: (state, action: PayloadAction<TotalNew>) => {
        state.News = action.payload;
      },
      setAllNew: (state, action: PayloadAction<TotalNew>) => {
        state.allNew = action.payload;
      },
     
    },
  });

export const { setNews, setAllNew } = NewSlice.actions;

const { reducer: newsReducer } = NewSlice;

export default newsReducer;
