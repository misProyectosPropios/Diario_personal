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
    document.getElementById(id_information_left_panel).innerHTML += create_selection_mode()
    document.getElementById(id_information_left_panel).innerHTML += create_buttons_to_move_forward_and_back()
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

function create_selection_mode() {
    let res =  '<form>              \
                    <input type="radio" name="type_of_day">DAY        \
                    <input type="radio" name="type_of_day">MONTH      \
                    <input type="radio" name="type_of_day">YEAR       \
                </form>'
    return res
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

function create_buttons_to_move_forward_and_back() {
    let res = '<h3>MOVE</h3>                         \
                <button><-</button>               \
                <button>-></button>'
    return res
}


function create_selection_mode() {
    let res =  '<h3>SELECT FORM OF DATA</h3>                                 \
                <form>                                                       \
                    <p><input type="radio" name="type_of_day">DAY   </p>     \
                    <p><input type="radio" name="type_of_day">MONTH </p>     \
                    <p><input type="radio" name="type_of_day">YEAR  </p>     \
                </form>'
    return res
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