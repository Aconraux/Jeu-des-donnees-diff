// get the ful url
const url = String(window.location.href).split("?queryData=");

// get the q= value
const q = url.length === 2 ? url[1] !== "" ? url[1] : document.getElementById("main").innerHTML = "<h1>403 Forbidden</h1>" : document.getElementById("main").innerHTML = "<h1>403 Forbidden</h1>";

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

	return http.status != 404 ? image_url : "./assets/model/images/not_found.png";

}

function play(){
	d3.json("./Output/Data_Final.json", function(data) {
		def = data[q][4]

		var msg = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
		msg.voice = voices[0]; 
		msg.volume = 1; // From 0 to 1
		msg.rate = 1; // From 0.1 to 10
		msg.pitch = 1; // From 0 to 2
		msg.text = def;
		msg.lang = 'fr';
		speechSynthesis.speak(msg);

		

	});
}

// creating a dynamic result
let data = `
	<a-assets>
		<img id="robot" src="./robot.gif">
	</a-assets>
	<!-- custom pattern -->
	<a-marker smooth="true" type="barcode" value="${q}">
		<!-- Background Card -->
		
		<a-plane color="#0a6394" height="10" width="11" rotation="-90 0 0"></a-plane>

		<!-- Image contains the Term -->	
		<a-image width="5" height="2" src="./assets/model/images/titles/${q}.png" position="2.5 0.5 -1" rotation="-90 0 0"></a-image>
		
		<!-- Image contains the definition -->		
		<!--text image -->
		<a-image width="5" height="3" src="./assets/model/images/text/${q}.png" position="-3 0.5 -2" rotation="-90 0 0"></a-image>
		
		<!-- image describes the title -->
		<a-image width="7" height="4" src="${String(imageExists(`./assets/model/images/${q}.png`))}" position="1.5 0.5 3" rotation="-90 0 0"></a-image>
		
		<!-- Credits -->
		<a-text color="white" value="Ministère de la Culture - SNUM" font="https://raw.githubusercontent.com/husky-helen/aframe-font-fr/master/custom-msdf.json" negate="false" width="8" position="-1 1 -4" rotation="-90 0 0"></a-text>
		
		<!-- Logo -->	
		<a-image width="2" height="1" src="./logo.png" position="2 0.5 -3" rotation="-90 0 0"></a-image>

		<!--Robot gif-->
		<a-entity geometry="primitive:circle; radius: 1.5;" position="-4.1 0.5 3" rotation="-90 0 0" material="shader:gif;src:#robot;" gif=""></a-entity>
	</a-marker>
`;



//injecting the code to the index.html file
document.getElementById("main").innerHTML += `
 <!-- we add detectionMode and matrixCodeType to tell AR.js to recognize barcode markers -->
        <a-scene embedded arjs='sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 4x4;sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960;'>

		${data}
		
        <!-- use this <a-entity camera> to support multiple-markers, otherwise use <a-marker-camera> instead of </a-marker> -->
        <a-entity camera></a-entity>
        </a-scene>
`;