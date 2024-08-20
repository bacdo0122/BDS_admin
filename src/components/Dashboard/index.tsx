import * as React from 'react';
import {styled, Box, BoxProps} from '@mui/material'
import {cards} from '../../consts/cards'
import { CardItem } from './cardItem';
import { useAppSelector } from 'stores/hook';
import PriceChart from '../common/chart';
 
const Container = styled(Box)<BoxProps>({
    display: "flex",
    justifyContent: "space-between",
    alignItem: "flex-start",
    flexDirection: 'column',
    width: "100%",
    flex: "1"
})
export const Dashboard  = () => {
  const listing = useAppSelector((state:any)=>state.films.films);
  const users = useAppSelector((state:any)=>state.user.users);
  const news = useAppSelector((state:any)=>state.news.News);
  const title = ["Tổng số tin rao", "Tổng số người dùng", 'Tổng số tin rao cho thuê', 'Tổng số tin rao bán',
    'Tổng số bài viết','Tổng số tin rao được duyệt']
  const [views, setViews] = React.useState({
    total_bds: 0,
    total_users: 0,
    total_bds_rent: 0,
    total_bds_sell: 0,
    total_news: 0,
    total_bds_done: 0,
  })
  const date = React.useMemo(() => {
    if(listing && Array(listing)){
     return [...listing].sort((a: any, b: any) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime()).map((item:any) => {
        return {date: item.createAt, price: Number(item.price)}
      })
     } else return []
  }, [listing])
  React.useMemo(()=>{
    if(listing){
      setViews({
        total_bds: listing.length ?? 0,
        total_bds_sell: [...listing].filter((item:any) => {
          if(item.type.length > 0){
                  return item.type[0]?.name === 'sell'
          }
          return null;
      })?.length,
        total_bds_rent: [...listing].filter((item:any) => {
          if(item.type.length > 0){
                  return item.type[0]?.name === 'rent'
          }
          return null;
      })?.length,
        total_users: users?.length ?? 0,
        total_news: news?.length ?? 0,
        total_bds_done: [...listing].filter(item => item.status !== 'pending').length ?? 0,
      })
    }
  },[listing, users, news])
  return (
    <Container>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px'}}>
      {Object.keys(views).map((item: string, index) =>{
        return <CardItem key={index} title ={title[index]} number={Object.values(views)[index]} />
     })}
      </div>
      <div className="chart-container" style={{width: "100%", height: '700px'}}>
       <PriceChart data={date && date} />

      </div>
    </Container>
  );
}
