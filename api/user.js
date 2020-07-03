const USERS = [
    {
        token: 'supatoken1',
        login: 'pavel1337',
        password: '123123',
        profile: {
            first_name: 'Павел',
            last_name: 'Павлов',
            email: 'pavel1337@gmail.com',
            image: '/image1.jpg'
        }
    },
    {
        token: 'supatoken2',
        login: 'dmitry123',
        password: 'password',
        profile: {
            first_name: 'Дмитрий',
            last_name: 'Дибров',
            email: 'dmitry123@gmail.com',
            image: '/image2.jpg'
        }
    }
]

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/login', (req, res) => {
    const login = req.body.login
    const password = req.body.password

    if (!login) {
        res.status(422).send([
            { field: 'login', message: 'Login required.' }
        ])
    } else if (!password) {
        res.status(422).send([
            { field: 'password', message: 'Password required.' }
        ])
    } else {
        const user = USERS.find(user => user.login === login && user.password === password)

        if (user) {
            res.json({
                token: user.token
            })
        } else {
            res.status(422).send([
                { field: 'password', message: 'Wrong login or password.' }
            ])
        }
    }
})

app.get('/profile', (req, res) => {
    const token = req.headers.authorization
    if (token) {
        const user = USERS.find(user => user.token === token)
        if (user) {
            res.json(user.profile)
        } else {
            res.status(401).send('Your request was made with invalid credentials.')
        }
    } else {
        res.status(401).send('Your request was made with invalid credentials.')
    }
})

export default {
    path: '/api/user',
    handler: app
}