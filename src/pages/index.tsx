import { Dashboard } from 'components/Dashboard';
import React from 'react';
import { useAppSelector } from 'stores/hook';
import { HeaderCommon } from '../components/Header/common'
import {Table} from '../components/common/table'
import {columns} from "../consts/table"
const Home = () => {
  return <>
    <HeaderCommon title="Thống kê" >
      <Dashboard /> 
    </HeaderCommon>
  </>;
};

export default Home;
