document.addEventListener("DOMContentLoaded", function() {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'December'];
    let view = 1;
    function getMonthDays(year, month) {
        let date = new Date(year, month + 1, 0);
        return date.getDate();
    }

    function getStartDay(year, month) {
        let date = new Date(year, month, 1);
        return date.getDay();
    }

    function getAmountOfRows(startDate, amountOfDays) {
        if (((startDate == 7 || startDate == 6) && amountOfDays == 31) || (startDate == 7 && amountOfDays >= 30)) {
            return 6;
        } else {
            return 5;
        }
    }

    function hasClass(elem, klass) {
        return (" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
    }

    function getDatePickerInput() {
        date = document.getElementById('datepicker');
    }

    function buildCalendar(date, today) {
        let calendarGrid = document.getElementById('calendar-grid');
        document.getElementById('table-container').style.display = 'block';
        let startDate = getStartDay(date.getFullYear(), date.getMonth());
        if (startDate == 0) {
            startDate = 7;
        }
        let amountOfDays = getMonthDays(date.getFullYear(), date.getMonth());
        let amountOfDaysPrevMonth = getMonthDays(date.getFullYear(), date.getMonth() + 1);
        let amountOfRows = getAmountOfRows(startDate, amountOfDays);
        let tbl = document.createElement('table');
        tbl.style.width = '100%';
        let tblbody = document.createElement('tbody');
        for (let i = 1; i <= amountOfRows; i++) {
            let tr = document.createElement('tr');
            for (let x = 1; x <= 7; x++) {
                var td = document.createElement('td');
                dayNumber = x + 7 * (i - 1) - startDate + 1;
                td.className = 'dateField';
                if (dayNumber > amountOfDays) {
                    dayNumber = dayNumber - amountOfDays;
                    td.className = 'new-month not-from-this-month dateField';
                } else if (dayNumber < 1) {
                    dayNumber = amountOfDaysPrevMonth + dayNumber;
                    td.className = 'old-month not-from-this-month dateField';
                }
                if (today.getFullYear == date.getFullYear && today.getMonth() == date.getMonth() && today.getDate() == dayNumber && !(hasClass(td, 'new-month')) && !(hasClass(td, 'old-month'))) {
                    td.className = 'today dateField';
                }
                td.innerHTML = dayNumber;
                tr.appendChild(td);
            }
            tblbody.appendChild(tr);
        }
        tbl.appendChild(tblbody);
        calendarGrid.innerHTML = '';
        calendarGrid.appendChild(tbl);
        monthYearTitle = monthNames[date.getMonth()] + ' ' + date.getFullYear();
        document.getElementById('month-year').innerHTML = monthYearTitle;
        view = 1;

        /*let dateFields = document.getElementsByClassName('dateField');
        for (let count = 0; count < dateFields.length; count++) {
            dateField = dateFields[count];
            console.log(dateFields.item(count));
            console.log(dateFields[count]);
            dateField.addEventListener('click', function() {
                if (hasClass(this, 'marked')) {
                    this.className = 'dateField'
                } else {
                    this.className = 'marked dateField';
                }
            });
        }
        */
    }

    function showMonthsOverview(year) {
        tbl = document.createElement('table');
        for (let i = 0; i < 4; i++) {
            tr = document.createElement('tr');
            for (let x = 0; x < 3; x++) {
                td = document.createElement('td');
                td.innerHTML = monthNames[x + 3 * i];
                td.className = 'monthButton';
                tr.appendChild(td);
            }
            tbl.appendChild(tr);
        }
        document.getElementById('table-container').style.display = 'none';
        calendarGrid = document.getElementById('calendar-grid');
        calendarGrid.innerHTML = '';
        calendarGrid.appendChild(tbl);
        document.getElementById('month-year').innerHTML = year;
        view = 2;
        let monthButton = document.getElementsByClassName('monthButton');
        for (let count = 0; count < monthButton.length; count++) {
            let button = monthButton[count];
            button.addEventListener('click', function() {
              let newDate = new Date(year, count, 1);
              let today = new Date();
              console.log(newDate);
              buildCalendar(newDate, today);
            });
        }
    }
    function showYearsOverview(year){
      let yearDigits = year.toString().split('');
      let endyear = year + (10 - yearDigits[3]);
      let startyear = endyear - 9;
      tbl = document.createElement('table');
      for (let i = 0; i < 5; i++) {
        tr = document.createElement('tr');
        for (let x = 0; x < 2; x++) {
          td = document.createElement('td');
          td.className = 'yearButton';
          td.innerHTML = startyear + x + 2 * i;
          tr.appendChild(td);
        }
        tbl.appendChild(tr);
      }
      document.getElementById('table-container').style.display = 'none';
      calendarGrid = document.getElementById('calendar-grid');
      calendarGrid.innerHTML = '';
      calendarGrid.appendChild(tbl);
      document.getElementById('month-year').innerHTML = startyear + ' - ' + endyear;
      view = 3;
      let yearButton = document.getElementsByClassName('yearButton');
      for (let count = 0; count < yearButton.length; count++) {
          let button = yearButton[count];
          button.addEventListener('click', function() {
            showMonthsOverview(+(button.innerHTML));
          });
      }
    }

    let date = new Date();
    let datepicker = document.getElementById('datepicker');
    let today = new Date();
    datepicker.onchange = function() {
        date = new Date(datepicker.value);
        buildCalendar(date, today);
    }
    buildCalendar(date, today);
    let nextButton = document.getElementById('next');
    let prevButton = document.getElementById('prev');
    let overviewButton = document.getElementById('month-year')
    let dayButton = document.getElementsByClassName('dayButton');
    let monthButton = document.getElementsByClassName('monthButton');
    let centuryButton = document.getElementsByClassName('centuryButton');
    nextButton.addEventListener('click', function() {
        date.setMonth(date.getMonth() + 1);
        buildCalendar(date, today);
    });
    prevButton.addEventListener('click', function() {
      if(view == 1){
        date.setMonth(date.getMonth() - 1);
        buildCalendar(date, today);
      }
    });
    overviewButton.addEventListener('click', function() {
      if(view == 1){
        showMonthsOverview(date.getFullYear());
      }
      else if(view == 2){
        showYearsOverview(date.getFullYear());
      }

    });
});
