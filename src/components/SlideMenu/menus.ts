import {
  HomePath,
  logOut,
  Banner,
  ListingPath,
  ListingCategoryPath,
  ListingTypePath,
  NewsPath,
  NewsCategoryPath,
  RegionsPath,
  UsersPath,
  DistrictsPath,
  WardsPath,
  ListingDirectionPath,
} from 'routes/routes-conts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieIcon from '@mui/icons-material/Movie';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import { Menu } from 'interfaces';

export const menus: Menu[] = [
  {
    title: 'Thống kê',
    path: HomePath,
    items: [],
    icon: DashboardIcon,
  },
  {
    title: 'Tin rao',
    path: ListingPath,
    items: [],
    icon: MovieIcon,
  },
  {
    title: 'Chuyên mục tin rao',
    path: ListingCategoryPath,
    items: [],
    icon: RecentActorsIcon,
  },
  {
    title: 'Loại tin rao',
    path: ListingTypePath,
    items: [],
    icon: CategoryIcon,
  },
  {
    title: 'Hướng',
    path: ListingDirectionPath,
    items: [],
    icon: CategoryIcon,
  },
  {
    title: 'Bài viết',
    path: NewsPath,
    items: [],
    icon: PersonIcon,
  },
  {
    title: 'Chuyên mục bài viết',
    path: NewsCategoryPath,
    items: [],
    icon: AdUnitsIcon,
  },
  {
    title: 'Khu vực',
    path: RegionsPath,
    items: [],
    icon: AdUnitsIcon,
  },
  {
    title: 'Quận/Huyện',
    path: DistrictsPath,
    items: [],
    icon: AdUnitsIcon,
  },
  {
    title: 'Phường/Xã',
    path: WardsPath,
    items: [],
    icon: AdUnitsIcon,
  },
  {
    title: 'Người dùng',
    path: UsersPath,
    items: [],
    icon: PersonIcon,
  },
  {
    title: 'Đăng xuất',
    path: logOut,
    items: [],
    icon: LogoutIcon,
  },
];
