const mongoose = require('mongoose')

const connectionURL = 'mongodb+srv://spartanbooks:spartanbooks@cluster0-el8x1.mongodb.net/test'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(console.log("connected to db")).catch((err) => {
    console.log(err)
})