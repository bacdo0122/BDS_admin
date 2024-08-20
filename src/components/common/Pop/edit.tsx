import React, { ChangeEvent, useState } from 'react';
import {
  styled,
  Box,
  BoxProps,
  TextField,
  InputAdornment,
  Autocomplete,
  alpha,
  FormControl,
  Button,
  InputLabel,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { setField, setReset } from 'reducers/Film';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { newListing } from '.';
import { axiosInstance } from '../../../apis';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateFilmSchema } from '../../../helpers/validation';
import CreateFilmInput from '../../../Inputs/createFilmInput';
import CreateOptionInput from '../../../Inputs/createOptionInput';
import { EditNewListing } from '../../../apis/film';
const Container = styled(Box)<BoxProps>({
  width: '50%',
  height: '80%',
  background: '#fff',
  borderRadius: '20px',
  zIndex: '100',
  overflowY: 'auto',
  position: 'relative',
});
const MainWrapper = styled(Box)<BoxProps>({
  margin: '20px auto',
  maxWidth: '70%',
  textAlign: 'center',
  position: 'relative',
});
const Label = styled(Box)<BoxProps>({
  fontWeight: '700',
  fontSize: '24px',
  color: '#252733',
  lineHeight: '150%',
  textAlign: 'center',
});
const BootstrapInput = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
const CloseIcon = styled(Box)<BoxProps>({
  position: 'absolute',
  right: '4%',
  top: '4%',
  cursor: 'pointer',
});



export const Edit = () => {
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state: any) => state.films.reset);
  const detail = useAppSelector((state: any) => state.films.detail);
  console.log("detail:", detail)
  const [loading, setLoading] = useState(false);

  const [film, setFilm] = useState({
    userId: detail && detail.user.id,
    price: detail && detail.price,
    regionId: detail && detail.regionId,
    title: detail && detail.title,
    description: detail && detail.description,
    address: detail && detail.address,
    area: detail && detail.area,
    status_listing: detail && detail.status,
    legal_status: detail && detail.legal_status,
    furnishing: detail && detail.furnishing,
    orientation: detail && detail.orientation,
    bedrooms: detail && detail.bedrooms,
    bathrooms: detail && detail.bathrooms,
    category_id: detail && detail.category_id,
    type_id: detail && detail.type_id,
  });

  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<newListing>({
    mode: 'onChange',
    defaultValues: {
      userId: detail && detail.user.id,
      price: detail && detail.price,
      regionId: detail && detail.regionId,
      title: detail && detail.title,
      description: detail && detail.description,
      address: detail && detail.address,
      area: detail && detail.area,
      status_listing: detail && detail.status,
      legal_status: detail && detail.legal_status,
      furnishing: detail && detail.furnishing,
      orientation: detail && detail.orientation,
      bedrooms: detail && detail.bedrooms,
      bathrooms: detail && detail.bathrooms,
      category_id: detail && detail.category_id,
      type_id: detail && detail.type_id,
      },
    resolver: yupResolver(CreateFilmSchema),
  }
);


const listing_categories = useAppSelector((state: any) => state.actor?.allActor);
const listing_types = useAppSelector((state:any)=>state.category.allCategory);
 
  const handleEditFilm = async () => {
    setLoading(true);
    // const newArrayIdTypes = film.types.map((item: any) => String(item.id));
    // const newArrayIdCategories = film.categories.map((item: any) => String(item.id));
    // const formData = new FormData();
    // if(film.url.name){
    //     formData.append("file[]", film.url,film.url.name)
    // }
    // if(film.verticalPoster.name)
    // {
    //     console.log(film.verticalPoster.name, detail.verticalPoster);
    //         formData.append("file[]", film.verticalPoster, film.verticalPoster.name)
    // }
    // if(film.horizontalPoster.name)
    //  formData.append("file[]", film.horizontalPoster,film.horizontalPoster.name)

    //  await axiosInstance.post("/films/deleteObject", {
    //     url: film.url.name !== detail.url && film.url.name !== undefined ? detail.url : null,
    //     verticalPoster: film.verticalPoster.name !== detail.verticalPoster && film.verticalPoster.name !== undefined ? detail.verticalPoster : null,
    //     horizontalPoster: film.horizontalPoster.name !== detail.horizontalPoster && film.horizontalPoster.name !== undefined ? detail.horizontalPoster : null
    // })
    //  await axiosInstance.post("/films/uploadImage", formData ,{
    //     headers:{
    //         "Content-Type": "multipart/form-data"
    //     }
    //    }
    //    )
    await EditNewListing({ ...film });
    setLoading(false);
    dispatch(setField(null));
    dispatch(setReset(!reset));
  };

  return (
    <Container>
      <MainWrapper>
        <Label>Edit Listing</Label>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Region ID
          </InputLabel>
          <CreateFilmInput defaultValue={film.regionId}
          onChange1={(e:any)=> setFilm({ ...film, regionId: e.target.value })} requiredIcon name="regionId" label="regionId" type="number" control={control} placeholder="Enter your regionId" />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            user ID
          </InputLabel>
          <CreateFilmInput defaultValue={film.userId} onChange1={(e:any)=> setFilm({ ...film, userId: e.target.value })} type="number" requiredIcon name="userId" label="userID" control={control} placeholder="Enter your user ID" />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Price
          </InputLabel>
          <CreateFilmInput defaultValue={film.price} onChange1={(e:any)=> setFilm({ ...film, price: e.target.value })} type="number" requiredIcon name="price" label="Price" control={control} placeholder="Enter your Price" />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Title
          </InputLabel>
          <CreateFilmInput defaultValue={film.title} onChange1={(e:any)=> setFilm({ ...film, title: e.target.value })}  requiredIcon name="title" label="title" control={control} placeholder="Enter your title" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            description
          </InputLabel>
          <CreateFilmInput defaultValue={film.description} onChange1={(e:any)=> setFilm({ ...film, description: e.target.value })}  requiredIcon name="description" label="description" control={control} placeholder="Enter your description" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            address
          </InputLabel>
          <CreateFilmInput defaultValue={film.address} onChange1={(e:any)=> setFilm({ ...film, address: e.target.value })}  requiredIcon name="address" label="address" control={control} placeholder="Enter your address" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            area
          </InputLabel>
          <CreateFilmInput defaultValue={film.area} onChange1={(e:any)=> setFilm({ ...film, area: e.target.value })}  requiredIcon name="area" label="area" control={control} placeholder="Enter your area" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            orientation
          </InputLabel>
          <CreateFilmInput defaultValue={film.orientation} onChange1={(e:any)=> setFilm({ ...film, orientation: e.target.value })}  requiredIcon name="orientation" label="orientation" control={control} placeholder="Enter your orientation" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            bedrooms
          </InputLabel>
          <CreateFilmInput defaultValue={film.bedrooms} onChange1={(e:any)=> setFilm({ ...film, bedrooms: e.target.value })} type="number" requiredIcon name="bedrooms" label="bedrooms" control={control} placeholder="Enter your bedrooms" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            bathrooms
          </InputLabel>
          <CreateFilmInput defaultValue={film.bathrooms} onChange1={(e:any)=> setFilm({ ...film, bathrooms: e.target.value })} type="number" requiredIcon name="bathrooms" label="bathrooms" control={control} placeholder="Enter your bathrooms" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <CreateOptionInput
            defaultValue={film.legal_status}
            onChange1={(event: any, value: any) => setFilm({ ...film, legal_status: Boolean(value.label) })}
            options={[
              { id: 1, name: 'true' },
              { id: 2, name: 'false' },
            ]}
            requiredIcon
            name="legal_status"
            label="legal_status"
            control={control}
            placeholder="Enter legal_status "
          />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <CreateOptionInput
            defaultValue={film.furnishing}
            onChange1={(event: any, value: any) => setFilm({ ...film, furnishing: Boolean(value.label) })}
            options={[
              { id: 1, name: 'true' },
              { id: 2, name: 'false' },
            ]}
            requiredIcon
            name="furnishing"
            label="furnishing"
            control={control}
            placeholder="Enter furnishing "
          />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <CreateOptionInput
            defaultValue={film.status_listing}
            onChange1={(event: any, value: any) => setFilm({ ...film, status_listing: value.label })}
            options={[
              { id: 1, name: 'pending' },
              { id: 1, name: 'done' },
            ]}
            requiredIcon
            name="status_listing"
            label="status_listing"
            control={control}
            placeholder="Enter status_listing "
          />
        </FormControl>

        <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
         <CreateOptionInput
            onChange1={(event: any, value: any) => setFilm({ ...film, category_id: value.id })}
            options={listing_categories ? listing_categories.map((item:any)=>({id: item.id, name: item.name})) : []}
            requiredIcon
            name="category_id"
            label="Chuyên mục tin rao"
            control={control}
            placeholder="Chuyên mục tin rao "
          />
    </FormControl>
    <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
         <CreateOptionInput
            onChange1={(event: any, value: any) => setFilm({ ...film, type_id: value.id })}
            options={listing_types ? listing_types.map((item:any)=>({id: item.id, name: item.name})) : []}
            requiredIcon
            name="type_id"
            label="Loại tin rao"
            control={control}
            placeholder="Loại tin rao "
          />
    </FormControl>

        <Button
          data-test="btn-film"
          type="submit"
          style={{ marginTop: '10px', width: '90px', height: '40px' }}
          variant="contained"
          disabled={!isValid}
          onClick={handleSubmit(handleEditFilm)}
        >
          {loading ? <CircularProgress color="secondary" /> : 'Edit'}
        </Button>
      </MainWrapper>
      <CloseIcon>
        <HighlightOffOutlinedIcon onClick={() => dispatch(setField(null))} />
      </CloseIcon>
    </Container>
  );
};
