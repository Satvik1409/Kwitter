// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyDp1uONv6VZsmUbbDDSbF2OCeHnN5-a2Ik",
      authDomain: "kwitter-be065.firebaseapp.com",
      databaseURL: "https://kwitter-be065-default-rtdb.firebaseio.com",
      projectId: "kwitter-be065",
      storageBucket: "kwitter-be065.appspot.com",
      messagingSenderId: "312067723893",
      appId: "1:312067723893:web:81ff0b9ccfbaa49e3e1e3c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "welcome " + user_name + "!";

function addRoom() {
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });

      localStorage.setItem("room_name", room_name);

      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("Room_Name - " + Room_names);
                  row = "<div class = 'room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();



function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location= "kwitter.html"
} 

function send() {
      msg= document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value= "";
}