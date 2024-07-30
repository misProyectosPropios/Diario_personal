/**
 * @param String name
 * @return String
 */
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
    fetch(path + parameters)
    .then(response => console.log(response))
}

window.onload = function() {
    if (getPathname() === '/month') {
        call_API('/api/month', getParameters())
        document.getElementById('calendar').innerHTML = 'Hola'
        //alert("month")
    } 
    else if (getPathname() === '/week') {
        //alert('week')
    }
    else if (getPathname() === '/day') {
        //alert('day')
    }
}
