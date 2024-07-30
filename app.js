//Requires
body_parser = require('body-parser')
const express = require('express')
const calendar = require('./API/api.js')
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
        res.send(create_calendar_for_day(1,1,1)) //Cambiar
    })  

    app.get('/api/week', (req, res) => {
        res.send(create_calendar_for_week(1,1,1)) //Cambiar
    })

    app.get('/api/month', (req, res) => {
        res.send(create_calendar_for_month(1,1,1)) //Cambiar
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

    function create_calendar_for_month(month, year) {
        let res = ''
        let days_in_the_month = 
        console.log(info_sobre_calendario)
        /*
    let cantidad_de_dias = info_sobre_calendario["cantidad_de_dias_del_mes"]
    let cantidad_de_dias_del_mes_anterior = info_sobre_calendario["cantidad_de_dias_del_mes_anterior"]
    let cuantas_filas_ocupa_el_mes = info_sobre_calendario["cuantas_filas_ocupa_el_mes"]
    let cuando_cae_1er_dia = info_sobre_calendario["cuando_cae_1er_dia"]
    let numero_de_dia_puesto_en_calendario = 1
    let se_completo_los_dias_del_mes = false
    inner_table_html = '<tr>\n \
                    <th>LUN</th>\n \
                    <th>MAR</th>\n \
                    <th>MIE</th>\n \
                    <th>JUE</th>\n \
                    <th>VIE</th>\n \
                    <th>SAB</th>\n \
                    <th>DOM</th>\n \
                </tr>'  //Se van a agregar las 7 * 6 filas, cada una con su respectivo ID, así como clase

    for (let i = 0; i < 6; i++) {//Las 6 filas agregando 
        inner_table_html += '<tr>'
        for(let k = 0; k < 7; k++) { //los 7 días de la semana
            if (cuando_cae_1er_dia === 0) {
                inner_table_html += '<td>' + numero_de_dia_puesto_en_calendario + '</td>\n'
                numero_de_dia_puesto_en_calendario += 1
            } else if(se_completo_los_dias_del_mes === true) {
                inner_table_html += '<td>' + numero_de_dia_puesto_en_calendario + '</td>\n'
                numero_de_dia_puesto_en_calendario += 1
            }
            else  {
                inner_table_html += '<td>' + (cantidad_de_dias_del_mes_anterior - cuando_cae_1er_dia) + '</td>\n'
                cuando_cae_1er_dia -= 1
            }
            if (numero_de_dia_puesto_en_calendario > cantidad_de_dias) {
                se_completo_los_dias_del_mes = true
                numero_de_dia_puesto_en_calendario = 1
            }
            
        }
    inner_table_html += '</tr>'
    }
    */
        return res
    }

    function create_calendar_for_week(week, month, year) {
        let res = ''

        return res
    }

    function create_calendar_for_day(day, month, year) {
        let res = ''

        return res
    }