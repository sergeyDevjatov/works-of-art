<template lang="pug">
    .root-modals
        work-card-popup(
            :show.sync="workCardPopup.show"
            :work-id="workCardPopup.workId"
        )
</template>

<script>
import RootModalBus from './RootModalsBus';
import WorkCardPopup from '../work-card/work-card-popup/WorkCardPopup';


export default {
    components: {
        WorkCardPopup,
    },
    data() {
        return {
            handlers: {
                'show-work-card-popup': this.showWorkCardPopupHandler
            },
            workCardPopup: {
                show: false,
                workId: null,
            },
        };
    },
    created() {
        for(let eventName in this.handlers) {
            RootModalBus.$on(eventName, this.handlers[eventName]);
        }
    },
    beforeDestroy() {
        for(let eventName in this.handlers) {
            RootModalBus.$off(eventName, this.handlers[eventName]);
        }
    },
    methods: {
        showWorkCardPopupHandler({ workId }) {
            this.workCardPopup = {
                show: true,
                workId,
            };
        },
    },
}
</script>

<style lang="scss">
    .root-modals {
        position: absolute;
        width: 0;
        height: 0;
        z-index: 2;
    }
</style>