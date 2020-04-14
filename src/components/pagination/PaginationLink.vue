<template lang="pug">
    router-link(
        v-if="link"
        :to="link"
        class="pagination-link"
    )
        slot
    span(
        v-else
        class="pagination-link pagination-link_state_disabled"
    )
        slot
</template>

<script>
export default {
    props: {
        link: {
            type: Object,
            default: null,
        },
    },
}
</script>

<style lang="scss">
    .pagination-link {
        &:link, &:active, &:visited {
            color: #ffffff;
            text-decoration: none;
        }

        &:hover:not(.pagination-link_state_disabled) {
            color: #cccccc;
        }

        &.pagination-link_state_disabled {
            color: #888888;
        }
    }
</style>