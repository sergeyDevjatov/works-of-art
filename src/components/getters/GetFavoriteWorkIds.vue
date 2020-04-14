<script>
import { mapGetters } from 'vuex';

import RenderLessMixin from '../mixins/RenderLessMixin';

import { favoriteWorksModuleTypes } from '../../store/modules/favoriteWorks';


export default {
    mixins: [
        RenderLessMixin,
    ],
    computed: {
        ...mapGetters(favoriteWorksModuleTypes.namespace, {
            favoriteWorkIds: favoriteWorksModuleTypes.getters.FAVORITE_WORK_IDS,
        }),
        scope() {
            return {
                workIds: this.favoriteWorkIds.slice(0).reverse(),
            };
        },
    },
}
</script>