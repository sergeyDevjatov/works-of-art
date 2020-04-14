export const worksModuleTypes = {
    namespace: 'works',
    actions: {
        ADD_WORKS: 'ADD_WORKS',
    },
    mutations: {
        SET_WORKS: 'SET_WORKS',
    },
    getters: {
        GET_WORK_BY_ID: 'GET_WORK_BY_ID',
    },
};


export default {
    namespaced: true,
    state: {
        works: {
        },
    },
    actions: {
        [worksModuleTypes.actions.ADD_WORKS] ({ state, commit }, {
            works,
        }) {
            const nextWorks = {...state.works};

            for(let work of works) {
                nextWorks[work.objectnumber] = work;
            }

            commit(worksModuleTypes.mutations.SET_WORKS, {
                works: nextWorks,
            });
        }
    },
    mutations: {
        [worksModuleTypes.mutations.SET_WORKS] (state, {
            works
        }) {
            state.works = works;
        },
    },
    getters: {
        [worksModuleTypes.getters.GET_WORK_BY_ID]: state => id =>
            state.works[id] ?? null,
    },
}