import * as React from 'react';
import {styled, Box, BoxProps} from '@mui/material'
 interface Props {
    title:string,
    number:number
}
const CardWrapper = styled(Box)<BoxProps>({
    padding: "20px",
    width: 'calc(33.33% - 3rem)',
    background: "#fff",
    display:"flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "8px",
    flex: '1 1 auto'
})

const TitleCard = styled(Box)<BoxProps>({
    fontSize: "19px",
    lineHeight: "24px",
    textAlign:"center",
    letterSpacing: "0.4px",
    color: '#9FA2B4',
    
})

const ValueCard = styled(Box)<BoxProps>({
    fontSize: "40px",
    lineHeight: "50px",
    textAlign:"center",
    letterSpacing: "1px",
    fontWeight: "700",
    color: '#252733',
    
})
export const CardItem = ({title, number}:Props) => {
  return (
    <CardWrapper>
        <TitleCard >{title}</TitleCard>
        <ValueCard >{number}</ValueCard>
    </CardWrapper>
  );
}
