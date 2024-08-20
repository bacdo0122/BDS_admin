import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'reducers/auth';
import filmReducer from 'reducers/Film';
import actorReducer from 'reducers/actor';
import categoryReducer from 'reducers/category';
import userReducer from 'reducers/user';
import bannerReducer from 'reducers/banner';
import newsReducer from '../reducers/news';
import newsCategoryReducer from '../reducers/news_category';
import RegionsReducer from '../reducers/regions';
import ReviewsReducer from '../reducers/review';
import DistrictsReducer from '../reducers/district';
import WardsReducer from '../reducers/ward';
import DirectionsReducer from '../reducers/direction';
const store = configureStore({
  reducer: {
    auth: authReducer,
    films: filmReducer,
    actor: actorReducer,
    category: categoryReducer,
    user: userReducer,
    news: newsReducer,
    banner: bannerReducer,
    news_category: newsCategoryReducer,
    region: RegionsReducer,
    review: ReviewsReducer,
    district: DistrictsReducer,
    ward: WardsReducer,
    direction: DirectionsReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;
export default store;
