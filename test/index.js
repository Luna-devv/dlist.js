const { Client } = require('../dist')

const client = new Client({
    token: 'a'
})

console.log(client.getToken())