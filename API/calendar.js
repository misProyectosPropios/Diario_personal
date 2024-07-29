var number_of_days_in_a_month = {
    1  : 31,
    2  : 28, //Si no es año bisiesto
    3  : 31,
    4  : 30,
    5  : 31,
    6  : 30,
    7  : 31,
    8  : 31,
    9  : 30,
    10 : 31,
    11 : 30,
    12 : 31,
  }

function is_leap_year(year) {
    let bis;
    if (year % 4 != 0) {
      bis = false
    }
    else if (year % 100 != 0) {
      bis = true
    }
    else if (year % 400 != 0) {
      bis = false
    } else {
      bis = true
    }
    return bis
}

function how_many_days_have_a_month(month, year) {

}

function day_when_the_1st_day_is_of_a_month(month, year) {

}

function move_n_numbers_modulo_x(number_to_return, number_to_add, modulo) {

}