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
  let days
  if (month == 2 && is_leap_year(year)) {
    days = 29
  } else {
    days = number_of_days_in_a_month[month]
  }
  return res
}

function day_of_a_particular_date(day, month, year) {
  let res
  let date = new Date(year, (month - 1), day)
  res = date.getDay()
  res = move_n_numbers_modulo_x(res, -1, 7)
  return res
}

function move_n_numbers_modulo_x(number_to_return, number_to_add, modulo) {
  let res
  number_to_return += number_to_add
  res = number_to_return % modulo;
  if (res < 0) {
    res += modulo
  }
  return res;
}

function get_week(date, day, month, year) {

}

function get_all_weeks_of_month(month, year) {
  let res = []
  cuando_cae_primer_dia = day_of_a_particular_date(1 ,month, year)
  if (cuando_cae_primer_dia !== 0) {

  } 
  return res
}

module.exports = {
  is_leap_year,
  how_many_days_have_a_month,
  day_of_a_particular_date,
  get_week
}