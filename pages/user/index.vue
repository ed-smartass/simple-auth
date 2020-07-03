<template>
    <v-layout column>
        <v-breadcrumbs :items="breadcrumbs"/>
        <v-row>
            <v-col xs="12" sm="8" md="6" lg="5" xl="4"
                class="mx-auto">
                <v-card outlined>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1">{{ profile.last_name }} {{ profile.first_name }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-avatar v-if="!!profile.image"
                            size="80" color="grey">
                            <v-img :src="profile.image"/>
                        </v-list-item-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-simple-table class="flex-grow-1 py-4">
                            <tbody>
                                <tr>
                                    <td>Имя:</td>
                                    <td>{{ profile.first_name }}</td>
                                </tr>
                                <tr>
                                    <td>Фамилия:</td>
                                    <td>{{ profile.last_name }}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td><a :href="'mailto:' + profile.email">{{ profile.email }}</a></td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    middleware: [
        'logged'
    ],
    data: function() {
        return {
            breadcrumbs: [
                { text: 'Главная', to: '/', disabled: false },
                { text: 'Профиль', to: '/user', disabled: true },
            ]
        }
    },
    computed: {
        ...mapGetters('user', {
            profile: 'profile'
        })
    }
}
</script>