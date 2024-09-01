import React from 'react';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { HeaderCommon } from '../components/Header/common'
import {Table} from '../components/common/table'
import { SearchLayout } from 'components/Search';
import { Avatar, Box,Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import {confirmListing, deleteListing, deleteUser} from "../components/common/table/action";
import {  GridValueGetterParams,GridActionsCellItem} from '@mui/x-data-grid';
import { setField, setReset, setDetail } from 'reducers/Film';
import { axiosInstance } from '../apis';
const Listing = () => {
  const films = useAppSelector((state:any)=>state.films.films);
  const dispatch = useAppDispatch();
  console.log("film11:", films)
  const reset = useAppSelector((state:any)=>state.films.reset)
  const  columnsFilm = [
    { field: 'price', headerName: 'Giá', width: 200},
    { field: 'user.name', headerName: 'Tên người dùng', width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      {
          return params.row.user.name
      }
    },
    { field: 'title', headerName: 'Tiêu đề', width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      {
          return params.row.title
      }
    },
    { field: 'description', headerName: 'Mô tả', width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      {
          return params.row.description
      }
    },
    { field: 'address', headerName: 'Địa chỉ', width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      {
          return params.row.address
      }
    },
    { field: 'category', headerName: 'Thể loại', width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      {
        if(params.row.category ){
          return params.row.category.name

        }
      }
    },
    { field: 'type', headerName: 'Loại hình', width: 150,
      valueGetter: (params: GridValueGetterParams) =>
      {
        if(params.row.type){
          return params.row.type?.name

        }
      }
    },
    { field: 'status', headerName: 'Tình trạng', width: 150
    },
    {field: 'image', headerName: 'Anh', width: 300,
      renderCell: (params:any) => {
        const images = params.value.split(";");
       return images.map((image:string) => {
          return (
            <>
              <Avatar src={`http://localhost:3000/images/${image}`} />
            </>
          );
        })
      }
     },
    {
    field: 'actions',
    type: 'actions',
    headerName: 'Hành động',
    width: 600,
    getActions: (params:any) => [
     
      <GridActionsCellItem
      key={1}
      icon={ <Button variant="contained" color="success">Xóa</Button>}
      label="Delete"
      onClick={async()=> {
        await deleteListing(params.id);
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
  />,
  <GridActionsCellItem
  key={3}
  icon={ <Button variant="contained" >Chấp nhận</Button>}
  label="Detail"
  onClick={async()=> {
    await confirmListing(params.id);
    dispatch(setReset(!reset))
 }}
 />
    ] 
  },
  ]
  return <>
    <HeaderCommon title="Tin rao">
      <SearchLayout layout="listings"/>
      <Box sx={{width: "100%", marginTop: "20px", textAlign: "end"}}>
      <Button variant="contained" color="success" onClick={()=> dispatch(setField("create"))} >Thêm</Button>
      </Box>
      {films && <Table title="Tin rao" data={films}  column = {columnsFilm}/>}
    </HeaderCommon>
  </>;
};

export default Listing;
