"use strict";


const clientID = "52adb50940ad424ea21b1f0f83216db5",
    clientSecret = "7fa1669085d244a695e2402c47dae6b1",
    apiURL = "https://accounts.spotify.com/api/token/",
    searchURL = "https://api.spotify.com/v1/search?",
    recURL = 'https://api.spotify.com/v1/recommendations?',
    TOKEN = 'BQA51eEeQz7cLmFWJ1ZKR-NOSWDw1imEsrjQfoLLeJMeUePgp4Zi2Dl--ElwFRHZRcN9naKQ1nSFlZG9zZPh22y2Xe-FvibOXfcXVGgh_lGXgGBmzw945s1C9m8YXJe7RhItP6FmWdmw33jYqMwo';

function getSpotifyID(type, name) {
    let id = '';
    alert(`${type}:${name}`);
    if(type == "genre"){
        getRecommendation(`seed_${type}s`, name);
    } else {
        fetch(`${searchURL}q=${name}&type=${type}&limit=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then(response => response.json()).then(function (response) {
            if(response.artists.items[0].id){
                alert(type);
                id = response.artists.items[0].id;
                getRecommendation(`seed_${type}s`, id);
            } else {
                alert("Bye Irene");
                console.error("Nothing found.")
            }
        }).catch(error => alert(error + 'ID'));
    }

    
   
}

function getRecommendation(seedType, seedID){

    let seed = '';

    if(seedType == 'artist'){
        alert("Irene is nice at times...")
        seed = 'seed_artists';
    }

    alert(`${seedType}: ${seedID}`);

    console.log(seedID);
    fetch(`${recURL}limit=50&${seedType}=${seedID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }
    }).then(response => response.json()).then(function (response) {
        if(response.tracks[49]){
            console.log(response);
            let rng = Math.floor(Math.random() * 50);
            alert(response.tracks[rng].album.external_urls.spotify);
        }
    }).catch(error => alert(error + 'REC'));//console.error('Error:', error));
}

let type, name;

// document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('selections').addEventListener('change', function(){
        

        if(document.getElementById('selections').value == 'Music'){

            document.getElementById('option1').style.display = "block";
            document.getElementById('options').style.display = "none";
        }
    });

    document.getElementById('musicSelec').addEventListener('change', function(){
        type = document.getElementById('musicSelec').value;

        document.getElementById('option1').style.display = "none";
        document.getElementById('option1_1').style.display = "block";
        document.getElementById("selector").innerHTML = `Enter the name of a(n) ${type} you like`;
    });

    document.getElementById("musicButton").addEventListener('mouseup', function(){
        if(document.getElementById('musicName').value){
            getSpotifyID(type, document.getElementById('musicName').value);
        }
    });

    document.getElementById('musicName').addEventListener("keyup", function(event) {
        if (event.keyCode === 13 && document.getElementById('musicName').value) {
            getSpotifyID(type, document.getElementById('musicName').value);
        }
      });