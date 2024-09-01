import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled, BoxProps, TypographyProps,Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from '../stores/hook';
import { LoginSchema } from 'helpers/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm,SubmitHandler } from 'react-hook-form';
import {useNavigate} from 'react-router-dom'
import UserInput from 'Inputs/userInput';
import PasswordInput from 'Inputs/passwordInput';
import {ExecLogin} from '../apis/auth'
import { setAccessToken, setRefreshToken } from 'helpers/localStorage';
import { setAuthenticated } from 'reducers';
import { getErrorMessage } from 'helpers/message';
import {jwtDecode, JwtPayload} from 'jwt-decode';
const theme = createTheme();

const MainWrap = styled(Box)<BoxProps>(() => ({
  backgroundColor: '#fff',
  padding: '20px',
  border: '1px solid #DFE0EB',
  borderRadius: '8px',
}));
const ErrorText = styled(Typography)<TypographyProps>({
  color: '#FF6150',
  fontSize: '12px',
  marginTop: 0,
  fontWeight: 400,
});

interface LoginInputs {
  email: string;
  password: string;
}

interface CustomJwtPayload extends JwtPayload {
  role: string;
  // Bạn có thể thêm các thuộc tính khác nếu cần
}
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate =  useNavigate();
  const [submitErr, setSubmitErr] = useState('');
  const {
    setError,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<LoginInputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginSchema),
  });

  const handleLogin : SubmitHandler<LoginInputs> = async ({email, password}: LoginInputs) => {
    
    
    try {
      const {accessToken, refreshToken} = await ExecLogin(email, password);
      const decoded = jwtDecode<CustomJwtPayload>(accessToken);
      console.log("asd:", decoded)
      if(decoded && decoded?.role === 'admin' ){
        setAccessToken(accessToken);
        setRefreshToken(refreshToken); 
        dispatch(setAuthenticated(true));
        navigate("/");
      } else{
        const errorMsg = 'Bạn ko có quyền truy cập';
        setSubmitErr(errorMsg);
      }
    } catch (error:any) {
      setError('email', {});
      setError('password', {});
      const description = getErrorMessage(error);
      const errorMsg = description === 'Wrong password' ? 'Incorrect email or password!' : description;
      setSubmitErr(errorMsg);
      return error;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <MainWrap>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <img
                width={60}
                src="https://s3-alpha-sig.figma.com/img/d763/299f/7fad248ef89e1e7b8b7ebd654de0b91d?Expires=1661731200&Signature=Zar9amIwGwExOc4U6~v8wsJ2lHqcHyBezvTn3rmnoHdygj-9og1EgNlQxxt4C4hRVnDCHb9nYo0SiTBKRoPd3fOusScWE~vTE4Wb3O3cto5iDzCldNo5tFggGszK-DoLb18gRBqIIXaU55KoFlvzhQ7tNyfCtyRuWYjeu1rPW93qXyX7HdjVnUSaIbc2bUz3gecXP6OkVAkloH2BLuuCkX2QaIAndxLCz6rD2vUXjHtulSUdY4KEBeS7bcwoFH4mCN83fznC67Dy0uZGYe780WiU0CpqzEoasASx1VJ6DsHDM0CX3bk8hRvohJ6ZoMJirnSLbe-H5RNog0aVbasoeQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                alt=""
              />
            </Avatar>

            <Box
              sx={{
                fontSize: '19px',
                lineHeight: '24px',
                alignItem: 'center',
                verticalAlign: 'top',
                letterSpacing: '.4px',
                color: '#A4A6B3',
                opacity: '0.7',
              }}
            >
              Quản lý bất động sản
            </Box>
            <Box
              component="span"
              sx={{
                fontSize: '14px',
                lineHeight: '20px',
                alignItem: 'center',
                verticalAlign: 'top',
                letterSpacing: '.3px',
                color: '#9FA2B4',
                marginTop: '15px',
              }}
            >
              Nhập email và mật khẩu của bạn
            </Box>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <UserInput
               
                requiredIcon
                name="email"
                label="Email"
                control={control}
                placeholder="Nhập email của bạn"
              />
              <PasswordInput name="password" label="Password" control={control} placeholder="Nhập mật khẩu của bạn" />
              
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    fontSize: '10px',
                    fontWeight: '400',
                    lightHeight: '13px',
                    letterSpacing: '0.1px',
                    color: '#9FA2B4',
                    textDecoration: 'none',
                  }}
                >
                 Quên mật khẩu?
                </Link>
              </Box>
              {submitErr && <ErrorText mt={1}>{submitErr}</ErrorText>}
              <Button type="submit" 
              disabled={!isValid}
              onClick={handleSubmit(handleLogin)}
              fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
               Đăng nhập
              </Button>
            </Box>
          </Box>
        </MainWrap>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
