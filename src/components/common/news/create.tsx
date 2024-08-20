import React, { useRef, useState } from 'react';
import { styled, Box, BoxProps, TextField, alpha, FormControl, Button, InputLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { CreateNewNews } from 'apis/news';
import { setField, setReset } from 'reducers/Film';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createBannerSchema } from '../../../helpers/validation';
import CreateFilmInput from '../../../Inputs/createFilmInput';

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
interface Banner {
  content: string;
  title: string;
  userId: number;
  category_id: number;
}
export const CreateNews = () => {
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state: any) => state.films.reset);
  const [value, setValue] = React.useState<Banner>({
    title: '',
    content: '',
    userId: 0,
    category_id: 0
  });
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<Banner>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      userId: 0,
      category_id: 0
    },
    resolver: yupResolver(createBannerSchema),
  });
  const handleCreateBanner = async () => {
    await CreateNewNews(value.title, value.content, value.userId, value.category_id);
    dispatch(setField(null));
    dispatch(setReset(!reset));
  };
  return (
    <Container>
      <MainWrapper>
        <Label>Create News</Label>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Content
          </InputLabel>
          <CreateFilmInput
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
            onChange1={(e: any) => setValue({ ...value, category_id: e.target.value })}
            requiredIcon
            name="category_id"
            label="category_id"
            control={control}
            placeholder="Enter your category_id"
          />
        </FormControl>

        <Button
          variant="contained"
          disabled={!isValid}
          onClick={handleSubmit(handleCreateBanner)}
          sx={{ marginTop: '10px' }}
        >
          Create
        </Button>
      </MainWrapper>
      <CloseIcon>
        <HighlightOffOutlinedIcon onClick={() => dispatch(setField(null))} />
      </CloseIcon>
    </Container>
  );
};
