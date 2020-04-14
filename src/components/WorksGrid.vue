<template lang="pug">
    component(
        :is="loader"
        v-bind="loaderProps"
    )
        component(
            :is="getter"
            v-bind="getterProps"
        )
            template(#default="{ workIds }")
                .works-grid
                    .works-grid__grid
                        work-card(
                            v-for="id in workIds"
                            :key="id"
                            :work-id="id"
                        )
                    .works-grid__pagination(v-if="$slots.pagination")
                        slot(name="pagination")
</template>

<script>
import WorkCard from './work-card/WorkCard';


export default {
    props: {
        loader: {
            type: [ Object, Function ],
            required: true,
        },
        loaderProps: {
            type: Object,
            default: null,
        },
        getter: {
            type: [ Object, Function ],
            required: true,
        },
        getterProps: {
            type: Object,
            default: null,
        },
    },
    components: {
        WorkCard,
    },
    computed: {
    },
}
</script>

<style lang="scss">
    .works-grid {
        padding: 10px;
    }

    .works-grid__grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 5px;
    }

    .works-grid__pagination {
        display: flex;

        justify-content: center;
        margin: 15px auto 10px;
    }
</style>