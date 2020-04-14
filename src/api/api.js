import instance from './instance';


export default {
    loadWorks({ page }) {
        return instance.get('/object', {
            params: {
                size: 20,
                page,
            },
        });
    },
}