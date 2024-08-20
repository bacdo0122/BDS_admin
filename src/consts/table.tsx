import {  GridColDef,GridValueGetterParams,GridRenderCellParams,GridActionsCellItem} from '@mui/x-data-grid';

export const  columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'actors', headerName: 'Actor', width: 300,
    valueGetter: (params: GridValueGetterParams) =>
    {
      const covert = params.row.actors.map((actor:any)=>actor.name)

      return covert.join(",")
    }
  },
  { field: 'categories', headerName: 'Category', width: 300,
  valueGetter: (params: GridValueGetterParams) =>
  {
    const covert = params.row.categories.map((category:any)=>category.name)

    return covert.join(",")
  }
},
    { field: 'score', headerName: 'Score Rate', width: 150 },
    {
      field: 'areas',
      headerName: 'Areas', width: 300,
      valueGetter: (params: GridValueGetterParams) =>
      {
   

        return params.row.areas
      }
    },
    
  ];

 


