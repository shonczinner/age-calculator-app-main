var lens = {'day':2,
            'month':2,
            'year':4}

function padAndTruncateInput(e){
    var value = parseInt(e.currentTarget.value, 10);
    var len = lens[e.currentTarget.className]
    if (isNaN(value)) {
        e.currentTarget.value = '';
    } else {
        e.currentTarget.value = value.toString().padStart(len, '0').slice(-len);
    }
}

// add validation of inputs here
document.querySelectorAll('input[type="text"]').forEach(function(input) {
    input.addEventListener('input', padAndTruncateInput);
});

function computeAge(e){
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight
    const givenDay = document.querySelector('input[type="text"].day').value;
    const givenMonth = document.querySelector('input[type="text"].month').value;
    const givenYear = document.querySelector('input[type="text"].year').value;
    const givenDate = new Date(givenYear,givenMonth-1,givenDay)
    givenDate.setHours(0, 0, 0, 0); // Set time to midnight
    const interval = dateFns.intervalToDuration({
        start: givenDate,
        end: currentDate
      });
    insertAge(interval.days,interval.months,interval.years)
}

function insertAge(day,month,year){
    document.querySelector('#result-days').innerHTML = day
    document.querySelector('#result-months').innerHTML = month
    document.querySelector('#result-years').innerHTML = year
}

// add validation of dates here
document.querySelector('#calculate-age').addEventListener('click',computeAge)