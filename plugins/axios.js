export default async ({ $axios, redirect }) => {
    $axios.onError(error => {
        if (error.response && error.response.status === 401) {
            redirect('/user/login')
        }
    })
}