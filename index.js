const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const bookRouter = require('./routers/book')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/user', userRouter)
app.use('/book', bookRouter)


app.listen(port, () => {
    console.log('server is up on port ' + port)
})