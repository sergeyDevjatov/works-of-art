<template lang="pug">
    nav.pagination
        pagination-link.pagination__link(
            v-for="{ link, text } in links"
            :key="text"
            :link="link"
        ) {{text}}
</template>

<script>
import PaginationLink from './PaginationLink';


export default {
    components: {
        PaginationLink,
    },
    props: {
        routeName: {
            type: String,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        pagesCount: {
            type: Number,
            default: 1,
        },
    },
    computed: {
        links() {
            return [
                this.makeLinkObject(this.getPageByName('prev'), 'Prev'),
                {
                    text: '...',
                },
                this.makeLinkObject(this.currentPage),
                {
                    text: '...',
                },
                this.makeLinkObject(this.getPageByName('next'), 'Next'),
            ];
        },
    },
    methods: {
        isPageAvailable(page) {
            return page > 0 && page <= this.pagesCount;
        },
        makeLinkObject(page, text = page) {
            const isAvailable = this.isPageAvailable(page);
            console.log('isAvailable', isAvailable, page)
            return {
                link: isAvailable
                    ? this.getLinkForPage(page)
                    : null,
                text,
            };
        },
        getPageByName(pageName) {
            switch(pageName) {
                case 'prev':
                    return this.currentPage - 1;
                case 'next':
                    return this.currentPage + 1;
            }
            throw new Error('Unknown page name');
        },
        getLinkForPage(page) {
            return {
                name: this.routeName,
                params: {
                    page,
                },
            };
        },
    },
}
</script>

<style lang="scss">
    .pagination {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    }

    .pagination__link {
        display: inline-block;
        & + & {
            margin-left: 6px;
        }
    }
</style>