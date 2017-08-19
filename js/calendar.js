/**
 * Creates A Month Object with the name
 * and all the weeks of the month.
 *
 * @param {Number} monthNumber - the number of the month starting at 0 ex. '0 - January'.
 * @returns {
 *  {name: String, weeks: Week[]}
 * }
 */

let Month = function (monthNumber) {
  const month = moment().month(monthNumber);
  const start = month.clone().startOf('month').week();
  let     end = month.clone().endOf('month').week();
  const weeks = [];

  if (monthNumber === 11) end = moment().weeksInYear() + 1;

  for(let currentWeek = start; currentWeek <= end; currentWeek++){
    week = new Week(monthNumber, currentWeek);
    weeks.push(week);
  }

  return {
    name: month.format("MMMM"),
    weeks: weeks
  };
};

/**
 * Creates a Day Object with date, and inMonth boolean in order to provide more display options.
 *
 * @param {Number} monthNumber - the number of the month starting at 0 ex. '0 - January'.
 * @param {Moment} Day - Moment JS Object.
 *
 * @returns { {date: Number, inMonth: Boolean} }
 */

let Day = function (monthNumber, day) {
  let month = moment().month(monthNumber);

  return {
    date: day.format("D"),
    inMonth: month.isSame(day, 'month')
  };
};

/**
 * Creates a Week Array with all the days in that week.
 * @param {Number} monthNumber - the number of the month starting at 0 ex. '0 - January'.
 * @param {Number} weekNumber - the number of the week in that month.
 * @returns { Day[] }
 */
let Week = function (monthNumber, WeekNumber) {
  let days = [];
  let month = moment().month(monthNumber);
  let week = month.clone().week(WeekNumber);

  // Create a day object for each day of the week
  for(let weekDay = 0; weekDay < 7; weekDay++){
    let day = week.clone().weekday(weekDay);
    
    days.push(new Day(monthNumber, day));
  }

  return days;
};

function buildMonth (month) {
  let monthEl = document.createElement("div");
  monthEl.classList.add('month');

  let monthNameEl = document.createElement("div");
  monthNameEl.classList.add('month-name');
  monthNameEl.textContent = month.name;

  monthEl.appendChild( monthNameEl );

  monthEl.appendChild(
      buildWeekDays(moment.weekdaysShort())
  );

  month.weeks.forEach( (week) => {
    monthEl.appendChild(buildWeek(week));
  });

  return monthEl;
}

function buildWeekDays (weekDays) {
  let weekEl = document.createElement("div");

  weekEl.classList.add('week-days');
  moment.weekdaysShort().forEach( (day) => {
    let dayEl = document.createElement("div");

    dayEl.classList.add('day');
    dayEl.textContent = day;
    weekEl.appendChild(dayEl);
  });

  return weekEl;
}

function buildWeek (week) {
  let weekEl = document.createElement("div");
  weekEl.classList.add('week');

  week.forEach( (day) => {
    let dayEl = document.createElement("div");
    
    if (!day.inMonth) dayEl.classList.add('non-month');

    dayEl.classList.add('day');
    dayEl.textContent = day.date;
    
    weekEl.appendChild(dayEl);
  });

  return weekEl;
}

function displayCalendar (selector) {
  const  calendarEl = document.querySelector(selector);
  const      months = document.createDocumentFragment();
  
  moment.months().forEach(function(monthname, index){
    months.appendChild(buildMonth(new Month(index)));
  });
  calendarEl.appendChild(months);
}

displayCalendar('#calendar');
