<template lang="pug">
    get-work(:work-id="workId")
        template(#default="{ work }")
            article.work-card(
                v-if="work"
                @click.stop="clickHandler"
                :title="work.title"
            )
                smart-image.work-card__picture(:source="work.primaryimageurl")
                .work-card__content
                    header.work-card__title {{cutTitle(work.title)}}
                    work-card-like-button.work-card__like(:work-id="workId")
</template>

<script>
import GetWork from '../getters/GetWork';
import SmartImage from '../smart-image/SmartImage';
import WorkCardLikeButton from './WorkCardLikeButton';

import RootModalBus from '../root-modals/RootModalsBus';


export default {
    components: {
        GetWork,
        SmartImage,
        WorkCardLikeButton,
    },
    props: {
        workId: {
            type: String,
            default: null,
        },
    },
    methods: {
        cutTitle(title) {
            const maxLength = 35;

            if(title.length > maxLength) {
                return title.slice(0, maxLength - 3).trim() + '...';
            }
            return title;
        },
        clickHandler() {
            this.showPopup();
        },
        showPopup() {
            RootModalBus.$emit('show-work-card-popup', {
                workId: this.workId,
            });
        },
    },
}
</script>

<style lang="scss">
    .work-card {
        border-radius: 5px;
        position: relative;
        overflow: hidden;

        &::before {
            content: "";
            display: block;
            padding-bottom: 100%;
        }
    }

    .work-card__picture, .work-card__content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .work-card__picture {
        background: rgba(0, 0, 0, 0.75);
    }

    .work-card__content {
        padding: 10px;
        color: #ffffff;

        display: flex;
        flex-flow: column nowrap;

        box-sizing: border-box;
    }

    .work-card__title {
        font-weight: 600;
        margin: 0 auto auto;
        text-shadow: 1px 1px 2px rgba(35, 35, 35, 0.65);
    }

    .work-card__like {
        margin: auto 0 0 auto;
        display: none;
        opacity: 0;
    }

    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .work-card:hover {
        .work-card__like {
            display: block;
            animation: show 0.5s forwards;
        }
    }
</style>