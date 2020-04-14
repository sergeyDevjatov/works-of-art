<script>
import { mapGetters } from 'vuex';

import RenderLessMixin from '../mixins/RenderLessMixin';

import { worksModuleTypes } from '../../store/modules/works';


export default {
    mixins: [
        RenderLessMixin,
    ],
    props: {
        workId: {
            type: String,
            default: null,
        },
    },
    computed: {
        ...mapGetters(worksModuleTypes.namespace, {
            getWorkById: worksModuleTypes.getters.GET_WORK_BY_ID,
        }),
        work() {
            if(!this.workId) {
                return null;
            }
            return this.getWorkById(this.workId);
        },
        scope() {
            return {
                work: this.work,
            };
        },
    },
}
</script>