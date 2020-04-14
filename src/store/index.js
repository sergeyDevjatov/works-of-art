import Vue from 'vue';
import Vuex from 'vuex';

import works from './modules/works';
import worksFeed from './modules/worksFeed';
import favoriteWorks from './modules/favoriteWorks';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        works,
        worksFeed,
        favoriteWorks,
    },
});