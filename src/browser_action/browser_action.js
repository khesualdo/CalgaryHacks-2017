$(function () 
{
	$('#datetimepicker4').datetimepicker();
});

$(function () 
{
	$("#duration").durationPicker(
	{
		hours: 
		{
			label: "h",
		    min: 0,
		    max: 24
	  	},
	  	minutes: 
	  	{
		    label: "m",
	    	min: 0,
	    	max: 24
	  	},
	  	classname: 'form-control',
	  	responsive: true
	});
});