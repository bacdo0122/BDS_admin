import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review{
    title:string, 
    content:string
}
interface TotalReview{
    Reviews: Review[],
    allReview: Review[]
}

interface States {
    Reviews: TotalReview | null,
    allReview: TotalReview | null
}
const initialState: States = {
    Reviews: null,
    allReview:null
  };
  
export const ReviewSlice: any = createSlice({
    name: 'Reviews',
    initialState,
    reducers: {
      setReviews: (state, action: PayloadAction<TotalReview>) => {
        state.Reviews = action.payload;
      },
      setAllReview: (state, action: PayloadAction<TotalReview>) => {
        state.allReview = action.payload;
      },
     
    },
  });

export const { setReviews, setAllReview } = ReviewSlice.actions;

const { reducer: ReviewsReducer } = ReviewSlice;

export default ReviewsReducer;
