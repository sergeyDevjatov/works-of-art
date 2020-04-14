<template lang="pug">
    works-grid(
        :loader="loader"
        :loader-props="propsWithPage"
        :getter="getter"
        :getter-props="propsWithPage"
    )
        template(#pagination)
            pagination(
                route-name="main"
                :current-page="page"
                :pages-count="totalPagesCount"
            )
</template>

<script>
import WorksGrid from '../components/WorksGrid';
import Pagination from '../components/pagination/Pagination';
import LoadWorksFeed from '../components/loaders/LoadWorksFeed';
import GetFeedWorkIds from '../components/getters/GetFeedWorkIds';
import { mapGetters } from 'vuex';
import { worksFeedModuleTypes } from '../store/modules/worksFeed';


export default {
    components: {
        WorksGrid,
        Pagination,
    },
    data() {
        return {
            loader: LoadWorksFeed,
            getter: GetFeedWorkIds,
        };
    },
    computed: {
        ...mapGetters(worksFeedModuleTypes.namespace, {
           totalPagesCount: worksFeedModuleTypes.getters.TOTAL_PAGES_COUNT, 
        }),
        page() {
            return Number.parseInt(this.$route.params.page ?? 1);
        },
        propsWithPage() {
            return {
                page: this.page,
            };
        },
    },
}
</script>