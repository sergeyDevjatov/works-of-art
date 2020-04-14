<template lang="pug">
    transition(name="fade")
        .popup(v-if="show")
            .popup__overlay(@click.stop="$emit('update:show', false)")
            transition(name="scale")
                template(v-if="show")
                    slot(content-class="popup__content")
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        show: {
            immediate: true,
            handler(show) {
                const classListMethodName = show
                    ? 'add'
                    : 'remove';

                const clientWidthBefore = document.documentElement.clientWidth;
                document.documentElement.classList[classListMethodName]('scroll-disabled');
                if(show) {
                    const clientWidthAfter = document.documentElement.clientWidth;
                    const paddingInsteadOfScrollbar = (clientWidthAfter - clientWidthBefore) + 'px';

                    document.body.style.paddingRight = paddingInsteadOfScrollbar;
                } else {
                    document.body.style.paddingRight = null;
                }
            },
        },
    },
}
</script>

<style lang="scss">
    .popup {
        position: fixed;
        display: flex;
    }

    .popup__overlay {
        position: absolute;
        background: rgba(0, 0, 0, 0.35);
    }

    .popup, .popup__overlay {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .popup__content {
        position: relative;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .scale-enter-active, .scale-leave-active {
        transition: transform .3s;
    }

    .scale-enter, .scale-leave-to {
        transform: scale(0);
    }
</style>