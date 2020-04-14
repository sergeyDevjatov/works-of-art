import api from "../../api/api";
import { worksModuleTypes } from "./works";



export const worksFeedModuleTypes = {
    namespace: 'worksFeed',
    actions: {
        FETCH_WORKS: 'FETCH_WORKS',
        UPDATE_PAGE: 'UPDATE_PAGE',
    },
    mutations: {
        SET_PAGES: 'SET_PAGES',
        SET_TOTAL_PAGES_COUNT: 'SET_TOTAL_PAGES_COUNT',
    },
    getters: {
        GET_WORK_IDS: 'GET_WORK_IDS',
        TOTAL_PAGES_COUNT: 'TOTAL_PAGES_COUNT',
    },
};

export const PAGE_STATUSES = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

export default {
    namespaced: true,
    state: {
        pages: {

        },
        totalPagesCount: 0,
    },
    actions: {
        async [worksFeedModuleTypes.actions.FETCH_WORKS]({ state, commit, dispatch }, {
            page,
        }) {
            if (state.pages[page] && state.pages[page].status !== PAGE_STATUSES.ERROR) {
                return;
            }
            try {
                dispatch(worksFeedModuleTypes.actions.UPDATE_PAGE, {
                    page,
                    status: PAGE_STATUSES.LOADING,
                });
                const response = await api.loadWorks({
                    page,
                });
                const works = response.data.records;

                commit(worksFeedModuleTypes.mutations.SET_TOTAL_PAGES_COUNT, {
                    totalPagesCount: response.data.info.pages,
                });

                dispatch(worksFeedModuleTypes.actions.UPDATE_PAGE, {
                    page,
                    status: PAGE_STATUSES.SUCCESS,
                    workIds: works.map(({ objectnumber }) => objectnumber),
                });
                dispatch(worksModuleTypes.namespace + '/' + worksModuleTypes.actions.ADD_WORKS, {
                    works,
                }, {
                    root: true,
                })
            } catch (error) {
                dispatch(worksFeedModuleTypes.actions.UPDATE_PAGE, {
                    page,
                    status: PAGE_STATUSES.ERROR,
                    error: error.message,
                });
            }
        },
        [worksFeedModuleTypes.actions.UPDATE_PAGE]({ state, commit }, {
            page,
            status,
            workIds,
            error,
        }) {
            if (!status) {
                throw new Error('Status must be providen');
            }

            const pages = {
                ...state.pages,
                [page]: {
                    status: status ?? state.pages[page]?.status,
                    workIds: workIds ?? state.pages[page]?.workIds ?? [],
                    error: error ?? state.pages[page]?.error ?? null,
                },
            };

            commit(worksFeedModuleTypes.mutations.SET_PAGES, {
                pages,
            });
        },
    },
    mutations: {
        [worksFeedModuleTypes.mutations.SET_PAGES](state, {
            pages,
        }) {
            state.pages = pages;
        },
        [worksFeedModuleTypes.mutations.SET_TOTAL_PAGES_COUNT](state, {
            totalPagesCount,
        }) {
            state.totalPagesCount = totalPagesCount;
        },
    },
    getters: {
        [worksFeedModuleTypes.getters.GET_WORK_IDS]: state => page =>
            state.pages[page]?.workIds ?? [],
        [worksFeedModuleTypes.getters.TOTAL_PAGES_COUNT]: state => state.totalPagesCount,
    },
}