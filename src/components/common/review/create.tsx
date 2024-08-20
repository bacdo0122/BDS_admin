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
import { CreateNewNewsCategory } from '../../../apis/newsCategory';
import { CreateNewRegion } from '../../../apis/region';
import { CreateNewReview } from '../../../apis/review';

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
interface Review {
  listingId: number;
  userId: number;
  rating: number;
  comment:string;
}
export const CreateReview = () => {
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state: any) => state.films.reset);
  const [value, setValue] = React.useState<Review>({
    listingId: 0,
  userId: 0,
  rating: 0,
  comment:'',
  });
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<Review>({
    mode: 'onChange',
    defaultValues: {
      listingId: 0,
      userId: 0,
      rating: 0,
      comment:'',
    },
    resolver: yupResolver(createBannerSchema),
  });
  const handleCreateBanner = async () => {
    await CreateNewReview(value.listingId,value.userId, value.rating, value.comment );
    dispatch(setField(null));
    dispatch(setReset(!reset));
  };
  return (
    <Container>
      <MainWrapper>
        <Label>Create Review</Label>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
         Listing ID
          </InputLabel>
          <CreateFilmInput
          type='number'
            onChange1={(e: any) => setValue({ ...value, listingId: e.target.value })}
            requiredIcon
            name="listingId"
            label="listingId"
            control={control}
            placeholder="Enter your listingId"
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
         Rating
          </InputLabel>
          <CreateFilmInput
          type='number'
            onChange1={(e: any) => setValue({ ...value, rating: e.target.value })}
            requiredIcon
            name="rating"
            label="rating"
            control={control}
            placeholder="Enter your rating"
          />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
         Comment
          </InputLabel>
          <CreateFilmInput
            onChange1={(e: any) => setValue({ ...value, comment: e.target.value })}
            requiredIcon
            name="comment"
            label="comment"
            control={control}
            placeholder="Enter your comment"
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
