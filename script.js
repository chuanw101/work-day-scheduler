var allTextArea = $("textarea");
var allSaveButtons = $(".saveBtn");

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

function displayTasks() {
    var tasksArray = JSON.parse(localStorage.getItem("tasks"));
    if (!tasksArray) {
        allTextArea.text("");
    } else {
        for(let i=0; i<9; i++) {
            allTextArea.eq(i).text(tasksArray[i]);
        }
    }
}

allSaveButtons.on('click', function () {
    // get index and text of current row
    var index = $(this).parent().index();
    var task = $(this).parent().find("textarea").val();
    // grab tasks array
    var tasksArray = JSON.parse(localStorage.getItem("tasks"));
    if (!tasksArray) {
        // create new array and fill in blanks if not set up in localstorage
        tasksArray=[];
        for (let i=0; i<9; i++) {
            if (index === i) {
                tasksArray.push(task);
            } else {
                tasksArray.push("");
            }
        }
    } else {
        //else splice in the button based on index of button
        tasksArray.splice(index,1,task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
    updateTime();
});

updateTime();
displayTasks();
