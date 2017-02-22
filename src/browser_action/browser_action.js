	$('#datetimepicker4').datetimepicker({});

	$("#duration").durationPicker(
	{
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
console.log(document.getElementById("url"));
var url = document.getElementById("url").value;
//var date = document.getElementById("date").value;
var duration = document.getElementById("duration");


function addToBlockList()
{
	var newBlockItem = document.createElement("li");
	newBlockItem.appendChild(document.createTextNode(url));
	blockList.appendChild(newBlockItem);
}

document.addEventListener('DOMContentLoaded', function() {
    var temp = document.getElementById('addBlockButton');
    temp.addEventListener('click', function() {
        addToBlockList();
    });
});