import React from 'react';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { HeaderCommon } from '../components/Header/common'
import {Table} from '../components/common/table'
import { SearchLayout } from 'components/Search';
import { Box,Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import {  GridValueGetterParams,GridActionsCellItem} from '@mui/x-data-grid';
import { setField, setReset, setDetail } from 'reducers/Film';
const Banners = () => {
  const banners = useAppSelector((state:any)=>state.banner.banner);
  const dispatch = useAppDispatch();
  
  const reset = useAppSelector((state:any)=>state.films.reset)
  const  columnsCategories = [
    {field: 'name', headerName: 'Name', width: 300 },
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
    <HeaderCommon title="Banners">
      <SearchLayout layout="banners"/>
      <Box sx={{width: "100%", marginTop: "20px", textAlign: "end"}}>
      <Button variant="contained" color="success" onClick={()=> dispatch(setField("create"))} >Create</Button>
      </Box>
      {banners && <Table title="Banners" data={banners}  column = {columnsCategories}/>}
    </HeaderCommon>
  </>;
};

export default Banners;
