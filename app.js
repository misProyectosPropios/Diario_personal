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
        redirect_with_parameters('/month', res) 
    })

    app.get('/day', (req, res) => {
        //Look if it has the parameters neded, else redirect to the actual day
        if (has_parameter_on_URL(req, 'day') && has_parameter_on_URL(req, 'month') && has_parameter_on_URL(req, 'year')) {
            res.sendFile(__dirname + '/views/calendar.html')
        } else {
            redirect_with_parameters('/day', res)
        }
     
     
    })

    app.get('/week', (req, res) => {
        //Look if it has the parameters neded, else redirect to the actual week
        if (has_parameter_on_URL(req, 'week') && has_parameter_on_URL(req, 'month') && has_parameter_on_URL(req, 'year')) {
            res.sendFile(__dirname + '/views/calendar.html')
        } else {
            redirect_with_parameters('/day', res)
        }
    })

    app.get('/month', (req, res) => {
        //Fijarse si tiene parametros: sino tiene, redireccionarlo al mes actual
        if (has_parameter_on_URL(req, 'month') && has_parameter_on_URL(req, 'year')) {
            res.sendFile(__dirname + '/views/calendar.html')
        } else {
            redirect_with_parameters('/day', res)
        }
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

    app.get('/api/day', (req, res) => {
        res.json({})
    })

    app.get('/api/week', (req, res) => {
        res.json({})
    })

    app.get('/api/month', (req, res) => {
        res.json({"hola" : "hola"})
    })

//FUNCTIONS

    function redirect_with_parameters(path, res) {
        let parameters;
        if (path === '/day') {
            parameters = create_parameters_to_send(true, false, true, true)
        } 
        else if (path === '/week') {
            parameters = create_parameters_to_send(false, true, true, true)
        }
        else if (path === '/month') {
            parameters = create_parameters_to_send(false, false, true, true)
        }
        else {
            res.status(404).send("404 PATH NOT FOUND")
        }
        res.redirect(path + parameters)
    }

    //The parameters should be booleans to indicate if this parameters should be included
    //It returns with the actual date
    //Month is always true and year too
    function create_parameters_to_send(day, week, month, year) {
        let date = new Date()
        let res = '?'
        if (month === true) {
            let month_number  = date.getMonth() + 1
            res += "month=" + (month_number)
        }
        if (year === true) {
            res += "&year=" + date.getFullYear()
        }
        if (day === true) {
            res += "&day=" + date.getDate();
        }
        if (week === true) {
            res += "&week" + date.get_week(date.getDate(), date.getDay()); //For calculte this, I need another function, fron congruency and that
        }
        return res
    }

    

    function has_parameter_on_URL(req, parameter_name) {
        let res = true
        if (req.query[parameter_name] === undefined) {
            res = false
        } 
        return res
    }