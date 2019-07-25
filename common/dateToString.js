let monthsShort = {
  'en': ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
}

let monthsLong = {
  'en': ['January','February','March','April','May','June','July','August','September','October','November','December'],
}

let weekdays = {
  'en': ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
}

export function getMonthAbrv(language, number) {
  return monthsShort[language][number];  
}

export function getMonthName(language, number) {
  return monthsLong[language][number];  
}

export function getWeekdayName(language, number) {
  return weekdays[language][number];  
}