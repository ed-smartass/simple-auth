<template>
    <v-app>
        <v-app-bar app dense fixed>
            <v-toolbar-title v-text="title"/>
            <v-spacer/>
            <v-btn v-if="isLogged"
                icon
                to="/user">
                <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-btn v-if="isGuest"
                icon
                to="/user/login">
                <v-icon>mdi-login-variant</v-icon>
            </v-btn>
            <v-btn v-if="isLogged"
                icon
                @click="logout">
                <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container>
                <nuxt/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: function() {
        return {
            title: 'Simple auth'
        }
    },
    computed: {
        ...mapGetters('user', {
            isGuest: 'isGuest',
            isLogged: 'isLogged'
        })
    },
    methods: {
        ...mapActions('user', {
            logout: 'logout'
        })
    }
}
</script>
