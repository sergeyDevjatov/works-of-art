export default {
    computed: {
        scope() {
            return null;
        },
    },
    render() {
        if(!this.scope) {
            return this.$slots.default && this.$slots.default[0];
        }
        return this.$scopedSlots.default && this.$scopedSlots.default(this.scope);
    },
}