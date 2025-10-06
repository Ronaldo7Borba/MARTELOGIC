import express from 'express'
import { request } from 'http'

const app = express()

app.get('/usuario', (req, res) =>{
    res.send('OK, ok')
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta http://localhost:3000');
});

