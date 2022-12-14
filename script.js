function reverseStr(str) {
    return str.split('').reverse().join('');  // because reverse function can be applied on array only
}


function isPalindrome(str) {
    return str === reverseStr(str);
}

function convertDateToObjStr(date) {

    var dateObj = { day: '' , month: '', year: ''};

    if (date.day < 10) {
        dateObj.day = '0' + date.day;
    } else {
        dateObj.day = date.day.toString();
    }

    if (date.month < 10) {
        dateObj.month = '0' + date.month;
    } else {
        dateObj.month = date.month.toString();
    }

    dateObj.year = date.year.toString();

    return dateObj;
}

function getAllDateFormats(date) {
    var dateStrs = convertDateToObjStr(date);

    var ddmmyyyy = dateStrs.day + dateStrs.month + dateStrs.year;
    var mmddyyyy = dateStrs.month + dateStrs.day + dateStrs.year;
    var yyyymmdd = dateStrs.year + dateStrs.month + dateStrs.day;
    var ddmmyy = dateStrs.day + dateStrs.month + dateStrs.year.slice(-2);
    var mmddyy = dateStrs.month + dateStrs.day + dateStrs.year.slice(-2);
    var yymmdd = dateStrs.year.slice(-2) + dateStrs.month + dateStrs.day;

    return {ddmmyyyy: ddmmyyyy, mmddyyyy:mmddyyyy, yyyymmdd: yyyymmdd, ddmmyy: ddmmyy, mmddyy: mmddyy, yymmdd: yymmdd};
}

function checkPalindromeForAllDateFormats(date) {
    var listOfDateFormats = getAllDateFormats(date);

    // for (var i=0; i < listOfDateFormats.length ; i++){
    //     if(isPalindrome(listOfDateFormats[i])){
    //         return [true , listOfDateFormats[i]];
    //     }
    // }

    for(let key of Object.keys(listOfDateFormats)) {
        if(isPalindrome(listOfDateFormats[key])){
            // console.log(listOfDateFormats[key]);
            return [true , key];
        }
    }

    return [false, null];
}

function isLeapYear(year){
    if (year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if(month === 2) {    // (month === 2 && isLeapYear(year))
        if(isLeapYear(year)){
            if(day > 29) {
                day = 1;
                month++;
            } else { // when it is not a leap year
                day = 1;
                month++;
            }
        }
    }
    else {
        if ( day > daysInMonth[month - 1]){
            day = 1 ;
            month ++;
        }
    }

    if( month > 12){
        month = 1;
        year++;
    }

    return {
        day : day ,
        month : month,
        year : year
    }
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        if(checkPalindromeForAllDateFormats(nextDate)[0]){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day < 1){
        month--;
        if (month === 2){
            if(isLeapYear(year)){
                day = 29;
            }
            else {
                day = daysInMonth[month-1];
            }
        }
        else {
            day = daysInMonth[month-1];
        }
    }

    if (month < 1){
        month = 12;
        day = daysInMonth[month-1];
        year--;
    }

    return {
        day : day,
        month : month,
        year : year
    }
}

function getPreviousPalindromeDate(date) {
    var ctr = 0;
    var prevDate = getPreviousDate(date);

    while(1){
        ctr++;
        if(checkPalindromeForAllDateFormats(prevDate)[0]){
            break;
        }
        prevDate = getPreviousDate(prevDate);
    }

    return [ctr, prevDate];
}

function clickHandler(e) {
    var dateString = dateInputRef.value;
    if (dateString !== ''){
        var partsOfDate = dateString.split('-');
        var date = {
            day: Number(partsOfDate[2]),
            month: Number(partsOfDate[1]),
            year: Number(partsOfDate[0])
        }

        var isPalindromeResult = checkPalindromeForAllDateFormats(date);
        // console.log(isPalindromeResult)

        if(isPalindromeResult[0]) {
            resultRef.innerHTML= `Yay!! This date is a palindrome when format is <span>${isPalindromeResult[1]}</span>`; // returns first format matched
        }
        else {
            var [ctr , nextDate] = getNextPalindromeDate(date);
            var [ctr1 , prevDate] =  getPreviousPalindromeDate(date);
            resultRef.innerHTML = `The next palindrome date is <span>${nextDate.day}-${nextDate.month}-${nextDate.year}</span> , you missed it by <span>${ctr}</span> days & <br> The previous palindrome date is <span>${prevDate.day}-${prevDate.month}-${prevDate.year}</span> , you missed it by <span>${ctr1}</span> days!`;

        }
    }
    else {
        alert("Please select a date");
    }

}

var dateInputRef = document.querySelector("#date-input");
var showBtnRef = document.querySelector("#show-btn");
var clearBtnRef = document.querySelector("#clear-btn");
var resultRef = document.querySelector("#result");

showBtnRef.addEventListener('click',clickHandler);
clearBtnRef.addEventListener('click',()=>{
    resultRef.innerHTML="";
    dateInputRef.value ="";
})
