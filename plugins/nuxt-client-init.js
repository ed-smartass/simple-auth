export default async ({ $axios, store }) => {
    if (store.getters['user/isLogged']) {
        $axios.setToken(store.getters['user/token'], 'Bearer')
    }
}