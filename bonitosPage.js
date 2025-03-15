const firebaseConfig = {
  apiKey: "AIzaSyCsBd4fW_1IcRTaKCvjai4llRoi1TIzmnw",
  authDomain: "flashat-dd3d3.firebaseapp.com",
  databaseURL: "https://flashat-dd3d3-default-rtdb.firebaseio.com",
  projectId: "flashat-dd3d3",
  storageBucket: "flashat-dd3d3.firebasestorage.app",
  messagingSenderId: "222002911862",
  appId: "1:222002911862:web:f02e3be27d382953bb9d57",
};
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem('userName');
roomName = localStorage.getItem('roomName');

function send() {
    msg = document.getElementById('msg').value;
    firebase.database().ref(roomName).push({
        name: username,
        message: msg,
        like: 0
    });
    document.getElementById('msg').innerHTML = '';
   document.getElementById('msg').value = '';

}
function getData() { firebase.database().ref("/" + roomName).on('value', function (snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") { firebaseMessageId = childKey; messageData = childData; 
console.log(firebaseMessageId);
console.log(messageData);
name = messageData['name'];
message = messageData['message'];
like = messageData['like'];
nameWithTag = '<h4>' + name + "</h4>";
msgWithTag = "<h4 class ='message_h4'>" + message + '</h4>';
like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value = " + like + " onclick='updateLike(this.id)'>";
spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>LightIt!: " + like + "</span> </button> <hr>";
row = nameWithTag + msgWithTag + like_button + spanWithTag;
document.getElementById('output').innerHTML += row;
} }); }); }
getData();
function updateLike(messageId) {
    console.log('like button pressed. messageId:' + messageId);
    buttonId = messageId;
    var likes = document.getElementById(messageId).value;
    likes = Number(likes) + 1;
    console.log(likes)
    // Salvar no database
    firebase.database().ref(roomName).child(messageId).update({ like : likes });
    
}
function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('roomName');
    window.location =  'index.html';
} 


