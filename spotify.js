"use strict";


const clientID = "52adb50940ad424ea21b1f0f83216db5",
    clientSecret = "7fa1669085d244a695e2402c47dae6b1",
    apiURL = "https://accounts.spotify.com/api/token/",
    searchURL = "https://api.spotify.com/v1/search?",
    recURL = 'https://api.spotify.com/v1/recommendations?',
    TOKEN = "BQAmJK5r1tAMf5PYbfGGAoruCMTywjM2XX8aaX65KITxXgAWf0DxBg8fLGIdxOXhzDVl9XfPLA7aYbhn53evINqtU2AYXkzDo-U905OAyUnhPs0X25hf7P2lZ-xCwfmAu7kVm-zy5FeOJ6a9emBM";

function getSpotifyID(type, name) {
    let id = '';
    alert(`${type}:${name}`);
    if(type == "genre"){
        getRecommendation(type, name);
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
                getRecommendation(type, id);
            } else {
                alert("Bye Irene");
                console.error("Nothing found.")
            }
        }).catch(error => alert(error));
    }

    
   
}

function getRecommendation(seedType, seedID){

    let seed = '';

    if(seedType == 'artist'){
        alert("Irene is nice at times...")
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
            alert('Bread');
            let rng = Math.floor(Math.random() * 50);
            let teamLiquid = response.tracks[rng].album.external_urls.spotify;
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

// getSpotifyID('artist', 'IU');

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

                    // document.getElementById('musicName').value = '';

                    // document.getElementById('option1_1').style.display = "none";
                    // document.getElementById('options').style.display = "none";
                    getSpotifyID(type, name);

                    // alert(recommend);
                });
            })
        }
    });
});