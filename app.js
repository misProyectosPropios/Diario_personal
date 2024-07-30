//Requires
body_parser = require('body-parser')
const express = require('express')

//Creation of the server
const app = express()
const port = 3000

//Middleware
    app.use(body_parser.urlencoded({ extended: false })) //Para poder acceder a los parametros con POST, por medio del req.body[nombre_del-parametro]

    app.use(express.static('public')) //Para enviar el archivo js.js, el css y las imagines

    app.use(function middleware(req, res, next) {
        console.log(req.method + " " + req.path + " - " + req.ip + " - " + req.url)
        console.log()
        next()
    }) 

//URL's paths
    app.get('/', (req, res) => {
        //Redireccionarlo al mes actual
        res.sendFile(__dirname + '/views/calendar.html')
    })

    app.get('/day', (req, res) => {
     //Look if it has the parameters neded, else redirect to the actual day
     res.sendFile(__dirname + '/views/calendar.html')
    })

    app.get('/week', (req, res) => {
        //Look if it has the parameters neded, else redirect to the actual week
        res.sendFile(__dirname + '/views/calendar.html')
    })

    app.get('/mes', (req, res) => {
        //Fijarse si tiene parametros: sino tiene, redireccionarlo al mes actual
        res.sendFile(__dirname + '/views/calendar.html')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

    app.post('/api/day', (req, res) => {
        res.json({})
    })

    app.post('/api/week', (req, res) => {
        res.json({})
    })

    app.post('/api/month', (req, res) => {
        res.json({})
    })

//FUNCTIONS


    function redirect_with_parameters(path, res) {
        if (path === '/day') {

        } 
        else if (path === '/week') {

        }
        else if (path === '/month') {

        }
    }

    function has_parameter_on_URL(req, parameter_name) {
        let res = true
        if (req.query[parameter_name] === undefined) {
            res = false
        } 
        return res
    }