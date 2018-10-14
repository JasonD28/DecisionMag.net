"use strict";


const clientID = "52adb50940ad424ea21b1f0f83216db5",
    clientSecret = "7fa1669085d244a695e2402c47dae6b1",
    apiURL = "https://accounts.spotify.com/api/token/",
    searchURL = "https://api.spotify.com/v1/search?",
    recURL = 'https://api.spotify.com/v1/recommendations?',
    TOKEN = 'BQC3pT5pL7tu-eTEct_9TWMe2dkmI7I9FObTEVGZg735yTw1e3a8b6tgAJB-bj_HLqJGb1KtdA3wb3l3G0varF6QnWfRRNjvttkB0OfxSeECFaZcSG82gpwyfIvkCS6R1nozmlbczP0hzfgXK9iL';

function getSpotifyID(type, name) {
    let id = '';

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
                id = response.artists.items[0].id;
                getRecommendation(`seed_${type}s`, id);
            } else {
                console.error("Nothing found.")
            }
        }).catch(error => console.error('Error:', error));
    }

    
   
}

function getRecommendation(seedType, seedID){
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

            document.getElementById('album').setAttribute('src', response.tracks[rng].album.images[0].url);
            document.getElementById('artistName').innerHTML = response.tracks[rng].album.artists[0].name;
            document.getElementById('albumTitle').innerHTML = response.tracks[rng].album.name;
            document.getElementById('musicLink').setAttribute('href', response.tracks[rng].album.external_urls.spotify);
        }
    }).catch(error => console.error('Error:', error));
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

            document.getElementById('option1_1').style.display = "none";
            document.getElementById('finalMusic').style.display = "block";
        }
    });

    document.getElementById('musicName').addEventListener("keyup", function(event) {
        if (event.keyCode === 13 && document.getElementById('musicName').value) {
            getSpotifyID(type, document.getElementById('musicName').value);

            document.getElementById('option1_1').style.display = "none";
            document.getElementById('finalMusic').style.display = "block";
        }
      });
