document.addEventListener("DOMContentLoaded", function() {
	let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'December'];
	let weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'fryday', 'saturday', 'sunday'];
	let weekDaysShort = ['Mo', 'Tu', 'We', 'Th', 'Tr', 'Sa', 'So'];
	let view = 1;
	let date = new Date();
	let today = new Date();

	function getMonthDays(year, month) {
		let tempDate = new Date(year, month + 1, 0);
		return tempDate.getDate();
	}

	function getStartDay(year, month) {
		let tempDate = new Date(year, month, 1);
		return tempDate.getDay();
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

	function buildCalendar(tempDate, today) {
		let calendarGrid = document.getElementById('calendar-grid');
		let weekDaysGrid = document.getElementById('table-container');
		document.getElementById('table-container').style.display = 'block';
		let startDate = getStartDay(tempDate.getFullYear(), tempDate.getMonth());
		if (startDate == 0) {
			startDate = 7;
		}
    let weekStart = 6;// 0 - Sun, 1 - Mo ... 6 - Sa
		let amountOfDays = getMonthDays(tempDate.getFullYear(), tempDate.getMonth());
		let amountOfDaysPrevMonth = getMonthDays(tempDate.getFullYear(), tempDate.getMonth() + 1);
		let amountOfRows = getAmountOfRows(startDate, amountOfDays);
		let weekDayTbl = document.createElement('table');
    weekDayTbl.id = 'days';
		let weekDayTr = document.createElement('tr');
    if(weekStart == 0) {
      weekStart = 7
    }
    weekStart -= 1;
		for (let i = 0; i < 7; i++) {
			let weekDayTd = document.createElement('td');
      let count = i + weekStart;
      if (count >= 7) {
        count -= 7;
      }
			weekDayTd.innerHTML = weekDaysShort[count];
			weekDayTr.appendChild(weekDayTd);
		}
    console.log(startDate + weekStart - 6);
		weekDayTbl.appendChild(weekDayTr);
		let tbl = document.createElement('table');
		tbl.style.width = '100%';
		for (let i = 0; i <= amountOfRows; i++) {
			let tr = document.createElement('tr');
			for (let x = 1; x <= 7; x++) {
				var td = document.createElement('td');
				dayNumber = x + 7 * (i - 1) - startDate + weekStart + 1;
				td.className = 'dateField';
				if (dayNumber > amountOfDays) {
					dayNumber = dayNumber - amountOfDays;
					td.className = 'new-month not-from-this-month dateField';
				} else if (dayNumber < 1) {
					dayNumber = amountOfDaysPrevMonth + dayNumber;
					td.className = 'old-month not-from-this-month dateField';
				}
				if (today.getFullYear() == tempDate.getFullYear() && today.getMonth() == tempDate.getMonth() && today.getDate() == dayNumber && !(hasClass(td, 'new-month')) && !(hasClass(td, 'old-month'))) {
					td.className = 'today dateField';
				}
				td.innerHTML = dayNumber;
				tr.appendChild(td);
			}
			tbl.appendChild(tr);
		}
    weekDaysGrid.innerHTML = '';
		weekDaysGrid.appendChild(weekDayTbl);
		calendarGrid.innerHTML = '';
		calendarGrid.appendChild(tbl);
		monthYearTitle = monthNames[tempDate.getMonth()] + ' ' + tempDate.getFullYear();
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

	function showMonthsOverview(tempYear) {
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
		document.getElementById('month-year').innerHTML = tempYear;
		view = 2;
		let monthButton = document.getElementsByClassName('monthButton');
		for (let count = 0; count < monthButton.length; count++) {
			let button = monthButton[count];
			button.addEventListener('click', function() {
				date = new Date(tempYear, count, 1);
				buildCalendar(date, today);
			});
		}
		console.log(date.getFullYear());
	}

	function showYearsOverview(year) {
		let yearDigits = year.toString().split('');
		if (yearDigits[3] == 0) {
			yearDigits[3] = 10;
		}
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

	function showCenturyOverview(year) {
		let yearDigits = year.toString().split('');
		if (yearDigits[2] == 0 && yearDigits[3] == 0) {
			yearDigits[2] = 10;
			console.log('asdf');
		}
		let endyear = year + (100 - (yearDigits[2] + yearDigits[3]));
		console.log(yearDigits[2] + yearDigits[3]);
		let startyear = endyear - 99;
		tbl = document.createElement('table');
		for (let i = 0; i < 5; i++) {
			tr = document.createElement('tr');
			for (let x = 0; x < 2; x++) {
				td = document.createElement('td');
				td.className = 'centuryButton';
				let tempYear = +(startyear) + x * 10 + 20 * i
				let tempEndYear = tempYear + 9;
				td.innerHTML = tempYear + ' - ' + tempEndYear;
				tr.appendChild(td);
			}
			tbl.appendChild(tr);
		}
		document.getElementById('table-container').style.display = 'none';
		calendarGrid = document.getElementById('calendar-grid');
		calendarGrid.innerHTML = '';
		calendarGrid.appendChild(tbl);
		document.getElementById('month-year').innerHTML = startyear + ' - ' + endyear;
		view = 4;
		let yearButton = document.getElementsByClassName('centuryButton');
		for (let count = 0; count < yearButton.length; count++) {
			let button = yearButton[count];
			button.addEventListener('click', function() {
				let buttonContent = button.innerHTML.split('');
				let year = buttonContent[0] * 100 + buttonContent[1] * 10 + buttonContent[2] * 1 + buttonContent[3];
				console.log(year);
				showYearsOverview(+(year));
			});
		}
	}

	buildCalendar(date, today);
	let nextButton = document.getElementById('next');
	let prevButton = document.getElementById('prev');
	let overviewButton = document.getElementById('month-year')
	let dayButton = document.getElementsByClassName('dayButton');
	let monthButton = document.getElementsByClassName('monthButton');
	let centuryButton = document.getElementsByClassName('centuryButton');
	nextButton.addEventListener('click', function() {
		if (view == 1) {
			date.setMonth(date.getMonth() + 1);
			buildCalendar(date, today);
		}
		if (view == 2) {
			date.setFullYear(date.getFullYear() + 1);
			showMonthsOverview(date.getFullYear());
		}
		if (view == 3) {
			date.setFullYear(date.getFullYear() + 10);
			showYearsOverview(date.getFullYear());
		}
		if (view == 4) {
			date.setFullYear(date.getFullYear() + 100);
			showCenturyOverview(date.getFullYear());
		}
	});
	prevButton.addEventListener('click', function() {
		if (view == 1) {
			date.setMonth(date.getMonth() - 1);
			buildCalendar(date, today);
		}
		if (view == 2) {
			date.setFullYear(date.getFullYear() - 1);
			showMonthsOverview(date.getFullYear());
		}
		if (view == 3) {
			date.setFullYear(date.getFullYear() - 10);
			showYearsOverview(date.getFullYear());
		}
		if (view == 4) {
			date.setFullYear(date.getFullYear() - 100);
			showCenturyOverview(date.getFullYear());
		}
	});
	overviewButton.addEventListener('click', function() {
		if (view == 1) {
			showMonthsOverview(date.getFullYear());
		} else if (view == 2) {
			showYearsOverview(date.getFullYear());
		} else if (view == 3) {
			showCenturyOverview(date.getFullYear());
		}

	});
});
