import React from 'react';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { HeaderCommon } from '../components/Header/common'
import {Table} from '../components/common/table'
import { SearchLayout } from 'components/Search';
import { Box,Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import {  GridValueGetterParams,GridActionsCellItem} from '@mui/x-data-grid';
import { setField, setReset, setDetail } from 'reducers/Film';
import { deleteNews, deleteRegion } from '../components/common/table/action';
const Ward = () => {
  const Ward = useAppSelector((state:any)=>state.ward.Wards);
  console.log("Ward:", Ward)
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state:any)=>state.films.reset)
  const  columnsCategories = [
    {field: 'name', headerName: 'Tên', width: 300},
    {
    field: 'actions',
    type: 'actions',
    headerName: 'Hành động',
    width: 400,
    getActions: (params:any) => [
     
      <GridActionsCellItem
      key={1}
      icon={ <Button variant="contained" color="success">Xóa</Button>}
      label="Delete"
      onClick={async()=> {
        dispatch(setReset(!reset))
      }}
    />,
    <GridActionsCellItem
    key={2}
    icon={ <Button variant="contained" color="secondary">Sửa</Button>}
    label="Edit"
    onClick={async()=> {

      dispatch(setDetail(params.row));
      dispatch(setField("edit"))
    }}
  />,
   <GridActionsCellItem
   key={3}
   icon={ <Button variant="contained" >Xem chi tiết</Button>}
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
    <HeaderCommon title="Huyện">
      <SearchLayout layout="Wards"/>
      <Box sx={{width: "100%", marginTop: "20px", textAlign: "end"}}>
      <Button variant="contained" color="success" onClick={()=> dispatch(setField("create"))} >Thêm</Button>
      </Box>
      {Ward && <Table title="Huyện" data={Ward}  column = {columnsCategories}/>}
    </HeaderCommon>
  </>;
};

export default Ward;
