import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Direction{
    title:string, 
    content:string
}
interface TotalDirection{
    Directions: Direction[],
    allDirection: Direction[]
}

interface States {
    Directions: TotalDirection | null,
    allDirection: TotalDirection | null
}
const initialState: States = {
    Directions: null,
    allDirection:null
  };
  
export const DirectionSlice: any = createSlice({
    name: 'Directions',
    initialState,
    reducers: {
      setDirections: (state, action: PayloadAction<TotalDirection>) => {
        state.Directions = action.payload;
      },
      setAllDirection: (state, action: PayloadAction<TotalDirection>) => {
        state.allDirection = action.payload;
      },
     
    },
  });

export const { setDirections, setAllDirection } = DirectionSlice.actions;

const { reducer: DirectionsReducer } = DirectionSlice;

export default DirectionsReducer;
