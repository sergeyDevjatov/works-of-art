<script>
import { mapGetters } from 'vuex';

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
    computed: {
        ...mapGetters(worksFeedModuleTypes.namespace, {
            getWorkIds: worksFeedModuleTypes.getters.GET_WORK_IDS,
        }),
        workIds() {
            return this.getWorkIds(this.page);
        },
        scope() {
            return {
                workIds: this.workIds,
            };
        },
    },
}
</script>