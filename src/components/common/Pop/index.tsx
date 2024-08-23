import React, { ChangeEvent, useCallback, useState } from 'react';
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
  Typography,
  TypographyProps,
  IconButton,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { setField, setReset } from 'reducers/Film';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { axiosInstance } from '../../../apis';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateFilmSchema } from '../../../helpers/validation';
import CreateFilmInput from '../../../Inputs/createFilmInput';
import CreateOptionInput from '../../../Inputs/createOptionInput';
import { CreateNewListing } from '../../../apis/film';
import CloseIcon from '@mui/icons-material/Close';

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
export const BootstrapInput = styled(TextField)(({ theme }) => ({
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
const CloseIconBtn = styled(Box)<BoxProps>({
  position: 'absolute',
  right: '4%',
  top: '4%',
  cursor: 'pointer',
});

export interface newListing {
  regionId: number;
  type_id: number;
  category_id: number;
  direction_id: number;
  title: string;
  description: string;
  address: string;
  area: number;
  pricePerArea: number;
  status_listing: string;
  legal_status: boolean;
  furnishing: boolean;
  orientation: string;
  bedrooms: number;
  bathrooms: number;
  userId: number;
  price: number;
}

const ErrorText = styled(Typography)<TypographyProps>({
  color: '#FF6150',
  fontSize: '12px',
  marginTop: 0,
  fontWeight: 400,
});

export const Pop = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const reset = useAppSelector((state: any) => state.films.reset);
  const [film, setFilm] = useState<newListing>({
    regionId: 0,
    userId: 0,
    type_id:0,
    category_id: 0,
    direction_id: 0,
    price: 0,
    title: '',
    description: '',
    address: '',
    area: 0,
    pricePerArea: 0,
    status_listing: '',
    legal_status: true,
    furnishing: true,
    orientation: '',
    bedrooms: 0,
    bathrooms: 0
  });

  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<newListing>({
    mode: 'onChange',
    defaultValues: {
      regionId: 0,
      userId: 0,
      type_id:0,
      category_id: 0,
      direction_id: 0,
      price: 0,
      title: '',
      description: '',
      address: '',
      area: 0,
      pricePerArea: 0,
      status_listing: '',
      legal_status: true,
      furnishing: true,
      orientation: '',
      bedrooms: 0,
      bathrooms: 0
    },
    resolver: yupResolver(CreateFilmSchema),
  });


  const listing_categories = useAppSelector((state: any) => state.actor?.allActor);
  const listing_types = useAppSelector((state:any)=>state.category.allCategory);
  const listing_directions = useAppSelector((state:any)=>state.direction.allDirection);
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("event:", event.target)
    if (event.target.files) {
      // Chuyển đổi FileList thành mảng
      const newFiles = Array.from(event.target.files);
      // Kết hợp tệp mới với các tệp hiện tại
      setImages(prevImages => [...prevImages, ...newFiles]);
    }
  };
  // const categories = useAppSelector((state: any) => state.category.allCategory);
  // const banner = useAppSelector((state: any) => state.banner.allBanner);

  // const handleChangeActor = (event: any, value: any) => {
  //   const check = film.actor.filter((item: any) => item.id === value.id);
  //   if (check.length !== 0) {
  //     setFilm({ ...film, actor: film.actor });
  //   } else {
  //     const newActors = [...film.actor, value];
  //     setFilm({ ...film, actor: newActors as any });
  //   }
  // };

  // const handleChangeCategory = (event: any, value: any) => {
  //   const check = film.category.filter((item: any) => item.id === value.id);
  //   if (check.length !== 0) {
  //     setFilm({ ...film, category: film.category });
  //   } else {
  //     const newCategory = [...film.category, value];
  //     setFilm({ ...film, category: newCategory as any });
  //   }
  // };
  // const handleChangeBanner = (event: any, value: any) => {
  //   setFilm({ ...film, bannerType: String(value.id) });
  // };
    // formstate has the errors
  const handleCreateFilm : SubmitHandler<newListing> = async () => {
    setLoading(true);
    console.log("images:", images)
    const image_string = images.reduce((item:any, value:any, index:number) => {
      let currentValue = ``;
      if(index === 0){
         currentValue =  item += `${value}`;
      }
      else currentValue =  item += `;${value}`;
     return currentValue;
    }, '')
    // const formData = new FormData();
    // if (film.url) {
    //   formData.append('file[]', film.url, film.url.name);
    // }
    // if (film.verticalPoster) formData.append('file[]', film.verticalPoster, film.verticalPoster.name);
    // if (film.horizontalPoster) formData.append('file[]', film.horizontalPoster, film.horizontalPoster.name);
    // try {
    //   await axiosInstance.post('/films/uploadImage', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    // } catch (error) {
    //   console.log('error:', error);
    // }
    await CreateNewListing({ ...film }, String(image_string));
    setLoading(false);
    dispatch(setField(null));
    dispatch(setReset(!reset));
  };

  const handleClose = useCallback((indexImage: number) => {

    const newImages = [...images].filter((image, index) => index !== indexImage);
    setImages(newImages)
  }, [images])
  return (
    <Container>
      <MainWrapper>
        <Label>Tạo tin rao</Label>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          ID khu vực
          </InputLabel>
          <CreateFilmInput 
          onChange1={(e:any)=> setFilm({ ...film, regionId: e.target.value })} requiredIcon name="regionId" label="regionId" type="number" control={control} placeholder="Enter your bds ID" />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          ID ngừoi dùng
          </InputLabel>
          <CreateFilmInput onChange1={(e:any)=> setFilm({ ...film, userId: e.target.value })} type="number" requiredIcon name="userId" label="userID" control={control} placeholder="Enter your user ID" />

          {/* <BootstrapInput
            onChange={(e: any) => setFilm({ ...film, score: e.target.value })}
            type="number"
            placeholder="Enter Score"
            id="bootstrap-input"
          /> */}
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Giá
          </InputLabel>
          <CreateFilmInput onChange1={(e:any)=> setFilm({ ...film, price: e.target.value })} type="number" requiredIcon name="price" label="Price" control={control} placeholder="Enter your Price" />

          {/* <BootstrapInput
            onChange={(e: any) => setFilm({ ...film, score: e.target.value })}
            type="number"
            placeholder="Enter Score"
            id="bootstrap-input"
          /> */}
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Tiêu đề
          </InputLabel>
          <CreateFilmInput onChange1={(e:any)=> setFilm({ ...film, title: e.target.value })}  requiredIcon name="title" label="title" control={control} placeholder="Enter your title" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Mô tả
          </InputLabel>
          <CreateFilmInput onChange1={(e:any)=> setFilm({ ...film, description: e.target.value })}  requiredIcon name="description" label="description" control={control} placeholder="Enter your description" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Địa chỉ
          </InputLabel>
          <CreateFilmInput onChange1={(e:any)=> setFilm({ ...film, address: e.target.value })}  requiredIcon name="address" label="address" control={control} placeholder="Enter your address" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Diện tích
          </InputLabel>
          <CreateFilmInput type="number" onChange1={(e:any)=> setFilm({ ...film, area: e.target.value })}  requiredIcon name="area" label="area" control={control} placeholder="Enter your area" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Giá mỗi m2
          </InputLabel>
          <CreateFilmInput type="number" onChange1={(e:any)=> setFilm({ ...film, pricePerArea: e.target.value })}  requiredIcon name="pricePerArea" label="pricePerArea" control={control} placeholder="Enter your pricePerArea" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Tiện nghi
          </InputLabel>
          <CreateFilmInput onChange1={(e:any)=> setFilm({ ...film, orientation: e.target.value })}  requiredIcon name="orientation" label="orientation" control={control} placeholder="Enter your orientation" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Số phòng ngủ
          </InputLabel>
          <CreateFilmInput onChange1={(e:any)=> setFilm({ ...film, bedrooms: e.target.value })} type="number" requiredIcon name="bedrooms" label="bedrooms" control={control} placeholder="Enter your bedrooms" />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Số phòng tắm
          </InputLabel>
          <CreateFilmInput onChange1={(e:any)=> setFilm({ ...film, bathrooms: e.target.value })} type="number" requiredIcon name="bathrooms" label="bathrooms" control={control} placeholder="Enter your bathrooms" />
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
            label="Tình trạng hợp pháp"
            control={control}
            placeholder="Tình trạng hợp pháp "
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
            label="Tiện nghi"
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
            label="Tình trạng tin rao"
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
    <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
         <CreateOptionInput
            onChange1={(event: any, value: any) => setFilm({ ...film, direction_id: value.id })}
            options={listing_directions ? listing_directions.map((item:any)=>({id: item.id, name: item.name})) : []}
            requiredIcon
            name="direction_id"
            label="Hướng nhà"
            control={control}
            placeholder="Hướng nhà "
          />
    </FormControl>

    <FormControl variant="standard" sx={{ width: '100%', marginTop: '20px' }}>
          <InputLabel shrink htmlFor="image-upload" style={{top: "-10px"}}>
            Upload Images
          </InputLabel>
          <input
            type="file"
            id="image-upload"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            component="label"
            htmlFor="image-upload"
            style={{ marginTop: '10px', width: '100%' }}
          >
            Choose Images
          </Button>
        </FormControl>

        <div style={{ marginTop: '20px' }}>
          {images.length > 0 && (
            <div style={{display: 'flex', flexWrap: "wrap"}}>
              {images.map((image, index) => (
                 <div  key={index}>
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  style={{ width: '100px', height: '100px', margin: '5px' }}
                />
                <IconButton aria-label="close" onClick={() => handleClose(index)}>
                <CloseIcon />
              </IconButton>
              </div>
              ))}
            </div>
          )}
        </div>

        <Button
          data-test="btn-film"
          type='submit'
          style={{ marginTop: '10px', width: '90px', height: '40px' }}
          variant="contained"
          disabled={!isValid}
          onClick={handleSubmit(handleCreateFilm)}
        >
          {loading ? <CircularProgress color="secondary" /> : 'Thêm'}
        </Button>
      </MainWrapper>
      <CloseIconBtn>
        <HighlightOffOutlinedIcon onClick={() => dispatch(setField(null))} />
      </CloseIconBtn>
    </Container>
  );
};
