import RedirectComponent from 'components/common/RedirectComponent';
import { addSlashPrefixToString } from 'helpers';
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import {
  HomePath,
  notFoundPageSuffix,
  logOut,
  Banner,
  ListingPath,
  ListingCategoryPath,
  ListingTypePath,
  UsersPath,
  NewsPath,
  NewsCategoryPath,
  RegionsPath,
  loginSuffix,
  DistrictsPath,
  WardsPath,
  ListingDirectionPath,
} from './routes-conts';

const HomePage = React.lazy(() => import('pages'));
const LoginPage = React.lazy(() => import('pages/Login'));
const NotFoundPage = React.lazy(() => import('pages/NotFoundPage'));
const ListingPage = React.lazy(()=> import('pages/Listing'))
const ListingCategoryPage = React.lazy(() => import('pages/CategoryListing'));
const ListingTypePage = React.lazy(() => import('pages/TypeListing'));
const UsersPage = React.lazy(() => import('pages/User'));
const LogOutPage = React.lazy(() => import('pages/LogOut'));
const BannerPage = React.lazy(()=> import('pages/Banner'));
const NewsPage = React.lazy(()=> import('pages/News'));
const NewsCategoryPage = React.lazy(()=> import('pages/NewsCategory'));
const RegionPage = React.lazy(()=> import('pages/Region'));
const DistrictPage = React.lazy(()=> import('pages/District'));
const WardPage = React.lazy(()=> import('pages/Ward'));
const DirectionPage = React.lazy(()=> import('pages/Direction'));
const Routers = () => {
  const routes = [
    {
      element: <PrivateRoute />,
      children: [
        {
          path: HomePath,
          element: <HomePage />,
        },
        {
          path: ListingPath,
          element: <ListingPage />,
        },
        {
          path: ListingCategoryPath,
          element: <ListingCategoryPage />,
        },
        {
          path: ListingTypePath,
          element: <ListingTypePage />,
        },
        {
          path: ListingDirectionPath,
          element: <DirectionPage />,
        },
        {
          path: NewsPath,
          element: <NewsPage />,
        },
        {
          path: NewsCategoryPath,
          element: <NewsCategoryPage />,
        }, 
        {
          path: RegionsPath,
          element: <RegionPage />,
        },
        {
          path: DistrictsPath,
          element: <DistrictPage />,
        },
        {
          path: WardsPath,
          element: <WardPage />,
        },
        {
          path: UsersPath,
          element: <UsersPage />,
        },
        {
          path: logOut,
          element: <LogOutPage />
        },
        {
          path: Banner,
          element: <BannerPage />
        },
      ],
    },
    {
      element: <AuthRoute />,
      children: [{ path: addSlashPrefixToString(loginSuffix), element: <LoginPage /> }],
    },
    { path: addSlashPrefixToString(notFoundPageSuffix), element: <NotFoundPage /> },
    {
      path: '*',
      element: <Navigate to={addSlashPrefixToString(notFoundPageSuffix)} />,
    },
  ];
  const elements = useRoutes(routes);
  return elements;
};

export default Routers;
