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

document.querySelectorAll('input[type="text"]').forEach(function(input) {
    input.addEventListener('input', padAndTruncateInput);
});


function getGivenDate(){
    const givenDay = document.querySelector('input[type="text"].day').value;
    const givenMonth = document.querySelector('input[type="text"].month').value;
    const givenYear = document.querySelector('input[type="text"].year').value;
    //const givenDate = new Date(givenYear,givenMonth-1,givenDay)
    const givenDate = dateFns.parse([givenYear,givenMonth,givenDay].join('-'), 'yyyy-MM-dd', new Date());

    const givenDateUTC = new Date(Date.UTC(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()));
    givenDateUTC.setHours(0, 0, 0, 0); // Set time to midnight
    return givenDateUTC;
}

function getCurrentDate(){
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0); 
    return currentDate
}

function validateInput(e){
    var good = true

    const dayValue = parseInt(document.querySelector('input[type="text"].day').value, 10)
    const monthValue = parseInt(document.querySelector('input[type="text"].month').value, 10)
    const yearValue = parseInt(document.querySelector('input[type="text"].year').value, 10)

    if(isNaN(dayValue)){
        document.querySelector('#day-missing-error').style.display = 'unset';
        good = false
    }else{
        document.querySelector('#day-missing-error').style.display = 'none';
    } 
    if(dayValue<0 || dayValue>31){
        document.querySelector('#day-bad-error').style.display = 'unset';
        good = false
    }else{
        document.querySelector('#day-bad-error').style.display = 'none';
    }

    if(isNaN(monthValue)){
        document.querySelector('#month-missing-error').style.display = 'unset';
        good = false
    }else{
        document.querySelector('#month-missing-error').style.display = 'none';
    }

    if(monthValue<0 || monthValue>12){
        document.querySelector('#month-bad-error').style.display = 'unset';
        good = false
    }else{
        document.querySelector('#month-bad-error').style.display = 'none';
       
    }

    if(isNaN(yearValue)){
        document.querySelector('#year-missing-error').style.display = 'unset';
        good = false
    }else{
        document.querySelector('#year-missing-error').style.display = 'none';
    }
    
    if(!good){
        return good
    }
    
    if(getCurrentDate()<getGivenDate()){
        document.querySelector('#past-date-error').style.display = 'unset';
        good = false
    }else{
        document.querySelector('#past-date-error').style.display = 'none';
    }

    if(!dateFns.isValid(getGivenDate())){
        document.querySelector('#invalid-date-error').style.display = 'unset';
        good = false
    }else{
        document.querySelector('#invalid-date-error').style.display = 'none';
    }

    return good
}

function computeAge(e){
    const currentDate = getCurrentDate()
    const givenDate = getGivenDate()
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
document.querySelector('#calculate-age').addEventListener('click',(e)=>{
    var good = validateInput(e);
    if(good){
        computeAge(e);
    }
})