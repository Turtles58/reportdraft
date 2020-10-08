const permittee = "Chelsea";
const CSOs = [
	{
		"name" : "CHE002",
		"receiving" : "Mystic river",
		"location" : "One first street",
	},
	{
		"name" : "CHE003",
		"receiving" : "Mystic River",
		"location" : "End of Winnsimmit St.",
	},
	{
		"name" : "CHE004",
		"receiving" : "Mystic River",
		"location" : "Pear St.",
	},
	{
		"name" : "CHE008",
		"receiving" : "Chelsea River",
		"location" : "Nothern Edge of Gulf Bulk oil Storage",
	}
];
window.addEventListener('DOMContentLoaded', function(){
	const checkDiv = document.getElementById("CSOcheck");
	const submit = document.getElementById("submit");
	for(let i = 0; i < CSOs.length; i++){
		checkDiv.innerHTML = checkDiv.innerHTML + CSOs[i].name + ': <input type = "checkbox" id = "check' +CSOs[i].name + '" class = "CSOBox" name= "' + CSOs[i].name + '" index = "'+ i + '"> <br> <div id = "form' + CSOs[i].name + '"> </div>';
	}
	//console.log(checkDiv.innerHTML);
	let boxes = document.getElementsByClassName("CSOBox");
	for(let i = 0; i < boxes.length; i++){
		let box = boxes[i];
		let cso = CSOs[parseInt(box.getAttribute("index"))];
		let formEl = document.getElementById("form" + cso.name);
		box.addEventListener("change", function(){
			//console.log(box.checked);
			if(box.checked){
				formEl.innerHTML = 'Ongoing? <input type = "checkbox" id = "ongoing' +cso.name + '" class = "ongoingBox" name= "ongoing' + cso.name + '" index = "'+ i + '"> <br> Start Time: <input type = "datetime-local" id = "start' + cso.name + '"> <br> <div id = "endDiv'+ cso.name + '"></div>Estimated Volume: <input type = "text" id = "volume' + cso.name + '"> </br> Notes: <br> <textarea id = "notes' + cso.name + '" rows = "5" cols = "33"> </textarea> <br> Certainty: <select id = "certain'+ cso.name + '"> <option id = "unconfirmed' + cso.name + '" value = "unconfirmed"> Unconfirmed </option> <option id = "confirmed' + cso.name + '" value = "confirmed"> Confirmed </option> </select>';
				let ongoingBox = document.getElementById("ongoing" + cso.name);
				ongoingBox.checked = true;
				ongoingBox.addEventListener("change", function(){
					let endDiv = document.getElementById("endDiv" + cso.name);
					if(!ongoingBox.checked){
						endDiv.innerHTML = 'End time: <input type = "datetime-local" id = "end' + cso.name + '">'
					}
					else{
						endDiv.innerHTML = "";
					}
				});
			}
			else{
				formEl.innerHTML = "";
			}
		});
	}
	submit.addEventListener("click", function(){
		console.log("??");
		let notice = "";
		let noticeEl = document.getElementById("notice");
		for(let j = 0; j < boxes.length; j++){
			let box = boxes[j];
			if(box.checked){
				let cso = CSOs[parseInt(box.getAttribute("index"))];
				let ongoingEl = document.getElementById("ongoing" + cso.name);
				let startEl = document.getElementById("start" + cso.name);
				let endEl = document.getElementById("end" + cso.name);
				let volumeEl = document.getElementById("volume" + cso.name);
				let notesEl = document.getElementById("notes" + cso.name);
				let confirmedEl = document.getElementById("confirmed" + cso.name);
				let unconfirmedEl = document.getElementById("unconfirmed" + cso.name);
				notice = notice +  'A Combined Sewer Overflow has been reported by ' + permittee +'. The outfall ' + cso.name + ', which is located at ' + cso.location + ' and discharges into ' + cso.receiving + ', has been reported as discharging. <br> The overflow began at ' + startEl.value;
				if(ongoingEl.checked){
					notice = notice + " and is still ongoing. ";
				}
				else{
					let startDate = new Date(startEl.value);
					let endDate = new Date(endEl.value);
					let ms = Math.abs(endDate - startDate);
					let hours = Math.floor(ms/ (1000 * 60 *60));
					let minutes = Math.floor((ms - (hours * 1000 * 60 * 60)) / (1000 * 60));
					notice = notice + " and ended at " + endEl.value + ". The total discharge duration was " + hours + " hours and " + minutes + " minutes.<br> ";
				}
				notice = notice + "The estimated volume of the discharge, based on the past three years of data, is " + volumeEl.value + ". Please note that this data is preliminary, and not necessarily based on measurements of this particular discharge or considered to be accurate. ";
				if(confirmedEl.selected){
					notice = notice + "This discharge has been confirmed by the operator through visual inspection or other means. <br>";
				}
				else if(unconfirmedEl.selected){
					notice = notice + "This discharge has been detected through metering or anticipated due to rain or through modelling, but it has not been visually confirmed by the operator. <br>";
				}
				if(notesEl.value != ""){
					notice = notice + "The CSO operator has provided the following additional information pertaining to this discharge:<br> " + notesEl.value + "<br><br><br>";
				}
				//generate a notification
			}
		}
		console.log(notice);
		noticeEl.innerHTML = notice;
	});
});