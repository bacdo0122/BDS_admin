import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  Box,
  BoxProps,
  Grid,
  GridProps,
  List,
  ListItem,
  ListItemProps,
  ListProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { addSlashPrefixToString } from 'helpers';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
const Container = styled(Box)<BoxProps>({
  width: '100%',
  boxSizing: 'border-box',
  height: "56px",

});

const IconBox = styled(Box)<BoxProps>({
  width: '30px',
  display: "flex",
  alignItems: "center"
});

const Header = styled(Grid)<
  GridProps & {
    isActive?: boolean;
  }
>(({ isActive }) => ({
  backgroundColor: isActive ? '#3e4049' : '#363740',
  color: isActive ? '#DDE2FF' : '#9698a4',
  borderLeft: isActive ? "1.5px solid #fff" : "0",
  height: "100%",
  width: "100%"
}));
const HeaderWrapper = styled(Box)<BoxProps>({
  display: 'flex',
  cursor: 'pointer',
  padding: '5px 20px',
  height: "100%",
  width: "100%"
});
const Title = styled(Typography)<TypographyProps>({
  marginLeft: '15px',
  display: 'flex',
  alignItems: 'center',
});

const DropdownIcon = styled(Box)<BoxProps>({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  '& svg': {
    fontSize: '30px',
  },
});

const Body = styled(List)<ListProps>({
  paddingLeft: '30px',
});

const ListItemCustom = styled(ListItem)<
  ListItemProps & {
    isActive?: boolean;
  }
>(({ isActive }) => ({
  cursor: 'pointer',
  background: isActive ? '#3636ff' : '#ffff',
  color: isActive ? '#ffff' : 'unset',
  borderRadius: '8px',
}));

interface ListItem {
  title: string;
  link: string;
}

interface Props {
  Icon: any;
  title: string;
  items: ListItem[];
  path: string;
  onItemClick: (url: string) => void;
}

export const DropdownList = ({ Icon, title, items, onItemClick, path }: Props) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  console.log("path:", location.pathname , path)
  return (
    <Container>
      <Header
        isActive={path === '/' ? location.pathname === path : location.pathname === ('/' + path)}
        onClick={() => {
          if (items.length > 0) {
            setOpen(!open);
          } else {
            onItemClick(addSlashPrefixToString(path));
          }
        }}
      >
        <HeaderWrapper>
          <IconBox>
            <Icon />
          </IconBox>
          <Title>{title}</Title>
          <DropdownIcon>{items.length > 0 ? open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> : ''}</DropdownIcon>
        </HeaderWrapper>
      </Header>
      {open && (
        <Body>
          {items.map(({ title, link }, i) => (
            <ListItemCustom
              isActive={location.pathname.includes(addSlashPrefixToString(link))}
              key={i}
              onClick={() => {
                onItemClick(`${path}/${link}`);
              }}
            >
              {title}
            </ListItemCustom>
          ))}
        </Body>
      )}
    </Container>
  );
};
