import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface District{
    title:string, 
    content:string
}
interface TotalDistrict{
    Districts: District[],
    allDistrict: District[]
}

interface States {
    Districts: TotalDistrict | null,
    allDistrict: TotalDistrict | null
}
const initialState: States = {
    Districts: null,
    allDistrict:null
  };
  
export const DistrictSlice: any = createSlice({
    name: 'Districts',
    initialState,
    reducers: {
      setDistricts: (state, action: PayloadAction<TotalDistrict>) => {
        state.Districts = action.payload;
      },
      setAllDistrict: (state, action: PayloadAction<TotalDistrict>) => {
        state.allDistrict = action.payload;
      },
     
    },
  });

export const { setDistricts, setAllDistrict } = DistrictSlice.actions;

const { reducer: DistrictsReducer } = DistrictSlice;

export default DistrictsReducer;
