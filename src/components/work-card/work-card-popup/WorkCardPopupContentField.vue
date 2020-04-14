<template lang="pug">
    p.work-card-popup-content-field
        span.work-card-popup-content-field__label {{label}}
        span.work-card-popup-content-field__value
            slot
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss">
    .work-card-popup-content-field {
        display: flex;
        flex-direction: column;

        align-items: flex-start;
    }

    .work-card-popup-content-field__label {
        font-size: 0.8em;
        color: #777777;
    }

    .work-card-popup-content-field__value {
        font-size: 1em;
        color: #222222;
    }
</style>