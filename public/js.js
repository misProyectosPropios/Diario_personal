/**
 * @param String name
 * @return String
 */

var id_information_left_panel = 'information'


var id_information_left_panel = 'information'

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getParameters() {
    return location.href.slice(location.href.indexOf('?'))
}

function getURL() {
    return location.href.slice(0, location.href.indexOf('?'))
}

function getPathname() {
    const url = new URL(location.href)
    console.log(url.pathname)
    return url.pathname;
}

async function call_API(path, parameters) {
    let res
    await fetch(path + parameters)
    .then(response => response.text())
    .then(response => {
        console.log("Se devuelve respose " + response)
        res = response
        console.log("Res ahora es: " +res)
    })
    return res
}

/*
async function call_API_post(path, parameters) {
    let answer
    var data = new FormData();
    data.append( "json", JSON.stringify( parameters ) );

    fetch(path,
    {
        method: "POST",
        body: data
    })
    .then(function(res){ console.log(res); })
    //.then(function(data){ alert( JSON.stringify( data ) ) })
}
    */

window.onload = async function() {
    if (getPathname() === '/month') {
        let res = await call_API('/api/month', getParameters())
        console.log(res)
        document.getElementById('calendar').innerHTML = res
        document.getElementById(id_information_left_panel).innerHTML = create_information_to_panel(0,getParameterByName('month'), getParameterByName('year'))
    } 
    else if (getPathname() === '/week') {
        let res = await call_API('/api/week', getParameters())
        console.log(res)
        document.getElementById('calendar').innerHTML = res
        document.getElementById(id_information_left_panel).innerHTML = create_information_to_panel(0,getParameterByName('month'), getParameterByName('year'))
        console.log(create_selection_mode())
    }
    else if (getPathname() === '/day') {
        let res = await call_API('/api/day', getParameters())
        console.log(res)
        document.getElementById('calendar').innerHTML = res
        document.getElementById(id_information_left_panel).innerHTML = create_information_to_panel(getParameterByName('day'),getParameterByName('month'), getParameterByName('year'))
    }
    let date = new Date()
    //document.getElementById(id_information_left_panel).innerHTML += create_selection_mode(date.getFullYear())
    document.getElementById(id_information_left_panel).innerHTML += create_buttons_to_move_forward_and_back()
}





function create_information_to_panel(day, month, year) {
    let res = ''
    if (day !== 0) {
        res += '<li class="informacion kenit-regular">Day/Week: ' + day + '</li> \n'
    }
    res += '<li class="informacion kenit-regular">Month:' + month + '</li> \n'
    res += '<li class="informacion kenit-regular">Year: ' + year + '</li> \n'
    console.log(res)
    return res
}


function create_buttons_to_move_forward_and_back() {
    let res = '<h3>MOVE</h3>                         \
                <button onclick="moveBack()"><-</button>               \
                <button onclick="moveNext()">-></button>'
    return res
}

async function moveBack() {
    if (getPathname() === '/month') {
        let previous_month, previous_year
        let month = getParameterByName('month'), year = getParameterByName('year')
        if (month === '1') {
            previous_month = 12
            previous_year = year - 1
        } else {
            previous_month = month - 1
            previous_year = year
        }
        location.href = getURL() + "?month=" + previous_month + "&year=" + previous_year
    } else if (getPathname() === '/week') {
        console.log("ESTAMOS EN WEEK")
        let previous_month, previous_year, previous_week
        let month = getParameterByName('month'), year = getParameterByName('year'), week = getParameterByName('week')
        if (month === '1' && week === '1') {
            previous_year = year - 1
            previous_month = 12
            let parameters = "?month=" + previous_month + "&year=" + year
            previous_week = await call_API('/api/how_many_rows_take', parameters)
            when_is_last_day_of_month = await call_API('/api/when_is_last_day', parameters)
            if (when_is_last_day_of_month !=='6') {
                previous_week = parseInt(previous_week) - 1
            }
        }
        else if(week === '1') {
            previous_year = year
            previous_month = month - 1
            let parameters = "?month=" + previous_month + "&year=" + year
            previous_week = await call_API('/api/how_many_rows_take', parameters)
            when_is_last_day_of_month = await call_API('/api/when_is_last_day', parameters)
            if (when_is_last_day_of_month !=='6') {
                previous_week = parseInt(previous_week) - 1
            }
        } else {
            previous_year = year
            previous_month = month
            previous_week = week - 1
        }
        location.href = getURL() + "?month=" + previous_month + "&year=" + previous_year + "&week=" + previous_week
    } else if (getPathname() === '/day') {
        console.log("Estamos en day")
        let previous_month, previous_year, previous_day
        let month = getParameterByName('month'), year = getParameterByName('year'), day = getParameterByName('day')
        if (month === '1' && day === '1') {
            previous_day = 31
            previous_month = 12
            previous_year = year - 1
        } else if (day === '1') {
            previous_month = month - 1
            previous_year = year
            let parameters = '?month=' + previous_month + "&year=" + previous_year
            let cant_days = await call_API('/api/how_many_days_have_a_month', parameters)
            
            previous_day = cant_days
        } else {
            previous_day = day - 1
            previous_month = month
            previous_year = year
        }
        location.href = getURL() + "?month=" + previous_month + "&year=" + previous_year + "&day=" + previous_day
    }   
}

async function moveNext() {
    if (getPathname() === '/month') {
        let next_month, next_year
        let month = getParameterByName('month'), year = getParameterByName('year')
        if (month === '12') {
            next_month = 1
            next_year = parseInt(year) + 1
        } else {
            next_month = parseInt(month) + 1
            next_year = year
        }
        location.href = getURL() + "?month=" + next_month + "&year=" + next_year
    } else if (getPathname() === '/week') {
        console.log("ESTAMOS EN WEEK")
        let next_month, next_year, next_week
        let month = getParameterByName('month'), year = getParameterByName('year'), week = getParameterByName('week')
        let parameters = "?month=" + month + "&year=" + year
        how_many_weeks_has = await call_API('/api/how_many_rows_take', parameters)
        let when_is_last_day_of_month = await call_API('/api/when_is_last_day', parameters)
        if (month === '12' && week === how_many_weeks_has) {
            next_year = parseInt(year) + 1
            next_month = 1
            next_week = 1
        } else if(when_is_last_day_of_month !== 6 && parseInt(week) === parseInt(how_many_weeks_has) - 1) {
            next_year = year
            next_month = parseInt(month) + 1
            next_week = 1   
        } else if (week > how_many_weeks_has) {
            next_year = year
            next_month = parseInt(month) + 1
            next_week = 1 
        }else {
            next_year = year
            next_month = month
            next_week = parseInt(week) + 1
        }
        location.href = getURL() + "?month=" + next_month + "&year=" + next_year + "&week=" + next_week
    } else if (getPathname() === '/day') {
        console.log("Estamos en day")
        let next_month, next_year, next_day
        let month = getParameterByName('month'), year = getParameterByName('year'), day = getParameterByName('day')
        let parameters = "?month=" + month + "&year=" + year
        let how_many_days_have_a_month = await call_API('/api/how_many_rows_take', parameters)
        
        if (month === '12' && day === '31') {
            next_day = 1
            next_month = 1
            next_year = parseInt(year) + 1
        } else if (day === how_many_days_have_a_month) {
            next_month = parseInt(month) + 1
            next_year = year
            next_day = 1
        } else {
            next_day = parseInt(day) + 1
            next_month = month
            next_year = year
        }
        location.href = getURL() + "?month=" + next_month + "&year=" + next_year + "&day=" + next_day
    }   
    console.log("DE PENDEJO TE SIGO")
}

function create_selection_mode(year) {
    /*
    let res =  '<h3>SELECT FORM OF DATA</h3>                                 \
                <form>                                                       \
                    <p><input type="radio" name="type_of_day">DAY   </p>     \
                    <p><input type="radio" name="type_of_day">WEEK  </p>     \
                    <p><input type="radio" name="type_of_day">MONTH </p>     \
                    <br/>                                                    \
                    <select name="days" id="selection_days">                 \
                    </select>                                                \
                    <input type="number" value="' + year + '"/>                                  \
                    </select>                                                \
                    <select name="months" id="months">                       '

    for(let i = 1; i <= 12; i++) {
        res += '<option value="' + i + '">' + i + '</option>'
    }

    res += '        </select> \
                </form>'
                */
    return ''
}


function create_information_to_panel(day, month, year) {
    let res = ''
    if (day !== 0) {
        res += '<li class="informacion kenit-regular">Day: ' + day + '</li> \n'
    }
    res += '<li class="informacion kenit-regular">Month:' + month + '</li> \n'
    res += '<li class="informacion kenit-regular">Year: ' + year + '</li> \n'
    console.log(res)
    return res
}