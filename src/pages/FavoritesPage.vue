<template lang="pug">
    works-grid(
        :loader="loader"
        :getter="getter"
    )
</template>

<script>
import WorksGrid from '../components/WorksGrid';
import LoadFavoriteWorks from '../components/loaders/LoadFavoriteWorks';
import GetFavoriteWorkIds from '../components/getters/GetFavoriteWorkIds';


export default {
    components: {
        WorksGrid,
    },
    data() {
        return {
            loader: LoadFavoriteWorks,
            getter: GetFavoriteWorkIds,
        };
    },
}
</script>