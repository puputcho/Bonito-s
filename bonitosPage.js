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

}
function getData() { firebase.database().ref("/" + roomName).on('value', function (snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") { firebaseMessageId = childKey; messageData = childData; 
console.log(firebaseMessageId);
console.log(messageData);
name = messageData['name'];
message = messageData['message'];
like = messageData['like'];
nameWithTag = '<h4>' + name + "<img class='user_tick' src='tick.png'></h4>";
msgWithTag = "<h4 class ='message_h4'>" + message + '</h4>';
like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value = " + like + " onclick='updateLike(this.id)'>";
spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span> </button> <hr>";
row = nameWithTag + msgWithTag + like_button + spanWithTag;
document.getElementById('output').innerHTML += row;
} }); }); }
getData();
function updateLike(messageId) {
    console.log('like button pressed. messageId:' + messageId);
    buttonId = messageId;
    likes = document.getElementById(messageId).value;
    likes = Number(likes) + 1;
    console.log(likes)
    // Salvar no database
    firebase.database().ref(roomName).child(messageId).update({ like : updatedLikes });
    
}
function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('roomName');
    window.location =  'index.html';
} 


