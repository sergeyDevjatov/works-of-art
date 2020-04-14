export const favoriteWorksModuleTypes = {
    namespace: 'favoriteWorks',
    actions: {
        LOAD_FAVORITE_WORKS: 'LOAD_FAVORITE_WORKS',
        ADD_FAVORITE_WORK: 'ADD_FAVORITE_WORK',
        REMOVE_FAVORITE_WORK: 'REMOVE_FAVORITE_WORK',
        TOGGLE_FAVORITE_WORK: 'TOGGLE_FAVORITE_WORK',
    },
    mutations: {
        SET_FAVORITE_WORK_IDS: 'SET_FAVORITE_WORK_IDS',
    },
    getters: {
        FAVORITE_WORK_IDS: 'FAVORITE_WORK_IDS',
        IS_WORK_FAVORITE: 'IS_WORK_FAVORITE',
    },
};

const FAVORITE_WORK_IDS_STORAGE_FIELD_NAME =
    `${process.env.VUE_APP_STORAGE_NAMESPACE}.favoriteWorkIds`;

const storage = {
    loadFavoriteWorkIds() {
        return JSON.parse(localStorage.getItem(FAVORITE_WORK_IDS_STORAGE_FIELD_NAME)) ?? [];
    },
    saveFavoriteWorkIds(ids) {
        return localStorage.setItem(FAVORITE_WORK_IDS_STORAGE_FIELD_NAME, JSON.stringify(ids ?? []));
    },
}

export default {
    namespaced: true,
    state: {
        favoriteWorkIds: null,
    },
    actions: {
        [favoriteWorksModuleTypes.actions.LOAD_FAVORITE_WORKS] ({ commit }) {
            const favoriteWorkIds = storage.loadFavoriteWorkIds();

            commit(favoriteWorksModuleTypes.mutations.SET_FAVORITE_WORK_IDS, {
                favoriteWorkIds,
            });
        },
        [favoriteWorksModuleTypes.actions.TOGGLE_FAVORITE_WORK] ({ getters, dispatch }, {
            id,
        }) {
            const isFavorite = getters[favoriteWorksModuleTypes.getters.IS_WORK_FAVORITE](id);

            const action = isFavorite
                ? favoriteWorksModuleTypes.actions.REMOVE_FAVORITE_WORK
                : favoriteWorksModuleTypes.actions.ADD_FAVORITE_WORK

            dispatch(action, {
                id,
            });
        },
        [favoriteWorksModuleTypes.actions.ADD_FAVORITE_WORK] ({ state, commit, dispatch }, {
            id,
        }) {
            if(!state.favoriteWorkIds) {
                dispatch(favoriteWorksModuleTypes.actions.LOAD_FAVORITE_WORKS);
            }

            if(state.favoriteWorkIds.includes(id)) {
                return;
            }
            
            const favoriteWorkIds = state.favoriteWorkIds.concat(id);

            commit(favoriteWorksModuleTypes.mutations.SET_FAVORITE_WORK_IDS, {
                favoriteWorkIds,
            });

            storage.saveFavoriteWorkIds(favoriteWorkIds);
        },
        [favoriteWorksModuleTypes.actions.REMOVE_FAVORITE_WORK] ({ state, commit, dispatch }, {
            id,
        }) {
            if(!state.favoriteWorkIds) {
                dispatch(favoriteWorksModuleTypes.actions.LOAD_FAVORITE_WORKS);
            }

            const foundIndex = state.favoriteWorkIds.indexOf(id);

            if(foundIndex === -1) {
                return;
            }

            const favoriteWorkIds = state.favoriteWorkIds.slice(0);

            favoriteWorkIds.splice(foundIndex, 1);

            commit(favoriteWorksModuleTypes.mutations.SET_FAVORITE_WORK_IDS, {
                favoriteWorkIds,
            });

            storage.saveFavoriteWorkIds(favoriteWorkIds);
        },
    },
    mutations: {
        [favoriteWorksModuleTypes.mutations.SET_FAVORITE_WORK_IDS] (state, {
            favoriteWorkIds,
        }) {
            state.favoriteWorkIds = favoriteWorkIds;
        },
    },
    getters: {
        [favoriteWorksModuleTypes.getters.FAVORITE_WORK_IDS]: state => state.favoriteWorkIds ?? [],
        [favoriteWorksModuleTypes.getters.IS_WORK_FAVORITE]: state => id =>
            state.favoriteWorkIds
                ? state.favoriteWorkIds.includes(id)
                : false,
    },
}