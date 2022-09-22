const express = require('express')
const path = require('path')
const app = express()
const port = 8000;

const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../views')

app.set('view engine', 'hbs')
app.set('views', viewPath)

app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {

    })
})


app.listen(port, () => {
    console.log(`Express server running on port: ${port}`)
})
