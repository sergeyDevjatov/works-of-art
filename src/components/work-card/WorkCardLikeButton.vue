<template lang="pug">
    span.material-icons.work-card-like-button(
        @click.stop="clickHandler"
    ) favorite{{isFavorite ? '' : '_border'}}
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { favoriteWorksModuleTypes } from '../../store/modules/favoriteWorks';


export default {
    props: {
        workId: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters(favoriteWorksModuleTypes.namespace, {
            isWorkFavorite: favoriteWorksModuleTypes.getters.IS_WORK_FAVORITE,
        }),
        isFavorite() {
            return this.isWorkFavorite(this.workId);
        },
    },
    methods: {
        ...mapActions(favoriteWorksModuleTypes.namespace, {
            toggleFavoriteWork: favoriteWorksModuleTypes.actions.TOGGLE_FAVORITE_WORK,
        }),
        clickHandler() {
            this.toggleFavoriteWork({
                id: this.workId,
            });
        },
    },
}
</script>

<style lang="scss">
    .work-card-like-button {
        cursor: pointer;
        user-select: none;
    }
</style>