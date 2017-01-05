/*
What I have to do to:

Build Table with:

*/
document.addEventListener("DOMContentLoaded", function() {
    let getMonthDays = function(year, month) {
        let date = new Date(year, month + 1, 0);
        return date.getDate();
    }

    let getStartDay = function(year, month) {
        let date = new Date(year, month, 1);
        return date.getDay();
    }

    let getAmountOfRows = function(startDate, amountOfDays) {
        if (((startDate == 7 || startDate == 6) && amountOfDays == 31) || (startDate == 7 && amountOfDays >= 30)) {
            return 6;
        } else {
            return 5;
        }
    }
    function hasClass( elem, klass ) {
     return (" " + elem.className + " " ).indexOf( " "+klass+" " ) > -1;
    }

    let date = new Date();
    let today = new Date();
    let calendarGrid = document.getElementById('calendar-grid');
    let startDate = getStartDay(date.getFullYear(), date.getMonth());
    if(startDate == 0) {
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
            if(dayNumber > amountOfDays){
                dayNumber = dayNumber - amountOfDays;
                td.className = 'new-month not-from-this-month';
            }else if(dayNumber < 1) {
                dayNumber = amountOfDaysPrevMonth + dayNumber;
                td.className = 'old-month not-from-this-month';
            }
            if(today.getMonth() == date.getMonth() && today.getDate() == dayNumber && !(hasClass(td, 'new-month')) && !(hasClass(td, 'old-month'))) {
                td.className = 'today';
            }
            td.innerHTML = dayNumber;
            tr.appendChild(td);
        }
        tblbody.appendChild(tr);
    }
    tbl.appendChild(tblbody);
    alert(tbl.innerHTML);
    calendarGrid.innerHTML = '';
    calendarGrid.appendChild(tbl);
});
