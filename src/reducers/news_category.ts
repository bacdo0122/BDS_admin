import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface News_Category{
    title:string, 
    content:string
}
interface TotalNew{
    News_category: News_Category[],
    allNew_category: News_Category[]
}

interface States {
    News_category: TotalNew | null,
    allNew_category: TotalNew | null
}
const initialState: States = {
    News_category: null,
    allNew_category:null
  };
  
export const NewCategorySlice: any = createSlice({
    name: 'news_category',
    initialState,
    reducers: {
      setNewsCategory: (state, action: PayloadAction<TotalNew>) => {
        state.News_category = action.payload;
      },
      setAllNewCategory: (state, action: PayloadAction<TotalNew>) => {
        state.allNew_category = action.payload;
      },
     
    },
  });

export const { setNewsCategory, setAllNewCategory } = NewCategorySlice.actions;

const { reducer: newsCategoryReducer } = NewCategorySlice;

export default newsCategoryReducer;
