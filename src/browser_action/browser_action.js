
$('#datepick').datetimepicker();

//http://www.jqueryscript.net/time-clock/Easy-Responsive-jQuery-Duration-Picker-Plugin-duration-picker-js.html
$("#duration").durationPicker({
	hours: 
	{
		label: "h",
	    min: 0,
	    max: 999
  	},
  	minutes: 
  	{
	    label: "m",
    	min: 0,
    	max: 59
  	},
  	classname: 'form-control',
  	responsive: true
});

var blockList = document.getElementById("blockList");

function addToBlockList()
{
	var url = document.getElementById("url").value;
	var date = document.getElementById("datetimepicker4").value;
	var duration = document.getElementById("duration").value;
	//document.getElementById("test").innerText = "abc";
	
	var newBlockUrl = document.createElement("dt");
	var newBlockDate = document.createElement("dd");
	var newBlockDuration = document.createElement("dd");
	newBlockUrl.appendChild(document.createTextNode(url));
	newBlockDate.appendChild(document.createTextNode("Date: " + date));
	newBlockDuration.appendChild(document.createTextNode("Duration: " + duration));
	blockList.appendChild(newBlockUrl);
	blockList.appendChild(newBlockDate);
	blockList.appendChild(newBlockDuration);
}

document.addEventListener('DOMContentLoaded', function() {
    var temp = document.getElementById('addBlockButton');
    temp.addEventListener('click', function() {
        addToBlockList();
    });
});