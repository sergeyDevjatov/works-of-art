<template lang="pug">
    img.smart-image(:src="finalSource")
</template>

<script>
import loadingImage from '../../assets/loading.svg';
import stubImage from '../../assets/picture.svg';


export default {
    props: {
        source: {
            type: String,
            default: null,
        },
    },
    watch: {
        source: {
            immediate: true,
            async handler(source) {
                if(!source) {
                    this.finalSource = stubImage;
                    return;
                }
                this.finalSource = loadingImage;
                const image = new Image();

                setTimeout(() => image.src = source, 0);
                
                try {
                    await new Promise((resolve, reject) => {
                        image.onload = resolve;
                        image.onerror = reject; 
                    });

                    this.finalSource = source;
                } catch (error) {
                    this.finalSource = stubImage;
                }
            },
        },
    },
    data() {
        return {
            finalSource: null,
        };
    },
}
</script>

<style lang="scss">
    .image-with-stub {

    }
</style>