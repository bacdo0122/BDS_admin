import React from 'react';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { HeaderCommon } from '../components/Header/common'
import {Table} from '../components/common/table'
import { SearchLayout } from 'components/Search';
import { Box,Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import {  GridValueGetterParams,GridActionsCellItem} from '@mui/x-data-grid';
import { setField, setReset, setDetail } from 'reducers/Film';
import { deleteRegion, deleteReview } from '../components/common/table/action';
const Review = () => {
  const news = useAppSelector((state:any)=>state.review.Reviews);
  const dispatch = useAppDispatch();
  console.log("news3:", news)
  const reset = useAppSelector((state:any)=>state.films.reset)
  const  columnsCategories = [
    {field: 'rating', headerName: 'Rating', width: 300 },
    {field: 'comment', headerName: 'Comment', width: 300 },
    {field: 'user.name', headerName: 'User Name', width: 300,
        valueGetter: (params: GridValueGetterParams) =>
            {
                return params.row.user.name
            }
     },
     {field: 'listing.bds.title', headerName: 'Listing Title', width: 300,
        valueGetter: (params: GridValueGetterParams) =>
            {
                return params.row.listing.bds.title
            }
     },
    {
    field: 'actions',
    type: 'actions',
    headerName: 'Action',
    width: 400,
    getActions: (params:any) => [
     
      <GridActionsCellItem
      key={1}
      icon={ <Button variant="contained" color="success">Delete</Button>}
      label="Delete"
      onClick={async()=> {
        await deleteReview(params.id);
        dispatch(setReset(!reset))
      }}
    />,
    <GridActionsCellItem
    key={2}
    icon={ <Button variant="contained" color="secondary">Edit</Button>}
    label="Edit"
    onClick={async()=> {

      dispatch(setDetail(params.row));
      dispatch(setField("edit"))
    }}
  />,
   <GridActionsCellItem
   key={3}
   icon={ <Button variant="contained" >Detail</Button>}
   label="Detail"
   onClick={async()=> {

    dispatch(setDetail(params.row));
    dispatch(setField("detail"))
  }}
  />
    ] 
  },
  ]
  return <>
    <HeaderCommon title="Reviews">
      <SearchLayout layout="Reviews"/>
      <Box sx={{width: "100%", marginTop: "20px", textAlign: "end"}}>
      <Button variant="contained" color="success" onClick={()=> dispatch(setField("create"))} >Create</Button>
      </Box>
      {news && <Table title="Reviews" data={news}  column = {columnsCategories}/>}
    </HeaderCommon>
  </>;
};

export default Review;
