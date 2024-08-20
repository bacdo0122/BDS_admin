import { Box, BoxProps, styled } from '@mui/material';
import { Header } from 'components/Header';
import { Logo } from 'components/Header/logo';
import { SlideMenus } from 'components/SlideMenu';
import { drawerWidth, headerHeight } from 'consts';
import { publicRouters } from 'consts/auth';
import { addSlashPrefixToString } from 'helpers';
import { useActor } from 'hooks/useActor';
import { useUser } from 'hooks/useUser';
import { useAuthenticated } from 'hooks/useAuthenticated';
import  useFetchMostViewFilm  from 'hooks/useData';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { setFilmMostView } from "../../reducers/Film";
import { useAppDispatch, useAppSelector } from 'stores/hook';
import { Pop } from 'components/common/Pop';
import { useCategory } from 'hooks/useCategory';
import { Edit } from 'components/common/Pop/edit';
import { Detail } from 'components/common/Pop/detail';
import {  CreateListingCateogry } from 'components/common/listingCategory/create';
import { EditActor } from '../common/listingCategory/edit';
import { DetailActor } from 'components/common/listingCategory/detail';
import { CreateListingType } from 'components/common/category/create';
import {  EditListingType } from 'components/common/category/edit';
import {  DetailListingType } from 'components/common/category/detail';
import { CreateUser } from 'components/common/user/create';
import { EditUser } from 'components/common/user/edit';
import { DetailUser } from 'components/common/user/detail';
import { useBanner } from 'hooks/useBanner';
import {  CreateNews } from '../common/news/create';
import { EditBanner } from '../common/news/edit';
import { DetailBanner } from '../common/news/detail';
import { useNews } from '../../hooks/useNews';
import { useNewsCategory } from '../../hooks/useNewsCategory';
import { useRegion } from '../../hooks/useRegion';
import { CreateNewsCategory } from '../common/newsCategory/create';
import { EditNewsCategory } from '../common/newsCategory/edit';
import { DetailNewsCategory } from '../common/newsCategory/detail';
import { CreateRegion } from '../common/region/create';
import { EditRegion } from '../common/region/edit';
import { DetailRegion } from '../common/region/detail';
import { CreateReview } from '../common/review/create';
import { EditReview } from '../common/review/edit';
import { DetailReview } from '../common/review/detail';
import { useDistrict } from '../../hooks/useDistrict';
import { useWard } from '../../hooks/useWard';
import { useDirection } from '../../hooks/useDirection';
import { CreateDirection } from '../common/direction/create';
import { EditDirection } from '../common/direction/edit';
import { DetailDirection } from '../common/direction/detail';
import { EditDistrict } from '../common/district/edit';
import { DetailDistrict } from '../common/district/detail';
import { CreateDistrict } from '../common/district/create';
import { CreateWard } from '../common/ward/create';
import { EditWard } from '../common/ward/edit';
import { DetailWard } from '../common/ward/detail';


interface Props {
  name?: string;
  children: React.ReactChild;
}

const MainLayout = styled(Box)<BoxProps>(() => ({
  // width: '100%',
  minHeight: '100vh',
  boxSizing: 'border-box',
  width: `calc(100% - ${drawerWidth}px)`,
  height: '100vh',
  overflow:"hidden"
}));

const Divider = styled(Box)<BoxProps>(() => ({
  height: headerHeight,
}));

const Wrapper = styled(Box)<BoxProps>({
  display: 'flex',
  width: '100%',
  background: `#F7F8FC`,
  position:"relative"
});
const LeftWrapper = styled(Box)<BoxProps>(()=>({
  width: drawerWidth,
  height: `100vh`,
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
  background: '#363740',
}));
const PopUpLayout = styled(Box)<BoxProps>(()=>({
  width: "100%",
  height:"100%",
  position: "absolute",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  background: "rgba(217, 217, 217, 0.33)"
}));
const Layout: React.FC<Props> = ({ children }) => {
  
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state:any) => state.auth.isAuthenticated); 
  const field = useAppSelector((state:any)=>state.films.field)
  useAuthenticated();
  useFetchMostViewFilm(location, dispatch); 
  useCategory(location, dispatch);
  useActor(location, dispatch);
  useUser(location, dispatch);
  useNewsCategory(location, dispatch);
  useBanner(location, dispatch);
  useNews(location, dispatch);
  useRegion(location, dispatch);
  useDistrict(location, dispatch);
  useWard(location,dispatch);
  useDirection(location, dispatch)
 const renderLayout = () => {
    if (publicRouters.includes(location.pathname)) {
      return isAuthenticated !== null && !isAuthenticated ? (
        <>{children}</>
      ) : (
        <div>Loading...</div>
      );
    } else {
      return isAuthenticated !== null  && isAuthenticated ? (
        <>
          <Wrapper>
            <LeftWrapper>
                <Logo />
               <SlideMenus />
            </LeftWrapper>

          <MainLayout>
            {children}
          </MainLayout>
          {field === "create" && 
          <PopUpLayout>
            {location.pathname === "/listings" && <Pop />}
            {location.pathname === "/listing_categories" && <CreateListingCateogry />}
            {location.pathname === "/listing_types" && <CreateListingType />}
            {location.pathname === "/news" && <CreateNews />}
            {location.pathname === "/news_category" && <CreateNewsCategory />}
            {location.pathname === "/users" && <CreateUser />}
            {location.pathname === "/regions" && <CreateRegion />}
            {location.pathname === "/listing_directions" && <CreateDirection />}
            {location.pathname === "/districts" && <CreateDistrict />}
            {location.pathname === "/wards" && <CreateWard />}
          </PopUpLayout>
          }
          {field === "edit" && 
          <PopUpLayout>
             {location.pathname === "/listings" && <Edit />}
            {location.pathname === "/listing_categories" && <EditActor />}
            {location.pathname === "/listing_types" && <EditListingType  />}
            {location.pathname === "/users" && <EditUser />}
            {location.pathname === "/news_category" && <EditNewsCategory />}
            {location.pathname === "/news" && <EditBanner />}
            {location.pathname === "/regions" && <EditRegion />}
            {location.pathname === "/listing_directions" && <EditDirection />}
            {location.pathname === "/districts" && <EditDistrict />}
            {location.pathname === "/wards" && <EditWard />}
          </PopUpLayout>
          }
          {field === "detail" && 
          <PopUpLayout>
              {location.pathname === "/listings" &&  <Detail />}
            {location.pathname === "/listing_categories" && <DetailActor />}
            {location.pathname === "/listing_types" && <DetailListingType  />}
            {location.pathname === "/users" && <DetailUser />}
            {location.pathname === "/news_category" && <DetailNewsCategory />}
            {location.pathname === "/news" && <DetailBanner />}
            {location.pathname === "/regions" && <DetailRegion />}
            {location.pathname === "/listing_directions" && <DetailDirection />}
            {location.pathname === "/districts" && <DetailDistrict />}
            {location.pathname === "/wards" && <DetailWard />}
          </PopUpLayout>
          }
          
        </Wrapper>
        </>
      ) : (
        <div>Loading...</div>
      );
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItem: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#363740',
      }}
    >
      
      {renderLayout()}
    </Box>
  );
};

export default Layout;
