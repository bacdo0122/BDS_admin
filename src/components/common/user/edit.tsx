import React, { useRef, useState } from 'react';
import { styled, Box, BoxProps, TextField, alpha, FormControl, Button, InputLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { EditExisUser } from 'apis/user';
import { setField, setReset } from 'reducers/Film';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../../../helpers/validation';
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
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
}
export const EditUser = () => {
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state: any) => state.films.reset);
  const detail = useAppSelector((state: any) => state.films.detail);
  const [value, setValue] = React.useState<User>({
    id: detail && detail.id,
    name: detail && detail.name,
    email: detail && detail.email,
    password: detail && detail.password,
    phone_number: detail && detail.phone_number
  });
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<User>({
    mode: 'onChange',
    defaultValues: {
      name: detail && detail.name,
      email: detail && detail.email,
      password: detail && detail.password,
      phone_number: detail && detail.phone_number
    },
    resolver: yupResolver(createUserSchema),
  });

  const handleEditActor = async () => {
    await EditExisUser(value.id, value.name, value.email, value.password, value.phone_number);
    dispatch(setField(null));
    dispatch(setReset(!reset));
  };
  return (
    <Container>
      <MainWrapper>
        <Label>Edit User</Label>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Name
          </InputLabel>
          <CreateFilmInput
            defaultValue={value.name}
            onChange1={(e: any) => setValue({ ...value, name: e.target.value })}
            requiredIcon
            name="name"
            label="Name"
            control={control}
            placeholder="Enter your name"
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Email
          </InputLabel>
          <CreateFilmInput
           defaultValue={value.email}
            onChange1={(e: any) => setValue({ ...value, email: e.target.value })}
            requiredIcon
            name="email"
            label="Email"
            control={control}
            placeholder="Enter your Email"
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Password
          </InputLabel>
          <CreateFilmInput
           defaultValue={value.password}
            onChange1={(e: any) => setValue({ ...value, password: e.target.value })}
            requiredIcon
            name="password"
            label="Password"
            control={control}
            placeholder="Enter your Password"
          />{' '}
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            Phone Number
          </InputLabel>
          <CreateFilmInput
           type='number'
           defaultValue={value.phone_number}
            onChange1={(e: any) => setValue({ ...value, phone_number: e.target.value })}
            requiredIcon
            name="phone_number"
            label="phone_number"
            control={control}
            placeholder="Enter your phone_number"
          />
        </FormControl>

        <Button
          variant="contained"
          disabled={!isValid}
          onClick={handleSubmit(handleEditActor)}
          sx={{ marginTop: '10px' }}
        >
          Edit
        </Button>
      </MainWrapper>
      <CloseIcon>
        <HighlightOffOutlinedIcon onClick={() => dispatch(setField(null))} />
      </CloseIcon>
    </Container>
  );
};
