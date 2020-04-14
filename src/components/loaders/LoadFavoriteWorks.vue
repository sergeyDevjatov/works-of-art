<script>
import { mapActions } from 'vuex';

import RenderLessMixin from '../mixins/RenderLessMixin';

import { favoriteWorksModuleTypes } from '../../store/modules/favoriteWorks';


export default {
    mixins: [
        RenderLessMixin,
    ],
    methods: {
        ...mapActions(favoriteWorksModuleTypes.namespace, {
            loadFavoriteWorks: favoriteWorksModuleTypes.actions.LOAD_FAVORITE_WORKS,
        }),
    },
    mounted() {
        this.loadFavoriteWorks();
    },
}
</script>