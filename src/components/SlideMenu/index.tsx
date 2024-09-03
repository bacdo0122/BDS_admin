import { Box, BoxProps, List, ListProps, styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { drawerWidth, headerHeight, transition } from 'consts';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownList } from './DropdownList';
import { menus } from './menus';



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })({
  width: `100%`,
  height: `calc(100vh - ${headerHeight})`,

  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  transition,
  overflow: 'unset',
  border: 'none',
  '& .MuiPaper-root': {
    position: 'unset',
    border: 'none',
    backgroundColor: 'transparent'
  },
  paddingTop: "20px",

  
});

const SideMenus = styled(List)<ListProps>(() => ({
  
}));

const SlideBody = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
 
}));

export const SlideMenus = () => {
  const navigate = useNavigate();
  console.log("menus:", menus)
  return (
    <Drawer open={true} variant="permanent">
      <SlideBody>
        <SideMenus>
          {menus.map(({ icon, title, path, items }, i) => {
            return (
              <DropdownList
                key={i}
                onItemClick={(url) => {
                  navigate(url);
                }}
                Icon={icon}
                title={title}
                path={path}
                items={items}
              />
            );
          })}
        </SideMenus>
      </SlideBody>
    </Drawer>
  );
};
