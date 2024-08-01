//Requires
body_parser = require('body-parser')
const express = require('express')
const calendar = require('./API/calendar.js')
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
            redirect_with_parameters('/week', res)
        }
    })

    app.get('/month', (req, res) => {
        //Fijarse si tiene parametros: sino tiene, redireccionarlo al mes actual
        if (has_parameter_on_URL(req, 'month') && has_parameter_on_URL(req, 'year')) {
            res.sendFile(__dirname + '/views/calendar.html')
        } else {
            redirect_with_parameters('/month', res)
        }
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

    app.get('/api/day', (req, res) => {
        if (has_parameter_on_URL(req, 'day') && has_parameter_on_URL(req, 'month') && has_parameter_on_URL(req, 'year')) {
            let day = req.query['day']
            let month = req.query['month']
            let year = req.query['year']
            if (calendar.is_valid_day_month_and_year(day, month, year)) {
                res.send(create_calendar_for_day(day,month,year))
            } else {
                res.status(404).send("ERROR. ARGUMENTs ARE NOT A VALID DATE")
            }
        } else {
            res.status(404).send("ERROR. NOT NECCESARY ARGUMENTSs")
        }
    })  

    app.get('/api/week', (req, res) => {
        if (has_parameter_on_URL(req, 'week') && has_parameter_on_URL(req, 'month') && has_parameter_on_URL(req, 'year')) {
            let week = req.query['week']
            let month = req.query['month']
            let year = req.query['year']
            console.log(week, month, year)
            if (calendar.is_valid_week_month_and_year(week, month, year)) {
                res.send(create_calendar_for_week(week,month,year))
            } else {
                res.status(404).send("ERROR. ARGUMENTs ARE NOT A VALID DATE")
            }
        } else {
            res.status(404).send("ERROR. NOT NECCESARY ARGUMENTSs")
        }
    })

    app.get('/api/month', (req, res) => {
        if (has_parameter_on_URL(req, 'month') && has_parameter_on_URL(req, 'year')) {
            let month = req.query['month']
            let year = req.query['year']
            if (calendar.is_valid_month_and_year(month, year)) {
                res.send(create_calendar_for_month(month, year))
            } else {
                res.status(404).send("ERROR. ARGUMENTs ARE NOT A VALID DATE")
            }
            
        } else {
            res.status(404).send("ERROR. NOT NECCESARY ARGUMENTSs")
        }
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
            res += "&week=" + calendar.get_number_of_week(date.getDay(), date.getMonth(), date.getFullYear()); //For calculte this, I need another function, fron congruency and that
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
        let days_in_the_month = calendar.how_many_days_have_a_month(month, year)
        let day_of_1st_day = calendar.day_of_a_particular_date(1,month, year)
        //El anterior mes
        if (month === 1) {
            month = 12
            year = year - 1
        } else {
            month = month - 1
        }
        let days_in_the_previous_month = calendar.how_many_days_have_a_month(month, year)
        console.log("La cantidad de dias es: " + days_in_the_previous_month)
        
        let number_written_on_calendar = 1
        let is_over_all_days_of_month = false
        let res ='<tr>\n \
            <th>LUN</th>\n \
            <th>MAR</th>\n \
            <th>MIE</th>\n \
            <th>JUE</th>\n \
            <th>VIE</th>\n \
            <th>SAB</th>\n \
            <th>DOM</th>\n \
            </tr>' //ONE FOR EACH DAY, STARTING FROM MONDAY (LUNES)

        for (let i = 0; i < 6; i++) { //The six rows
            res += '<tr>'
            for(let k = 0; k < 7; k++) { //The 7 columns of the week
                if (day_of_1st_day === 0) {
                    res += '<td>' + number_written_on_calendar + '</td>\n'
                    number_written_on_calendar += 1
                } else if(is_over_all_days_of_month === true) {
                    res += '<td>' + number_written_on_calendar + '</td>\n'
                    number_written_on_calendar += 1
                }
                else  {
                    res += '<td>' + (days_in_the_previous_month - day_of_1st_day + 1) + '</td>\n'
                    day_of_1st_day -= 1
                }
                if (number_written_on_calendar > days_in_the_month) {
                    is_over_all_days_of_month = true
                    number_written_on_calendar = 1
                }
            }
            res += '</tr>'
        }
        return res
    }

    //Week starts at 1, and the maximium is 6
    function create_calendar_for_week(week, month, year) { 
        let res ='<tr>\n \
            <th>LUN</th>\n \
            <th>MAR</th>\n \
            <th>MIE</th>\n \
            <th>JUE</th>\n \
            <th>VIE</th>\n \
            <th>SAB</th>\n \
            <th>DOM</th>\n \
            </tr> \n       \
            <tr> \n'
        let cambiar_variable = false
        let from_day_to_day = calendar.get_week(week, month, year)

        if (from_day_to_day[0] > from_day_to_day[1]) { //It could be 0 or the last one
            let difference_between_days = Math.abs(from_day_to_day[1] - from_day_to_day[0])
            let when_to_change_to_another_month = from_day_to_day[0] + (7 - from_day_to_day[1])
            let day = from_day_to_day[0]
            for(let i = 0, j = 0; i < 7; i++) {
                if (cambiar_variable === false && day >= when_to_change_to_another_month) {
                    day = 1
                    cambiar_variable = true
                }
                res += '\t<td>\n'
                res += '\t\t' + day + "\n"
                res += '\t</td> \n'
                day ++
            }
        } else { //Its on the middle
            let day = from_day_to_day[0]
            for(let i = 0; i < 7; i++) {
                res += '\t<td>\n'
                res += '\t\t' + day + '\n'
                res += '\t</td>\n'
                day++
            }
        }
        res += '</tr>\n'
        return res
    }


    function create_calendar_for_day(day, month, year) {
        let date = convertFromDateToString(calendar.day_of_a_particular_date(day, month, year))
        let res = '<tr>                         \
                        <td>' + date + '</td>   \
                    </tr>                       \
                    <tr>                        \
                        <td>' + day + '</td>    \
                    </tr>' 
        return res
    }

    function convertFromDateToString(date) {
        let res = ''
        switch (date) {
            case 0:
                res = 'LUN'
                break
            case 1:
                res = 'MAR'
                break
            case 2:
                res = 'MIE'
                break
            case 3:
                res = 'JUE'
                break
            case 4:
                res = 'VIE'
                break
            case 5:
                res = 'SAB'
                break
            case 6:
                res = 'DOM'
                break
            default:
                res = undefined
                break;
            
        }
        return res
    }