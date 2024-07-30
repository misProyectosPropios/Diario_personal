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

function getURL() {
    return location.href.slice(0, location.href.indexOf('?'))
}

function getPathname() {
    const url = new URL(location.href)
    console.log(url.pathname)
    return url.pathname;
}
window.onload = function() {
    if (getPathname() === '/month') {
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
