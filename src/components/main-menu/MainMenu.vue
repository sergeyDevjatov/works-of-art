<template lang="pug">
    nav.main-menu
        h1.main-menu__title Works of art
        router-link.main-menu__item(
            v-for="{ link, text } in links"
            :key="text"
            :to="link"
        ) {{text}}
            
</template>

<script>
export default {
    data() {
        return {
            links: [
                {
                    link: {
                        name: 'main',
                    },
                    text: 'Main',
                },
                {
                    link: {
                        name: 'favorites',
                    },
                    text: 'Favorite works',
                },
            ],
        };
    },
}
</script>

<style lang="scss">
    .main-menu {
        display: flex;
        flex-flow: row nowrap;
        background: #222222;
    }

    .main-menu__title {
        font-weight: bold;
        color: #eeeeee;
        margin: 15px 10px;
        cursor: default;

        & + .main-menu__item {
            margin-left: auto;
        }
    }

    .main-menu__item {
        white-space: nowrap;
        padding: 8px 25px 10px;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;

        &:link {
            text-decoration: none;
        }

        &:link, &:visited {
            color: #ffffff;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    }
</style>