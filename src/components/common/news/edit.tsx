import React, { useRef, useState } from 'react';
import { styled, Box, BoxProps, TextField, alpha, FormControl, Button, InputLabel } from '@mui/material';
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
const CloseIcon = styled(Box)<BoxProps>({
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
    },
    resolver: yupResolver(createBannerSchema),
  });
  const handleEditBanner = async () => {
    await EditExisNews(value.id, value.title, value.content, value.userId);
    dispatch(setField(null));
    dispatch(setReset(!reset));
  };
  return (
    <Container>
      <MainWrapper>
        <Label>Edit Banner</Label>
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

        <Button variant="contained"  disabled={!isValid}
          onClick={handleSubmit(handleEditBanner)}
        sx={{ marginTop: '10px' }}>
          Edit
        </Button>
      </MainWrapper>
      <CloseIcon>
        <HighlightOffOutlinedIcon onClick={() => dispatch(setField(null))} />
      </CloseIcon>
    </Container>
  );
};
