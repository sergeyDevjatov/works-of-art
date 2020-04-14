<template lang="pug">
    get-work(:work-id="workId")
        template(#default="{ work }")
            popup(
                v-if="work"
                :show="show"
                @update:show="$emit('update:show', $event)"
            )
                template(#default="{contentClass}")
                    work-card-popup-content(
                        :class="contentClass"
                        :work="work"
                    )

</template>

<script>
import GetWork from '../../getters/GetWork';
import Popup from '../../popup/Popup';
import WorkCardPopupContent from './WorkCardPopupContent';


export default {
    components: {
        Popup,
        GetWork,
        WorkCardPopupContent,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        workId: {
            type: String,
            default: null,
        },
    },
}
</script>

<style lang="scss">

</style>