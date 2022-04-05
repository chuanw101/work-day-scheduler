var allTextArea = $("textarea");

function updateTime() {
    // get and show date on header
    var today = moment();
    $("#currentDay").text(today.format("dddd, MMM Do"));

    //get current hour and update time blocks
    var hour = today.hour();
    if (hour < 9) { //before 9, set all to future
        allTextArea.removeClass("present past");
        allTextArea.addClass("future");
    } else if (hour > 17) { //after 5, set all to past
        allTextArea.removeClass("present future");
        allTextArea.addClass("past");
    } else { //between 9am-5pm, set color accordingly
        var currentIndex = hour-9;
        for (let i=0; i< allTextArea.length; i++) {
            var currentText = allTextArea.eq(i);
            if (i < currentIndex) {
                currentText.removeClass("present future");
                currentText.addClass("past");
            } else if (i === currentIndex) {
                currentText.removeClass("past future");
                currentText.addClass("present");
            } else {
                currentText.removeClass("past present");
                currentText.addClass("future");
            }
        }
    }
}

updateTime();