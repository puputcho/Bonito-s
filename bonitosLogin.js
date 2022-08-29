function addUser() {
    nickzin = document.getElementById('userName').value;
    localStorage.setItem('userName', nickzin);
    window.location = 'bonitosRoom.html';
}
