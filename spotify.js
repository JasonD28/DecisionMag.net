"use strict";


const clientID = "52adb50940ad424ea21b1f0f83216db5",
    clientSecret = "7fa1669085d244a695e2402c47dae6b1",
    apiURL = "https://accounts.spotify.com/api/token/",
    searchURL = "https://api.spotify.com/v1/search?",
    recURL = 'https://api.spotify.com/v1/recommendations?',
    TOKEN = "BQAVKrDPSo-92pGHfQ9uEyxLnBaw0T-1KBqB-y2FuqIT6_VCPCVb6Vq3i3xys5HPLOfO9bElKYKqpGJKTtPzyYmHBo66yqyZU_r1vSftIuWxRCUm1aZLe5WPElb52ABPmV2Q7utCrkPxjYc4To9d";

function getSpotifyID(type, name) {
    let id = '';

    if(type == "genre"){
        id = type;
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
                getRecommendation(type, id);
            } else {
                console.error("Nothing found.")
            }
        }).catch(error => console.error('Error:', error));
    }

    
   
}

function getRecommendation(seedType, seedID){

    let seed = '';

    if(seedType == 'artist'){
        seed = 'seed_artists';
    }

    console.log(seedID);
    fetch(`${recURL}limit=50&${seed}=${seedID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }
    }).then(response => response.json()).then(function (response) {
        if(response.tracks){
            console.log(response.tracks);
            let rng = Math.floor(Math.random() * 50);
            console.log(response.tracks[rng].album.external_urls.spotify);
        }
    }).catch(error => console.error('Error:', error));
}

// function getAccessToken(){
//     let param = 'grant_type=client_credentials';

//     fetch(apiURL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`),
//             'Content-Length': param.length,


//         },
//         body: param
//     }).then(response => response.json()).then(function (response) {
//         console.log(response);
//     }).catch(error => console.error('Error:', error));
// }

// getAccessToken();


getSpotifyID('artist', 'IU');

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('selections').addEventListener('change', function(){

        if(document.getElementById('selections').value == 'Music'){

            document.getElementById('option1').style.display = "block";
            document.getElementById('options').style.display = "none";

            document.getElementById('musicSelec').addEventListener('change', function(){
                let type = document.getElementById('musicSelec').value;

                document.getElementById('option1').style.display = "none";
                document.getElementById('option1_1').style.display = "block";
                document.getElementById("selector").innerHTML = `Enter the name of a(n) ${type} you like`;

                document.getElementById('formy').addEventListener('submit', function(){
                    let name = document.getElementById('musicName').value;

                    document.getElementById('musicName').value = '';

                    alert(type + ': '+ name);
                });
            })
        }
    });
});