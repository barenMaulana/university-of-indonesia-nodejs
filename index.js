import express from 'express'
import body_parser from 'body-parser'
import university_routes from './src/routes/university.js'

const app = express()
const version = '/api/v1'
const port = 3000

app.use(body_parser.json())
app.use(`${version}/universities`,university_routes)

app.listen(3000,() => {
    console.log(`app ready on port ${port}`)
})