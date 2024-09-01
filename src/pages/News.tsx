import React from 'react';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { HeaderCommon } from '../components/Header/common'
import {Table} from '../components/common/table'
import { SearchLayout } from 'components/Search';
import { Avatar, Box,Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteNews} from "../components/common/table/action";
import {  GridValueGetterParams,GridActionsCellItem} from '@mui/x-data-grid';
import { setField, setReset, setDetail } from 'reducers/Film';
const News = () => {
  const news = useAppSelector((state:any)=>state.news.News);
  const dispatch = useAppDispatch();
  console.log("news:", news)
  const reset = useAppSelector((state:any)=>state.films.reset)
  const  columnsCategories = [
    {field: 'title', headerName: 'Tên', width: 300 },
    {field: 'content', headerName: 'Mô tả', width: 300 },
    {field: 'image', headerName: 'Anh', width: 300,
      renderCell: (params:any) => {
        const images = params.value.split(";");
        console.log("images:", images)
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
    width: 400,
    getActions: (params:any) => [
     
      <GridActionsCellItem
      key={1}
      icon={ <Button variant="contained" color="success">Xóa</Button>}
      label="Delete"
      onClick={async()=> {
        await deleteNews(params.id);
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
    <HeaderCommon title="Bài viết">
      <SearchLayout layout="News"/>
      <Box sx={{width: "100%", marginTop: "20px", textAlign: "end"}}>
      <Button variant="contained" color="success" onClick={()=> dispatch(setField("create"))} >Thêm</Button>
      </Box>
      {news && <Table title="Bài viết" data={news}  column = {columnsCategories}/>}
    </HeaderCommon>
  </>;
};

export default News;
