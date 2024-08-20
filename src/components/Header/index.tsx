import { Box, BoxProps, styled, Avatar} from '@mui/material';
import Logo from 'assets/images/logo-example.svg';
import { headerHeight } from 'consts';
import React from 'react';

const Container = styled(Box)<BoxProps>(() => ({
  height: headerHeight,
  width: '100%',
  display: 'flex',
  padding: '14px 0 14px 0',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  alignItems: 'center',
 
  background: "transparent"
}));

const Title = styled(Box)<BoxProps>(()=>({
  color: '#252733',
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '30px', 
  letterSpacing: '0.3px',
}))

const NameImageWrapper = styled(Box)<BoxProps>(()=>({
  height: '100%',
  display:"flex",
  alignItems:"center"
}))

const Name = styled(Box)<BoxProps>(()=>({
  color: '#252733',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.2px',
  marginRight: "20px"
}))

interface Props{
  title:string,
  avatar:string,
  name:string
}
export const Header = ({title, avatar, name}:Props) => {
  console.log("title:", title)
  return (
   <Container>
    <Title>{title}</Title>
    <NameImageWrapper>
      <Name >{name}</Name>
      <Box sx={{
         height: '45px',
         width: '45px',
         alignItems: 'center',
         display: 'flex',
         borderRadius: '50%',
         justifyContent: 'center',
         background: '#fff',
      }}>
      <Box
        component="img"
        sx={{
          height: 40,
          width: 40,
          objectFit: 'cover',
          borderRadius: "50%"
        }}
        alt="The house from the offer."
        src={avatar}
      />
      </Box>
    </NameImageWrapper>
   </Container>
  );
};
