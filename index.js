var client_id = 'bf1c6632713844dcaa3e85ae3c5ea1c1';
var redirect_uri = "http://127.0.0.1:5500/callback.html";



window.addEventListener('load', function() {
 document.getElementById("thing").innerHTML = !localStorage.getItem("Authorization") ? "No hay credenciales" :  "Tenemos credenciales!!";


}
);





function makeReq(){


    async function fetchData() {
        const url = "https://api.spotify.com/v1/me/playlists?offset=0&limit=50";
        const options = {
          method: 'GET',
          headers: {
            'Authorization': localStorage.getItem("Authorization")
          }
        };
      
        try {
          const response = await fetch(url, options);
      
          if (!response.ok) {

            if(response.status == 400){
              document.getElementById("thing").innerHTML = "Asegurate de darnos acceso a tu cuenta antes de continuar";
            }

            throw new Error(`Request failed with status: ${response.status}`);
          }

          return await response.json();
        } catch (error) {
          console.error('Error fetching data:', error.message);
          throw error;
        }
      }



  fetchData()
  .then(data => {

    console.log(data);

    document.getElementById("pcontainer").innerHTML = "<h1>Tus playlist son:</h1>";

    var {items} = data;

    items.forEach(item => {

    var name = item.name;
    var tracks = item.tracks;

    document.getElementById("pcontainer").innerHTML += `
    
    <p>${name} . tiene ${tracks.total} canciones papu :v</p>

    `



    });
  
  })
  .catch(error => {
    console.log('Error in example usage:', error);
  });


      
}


function getAuth(){

var state = generateRandomString(16);
var scope = 'user-read-private user-read-email playlist-read-private';

localStorage.setItem("stateKey", state);


var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);


location.href = url;
}



function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
