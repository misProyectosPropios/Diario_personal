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
    let res
    await fetch(path + parameters)
    .then(response => response.text())
    .then(response => {
        console.log("Se devuelve respose " + response)
        res = response
        console.log("Res ahora es: " +res)
        return "VAMOS RACING"
    })
    return res
}

window.onload = async function() {
    if (getPathname() === '/month') {
        let res = await call_API('/api/month', getParameters())
        console.log(res)
        document.getElementById('calendar').innerHTML = res
        //alert("month")
    } 
    else if (getPathname() === '/week') {
        let res = await call_API('/api/week', getParameters())
        console.log(res)
        document.getElementById('calendar').innerHTML = res
        //alert('week')
    }
    else if (getPathname() === '/day') {
        let res = await call_API('/api/day', getParameters())
        console.log(res)
        document.getElementById('calendar').innerHTML = res
        //alert('day')
    }
}
