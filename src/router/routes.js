import MainPage from '../pages/MainPage';
import FavoritesPage from '../pages/FavoritesPage';


export default [
    {
        path: '/:page?',
        name: 'main',
        component: MainPage,
    },
    {
        path: '/favorites/:page?',
        name: 'favorites',
        component: FavoritesPage,
    },
];