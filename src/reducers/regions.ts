import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Region{
    title:string, 
    content:string
}
interface TotalRegion{
    Regions: Region[],
    allRegion: Region[]
}

interface States {
    Regions: TotalRegion | null,
    allRegion: TotalRegion | null
}
const initialState: States = {
    Regions: null,
    allRegion:null
  };
  
export const RegionSlice: any = createSlice({
    name: 'regions',
    initialState,
    reducers: {
      setRegions: (state, action: PayloadAction<TotalRegion>) => {
        state.Regions = action.payload;
      },
      setAllRegion: (state, action: PayloadAction<TotalRegion>) => {
        state.allRegion = action.payload;
      },
     
    },
  });

export const { setRegions, setAllRegion } = RegionSlice.actions;

const { reducer: RegionsReducer } = RegionSlice;

export default RegionsReducer;
