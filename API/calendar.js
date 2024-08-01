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
  return days
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

function get_week(day, month, year) {
  let res = []
  semanas_en_mes = get_all_weeks_of_month(month, year)
  semanas_en_mes.forEach(array_de_fechas => {
    if (day >= array_de_fechas[0] && day <= array_de_fechas[1]) {
      res = array_de_fechas
      console.log(array_de_fechas)
    }
  })
  if (res.length === 0) {
    res = semanas_en_mes[semanas_en_mes.length - 1]
    console.log(res)
  }
  return res
}

function get_number_of_week(week, month, year) {
  semanas_en_mes = get_all_weeks_of_month(month, year)
  return semanas_en_mes[week - 1]
}

function get_all_weeks_of_month(month, year) {
  let res = []
  let previous_month, previous_year, days_on_previous_month
  let next_month, next_year, days_on_next_month
  let cuando_cae_primer_dia = day_of_a_particular_date(1 ,month, year)
  let days_on_month = how_many_days_have_a_month(month, year)
  if (month === 1) {
    previous_month = 12
    previous_year = year - 1
  } else {
    previous_month = month - 1
    previous_year = year
  }

  if (cuando_cae_primer_dia !== 0) {
    days_on_previous_month = how_many_days_have_a_month(previous_month, previous_year)
    days_on_previous_month = days_on_previous_month - cuando_cae_primer_dia
    cuando_cae_primer_dia = 7 - cuando_cae_primer_dia
    res.push([])
    res[res.length - 1].push(days_on_previous_month + 1)
    res[res.length - 1].push(cuando_cae_primer_dia)
  }
  while(cuando_cae_primer_dia + 7 <= days_on_month) {
    res.push([])
    res[res.length - 1].push(cuando_cae_primer_dia + 1)
    res[res.length - 1].push(cuando_cae_primer_dia + 7)
    cuando_cae_primer_dia += 7
  }

  if (cuando_cae_primer_dia + 7 >= days_on_month && cuando_cae_primer_dia != days_on_month) {
    res.push([])
    res[res.length - 1].push(cuando_cae_primer_dia + 1)
    res[res.length - 1].push(cuando_cae_primer_dia + 7 - days_on_month)
  }
  return res
}

module.exports = {
  is_leap_year,
  how_many_days_have_a_month,
  day_of_a_particular_date,
  get_week,
  get_number_of_week
}