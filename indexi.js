//Search input
var searchUser = document.getElementById("text_search");

//Serch user event listener
searchUser.addEventListener('keydown', (e) => {
    //get the input text
    if(e.keyCode == 13){
        //console.log("ENTER KEY PRESSED");
        const userText = e.target.value;

        if (userText != '') {
            //console.log(userText);
            ajax(userText); //Call the ajax function
    
        
        }else{
            var display = document.getElementById('display-data');
            //console.log("CLEAR ");
            display.innerHTML = "";
        } 
    }
    
});    


function ajax(keyword) {  //AJAX request
    $.ajax({
        url: "https://fa.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
        dataType: "jsonp",

        success: function (response) {
            //console.log(response.query);
            
            if (response.query.searchinfo.totalhits === 0) {
                alert(keyword + "NO RESULTS FOUND");
            }
            else {
                displayData(response);
            }
        },
        error: function () {
            alert("Error retrieving search results, please refresh the page");
        }
    });
}


function displayData(response) {

    for (var i = 0; i <= 19; i++) {
document.getElementById("hi").innerHTML="<div class='btns'><button class='button buui'>وب</button><button class='searchButton button'>تصاویر</button><button class='button'>آوا</button><button class='button'>ویدئو</button><button class='button'>بازار</button";
        $(".display-results").append("<j>"+"<div  class=' nio c-" + i + "'>" 
        + "<h5 class='title title-" + i + "'></h5>" 
        
        + "<p class='snippet snippet-" + i + "'></p> " 
        + "<style>.cool{margin-top:20px;</style>"
        + "</div>"
      );
    }

    for (var m = 0; m <= 9; m++) {
        var title = response.query.search[m].title;
        var url = title.replace(/ /g, "_");
        var timestamp = response.query.search[m].timestamp;
        timestamp = new Date(timestamp); 

        $(".title-" + m).html("<a class='linco' href='https://fa.wikipedia.org/wiki/" + url + "' target='_blank'>" + response.query.search[m].title  +  "</a>");
        
        $(".snippet-" + m).html(response.query.search[m].snippet);
        
        $(".metadata-" + m).html((response.query.search[m].size / 1000).toFixed(0) + "kb (" +
        
        response.query.search[m].wordcount + " words) - " + timestamp);
    }
}
