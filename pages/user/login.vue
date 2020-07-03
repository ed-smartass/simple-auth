<template>
    <v-layout column>
        <v-breadcrumbs :items="breadcrumbs"/>
        <v-row>
            <v-col xs="12" sm="8" md="6" lg="5" xl="4"
                class="mx-auto">
                <v-form @submit.prevent="onSubmit"
                    v-model="valid">
                    <v-text-field v-model="form.login"
                        label="Логин"
                        required
                        append-icon="mdi-account"
                        :error="!!errors.login"
                        :error-messages="!!errors.login ? [errors.login] : []"
                        @input="$set(errors, 'login', '')"/>
                    <v-text-field v-model="form.password"
                        label="Пароль"
                        required
                        append-icon="mdi-lock"
                        :error="!!errors.password"
                        :error-messages="!!errors.password ? [errors.password] : []"
                        @input="$set(errors, 'password', '')"/>
                    <v-checkbox v-model="form.rememberMe"
                        label="Запомнить"/>
                    <v-row>
                        <v-col md="8" class="mx-auto">
                            <v-btn color="primary" block dark large
                                type="submit">Войти</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    middleware: [
        'guest'
    ],
    data: function() {
        return {
            breadcrumbs: [
                { text: 'Главная', to: '/', disabled: false },
                { text: 'Профиль', to: '/user', disabled: false },
                { text: 'Войти', to: '/user/login', disabled: true },
            ],
            valid: false,
            form: {
                login: '',
                password: '',
                rememberMe: true
            },
            errors: {}
        }
    },
    methods: {
        ...mapActions('user', {
            login: 'login'
        }),
        onSubmit: async function() {
            try {
                this.errors = {}
                await this.login(this.form)
                this.$router.push('/user')
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    console.log(error.response.data)
                    error.response.data.forEach(error => {
                        this.$set(this.errors, error.field, error.message)
                    })
                } else {
                    throw error
                }
            }
        }
    }
}
</script>