import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { styled, Box, BoxProps, TextField, alpha, FormControl, Button, InputLabel, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { setField, setReset } from 'reducers/Film';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createBannerSchema } from '../../../helpers/validation';
import CreateFilmInput from '../../../Inputs/createFilmInput';
import { EditExisNews } from '../../../apis/news';
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
const CloseIconBtn = styled(Box)<BoxProps>({
  position: 'absolute',
  right: '4%',
  top: '4%',
  cursor: 'pointer',
});
interface Banner {
  id: string;
  content: string;
  title: string;
  userId: number;
  category_id: number;
}
export const EditBanner = () => {
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state: any) => state.films.reset);
  const detail = useAppSelector((state: any) => state.films.detail);
  const [value, setValue] = React.useState<Banner>({
    id: detail && detail.id,
    title:detail && detail.title,
    content:detail && detail.content,
    userId: detail && detail.userId,
    category_id: detail && detail.category_id,
  });
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<Banner>({
    mode: 'onChange',
    defaultValues: {
      title:detail && detail.title,
      content:detail && detail.content,
      userId: detail && detail.userId,
      category_id: detail && detail.category_id,
    },
    resolver: yupResolver(createBannerSchema),
  });
  const [images, setImages] = useState(detail && detail.image.length > 1 ? detail.image.split(";") : [detail.image]);

const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {
    // Chuyển đổi FileList thành mảng
    const newFiles = Array.from(event.target.files);
    // Kết hợp tệp mới với các tệp hiện tại
    setImages((prevImages:any) => [...prevImages, ...newFiles.map(image => image.name)]);
  }
};
const handleClose = useCallback((imageTarget: string) => {

  const newImages = [...images].filter(image => image !== imageTarget);
  console.log("newImages:", newImages)
  setImages(newImages)
}, [images])
  const handleEditBanner = async () => {
    const image_string = images.reduce((item:any, value:any, index:number) => {
      let currentValue = ``;
      if(index === 0){
         currentValue =  item += `${value}`;
      }
      else currentValue =  item += `;${value}`;
     return currentValue;
    }, '')
    await EditExisNews(value.id, value.title, value.content, value.userId, value.category_id, String(image_string));
    dispatch(setField(null));
    dispatch(setReset(!reset));
  };
  return (
    <Container>
      <MainWrapper>
        <Label>Edit News</Label>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Content
          </InputLabel>
          <CreateFilmInput
          defaultValue={value.content}
            onChange1={(e: any) => setValue({ ...value, content: e.target.value })}
            requiredIcon
            name="content"
            label="content"
            control={control}
            placeholder="Enter your content"
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Title
          </InputLabel>
          <CreateFilmInput
                    defaultValue={value.title}
            onChange1={(e: any) => setValue({ ...value, title: e.target.value })}
            requiredIcon
            name="title"
            label="Title"
            control={control}
            placeholder="Enter your title"
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            User ID
          </InputLabel>
          <CreateFilmInput
          type='number'
          defaultValue={value.userId}
            onChange1={(e: any) => setValue({ ...value, userId: e.target.value })}
            requiredIcon
            name="userId"
            label="userId"
            control={control}
            placeholder="Enter your userId"
          />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Category ID
          </InputLabel>
          <CreateFilmInput
          type='number'
          defaultValue={value.category_id}
            onChange1={(e: any) => setValue({ ...value, category_id: e.target.value })}
            requiredIcon
            name="category_id"
            label="category_id"
            control={control}
            placeholder="Enter your category_id"
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
              {images.map((image: any, index:number) => (
                <div  key={index}>
                  <img
                    src={`http://localhost:3000/images/${image}`}
                    alt={`preview-${index}`}
                    style={{ width: '100px', height: '100px', margin: '5px' }}
                  />
                  <IconButton aria-label="close" onClick={() => handleClose(image)}>
                <CloseIcon />
              </IconButton>
                  </div>
              ))}
            </div>
          )}
        </div>

        <Button variant="contained"  disabled={!isValid}
          onClick={handleSubmit(handleEditBanner)}
        sx={{ marginTop: '10px' }}>
          Edit
        </Button>
      </MainWrapper>
      <CloseIconBtn>
        <HighlightOffOutlinedIcon onClick={() => dispatch(setField(null))} />
      </CloseIconBtn>
    </Container>
  );
};
