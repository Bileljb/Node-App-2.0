const express = require("express")
const fs = require("fs")
const ejs = require("ejs")
const path = require("path")
const app = express()
const port = 3000
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create', (req, res) => {
    const { name, country, profession, gender, skills } = req.body
    const newData = { name, country, profession, gender, skills: Array.isArray(skills) ? skills : [skills] }
    fs.readFile(path.join(__dirname, 'public', 'users.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send('Server Error')
            return
        }
        const usersData = data ? JSON.parse(data) : []
        usersData.push(newData)
        fs.writeFile(path.join(__dirname, 'public', 'users.json'), JSON.stringify(usersData, null, 2), (err) => {
            if (err) {
                console.error(err)
                res.status(500).send('Server Error')
                return
            }
        })
    })

    res.redirect('/create')
})

app.get('/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'users.json'),'utf8', (err,data)=>{
        if(err){
            console.error(err)
            res.status(500).send('Server Error')
            return
        }
        const usersData = data? JSON.parse(data) : []
        res.render('data', {data: usersData})
    })
    
})




app.listen(port, console.log(`Server is listerning on port ${port}`))
