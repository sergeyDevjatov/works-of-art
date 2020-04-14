<script>
import { mapActions } from 'vuex';

import RenderLessMixin from '../mixins/RenderLessMixin';

import { worksFeedModuleTypes } from '../../store/modules/worksFeed';


export default {
    mixins: [
        RenderLessMixin,
    ],
    props: {
        page: {
            type: Number,
            default: 1,
        },
    },
    watch: {
        page: {
            immediate: true,
            async handler(page) {
                await this.fetchWorks({
                    page,
                });
            },
        },
    },
    methods: {
        ...mapActions(worksFeedModuleTypes.namespace, {
            fetchWorks: worksFeedModuleTypes.actions.FETCH_WORKS,
        }),
    },
}
</script>