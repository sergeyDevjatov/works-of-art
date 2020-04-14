<template lang="pug">
    article.work-card-popup-content(v-if="work")
        smart-image.work-card-popup-content__picture(:source="work.primaryimageurl")
        .work-card-popup-content__content
            header.work-card-popup-content__title {{work.title}}
            work-card-popup-content-field.work-card-popup-content__field(
                label="Work number"
            ) {{work.objectnumber}}
            work-card-popup-content-field.work-card-popup-content__field(
                v-if="people"
                label="People"
            ) {{people}}
            work-card-popup-content-field.work-card-popup-content__field(
                v-if="work.dated"
                label="Dated"
            ) {{work.dated}}
            work-card-popup-content-field.work-card-popup-content__field(
                v-if="work.century"
                label="Century"
            ) {{work.century}}
</template>

<script>
import SmartImage from '../../smart-image/SmartImage';
import WorkCardPopupContentField from './WorkCardPopupContentField';


export default {
    components: {
        SmartImage,
        WorkCardPopupContentField,
    },
    props: {
        work: {
            type: Object,
            default: null,
        },
    },
    computed: {
        people() {
            return this.work?.people
                ?.map(({ name }) => name)
                .join(', ') ?? null;
        },
    },
}
</script>

<style lang="scss">
    .work-card-popup-content {
        background: white;

        border-radius: 10px;

        display: flex;
        flex-flow: column nowrap;

        width: 70%;
        margin: auto;
    }

    .work-card-popup-content__title {
        font-size: 1.5rem;

        font-weight: 600;

        text-align: left;
    }

    .work-card-popup-content__picture {
        width: 100%;
        background: rgba(0, 0, 0, 0.75);

        max-height: 40vh;
        object-fit: cover;

        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }

    .work-card-popup-content__content {
        padding: 10px;
    }
</style>