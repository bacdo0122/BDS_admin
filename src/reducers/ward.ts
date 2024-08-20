import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ward{
    title:string, 
    content:string
}
interface TotalWard{
    Wards: Ward[],
    allWard: Ward[]
}

interface States {
    Wards: TotalWard | null,
    allWard: TotalWard | null
}
const initialState: States = {
    Wards: null,
    allWard:null
  };
  
export const WardSlice: any = createSlice({
    name: 'Wards',
    initialState,
    reducers: {
      setWards: (state, action: PayloadAction<TotalWard>) => {
        state.Wards = action.payload;
      },
      setAllWard: (state, action: PayloadAction<TotalWard>) => {
        state.allWard = action.payload;
      },
     
    },
  });

export const { setWards, setAllWard } = WardSlice.actions;

const { reducer: WardsReducer } = WardSlice;

export default WardsReducer;
