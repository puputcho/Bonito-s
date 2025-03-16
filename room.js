const firebaseConfig = {
    apiKey: "AIzaSyCCT50t-q-I9js7jmqiyzPcH2P--tdlJ-M",
    authDomain: "bonitos-6e5c1.firebaseapp.com",
    databaseURL: "https://bonitos-6e5c1-default-rtdb.firebaseio.com",
    projectId: "bonitos-6e5c1",
    storageBucket: "bonitos-6e5c1.appspot.com",
    messagingSenderId: "298906802058",
    appId: "1:298906802058:web:fd08f360bd9cb647261a73"
  };
firebase.initializeApp(firebaseConfig);
nome = localStorage.getItem('userName');
document.getElementById('userName').innerHTML = 'Welcome back, '+nome;
function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('roomName');
    window.location =  'index.html';
} 
function addRoom() {
    newRoom = document.getElementById('roomName').value;
    console.log(newRoom);

    firebase.database().ref("/").child(newRoom).update({
      purpose : "adicionar sala"
    });
    localStorage.setItem("roomName", newRoom);
     window.location ='kwitterPage.html';
  }
function join1() {
    newRoom = 'public1';
    console.log(newRoom);

    firebase.database().ref("/").child(newRoom).update({
      purpose : "adicionar sala"
    });
    localStorage.setItem("roomName", newRoom);
     window.location ='kwitterPage.html';
  }
  function getData() {  firebase.database().ref("/").on('value', function(snapshot) 
  { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) 
      { childKey  = childSnapshot.key;
roomNames = childKey;
console.log("Nome da Sala - " + roomNames);
row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
document.getElementById("output").innerHTML += row;
});
});

}
getData();

function redirectToRoomName(name){
  console.log(name);
  localStorage.setItem('roomName', name);
  window.location ='kwitterPage.html';
}
