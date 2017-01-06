document.addEventListener("DOMContentLoaded", function() {
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
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'December'];
        let calendarGrid = document.getElementById('calendar-grid');
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
                if (today.getMonth() == date.getMonth() && today.getDate() == dayNumber && !(hasClass(td, 'new-month')) && !(hasClass(td, 'old-month'))) {
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

        let dateFields = document.getElementsByClassName('dateField');
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
    nextButton.addEventListener('click', function() {
        date.setMonth(date.getMonth() + 1);
        buildCalendar(date, today);
    });
    prevButton.addEventListener('click', function() {
        date.setMonth(date.getMonth() - 1);
        buildCalendar(date, today);
    });
});
