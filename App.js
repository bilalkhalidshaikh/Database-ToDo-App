// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDlopAQFxSOUrbSRMucSk14IEfPEmPgBUA",
  authDomain: "database-todo-app.firebaseapp.com",
  databaseURL: "https://database-todo-app.firebaseio.com",
  projectId: "database-todo-app",
  storageBucket: "database-todo-app.appspot.com",
  messagingSenderId: "892455000036",
  appId: "1:892455000036:web:5936689caad8ce5e2b19f1",
  measurementId: "G-5PD4W4WDXK",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

window.onload = () => {
  container.style.display = "none";
  loading.innerHTML =
    "<h1 class='ml10'><span class='text-wrapper'><span class='letters'>Loading.... <img src='./images/Spinner-1s-200px.svg' /></span></span></h1>";
  body.style.backgroundImage = "url('./images/undraw_loading_frh4.png')";
  body.style.backgroundSize = "cover";
  body.style.backgroundAttachment = "fixed";
  body.style.backgroundRepeat = "no-reapet";
  var link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = "./images/load.png";
  document.getElementsByTagName("head")[0].appendChild(link);
  setTimeout(() => {
    container.style.display = "block";
    loading.style.display = "none";
    body.style.backgroundImage = "url('./images/undraw_to_do_list_a49b.png')";
    link.href = "./images/favicon/favicon.ico";
    document.getElementsByTagName("head")[0].appendChild(link);
  }, 3000);
};
var db = firebase.database();
var key = db.ref("Todos").push().key;
var body = document.querySelector("body");
var container = document.getElementById("container");
var loading = document.getElementById("loading");
var clear = document.getElementById("clear");
var todoInput = document.getElementById("input");
var addBtn = document.getElementById("addbtn");
var todoList = document.getElementById("todo");
var hidden = document.getElementById("hide");
var todoItems = document.getElementById("todo-list");

db.ref("Todos").on("child_added", (data) => {
  var li = document.createElement("li");
  li.className = "li";
  li.id = "demo";
  var deleteBtn = document.createElement("img");
  deleteBtn.src = "./images/icons8-trash-50-removebg-preview.png";
  var editBtn = document.createElement("img");
  editBtn.src = "./images/edit.png";
  editBtn.className = "editbtn btn";
  deleteBtn.className = "delbtn btn";
  deleteBtn.setAttribute("onclick", "delBtn(this)");
  deleteBtn.setAttribute("id", data.val().key);
  editBtn.setAttribute("id", data.val().key);
  editBtn.setAttribute("onclick", "editBtn(this)");
  var todoText = document.createTextNode(data.val().todo);
  todoList.appendChild(li);
  li.appendChild(todoText);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  todoInput.value = "";
});
todoInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addBtn.onclick();
  }
});
addBtn.onclick = () => {
  var todoObject = {
    todo: todoInput.value,
    key: key,
  };
  db.ref("Todos").child(key).set(todoObject);
  if (todoInput.value.length == 0) {
    hidden.style.display = "block";
    setTimeout(() => {
      hidden.style.display = "none";
    }, 2000);
  } else {
    hidden.style.display = "none";
    todoList.style.display = "none";
  }
};

function delBtn(e) {
  e.parentNode.remove();
  db.ref("Todos").child(e.id).remove();
}

function editBtn(e) {
  var todoItem = e.parentNode.firstChild.nodeValue;
  var editInput = document.createElement("input");
  editInput.type = "text";

  var editValue = prompt("Enter updated ToDo...", todoItem);
  e.parentNode.firstChild.nodeValue = editValue;
  var editTodoObj = {
    todo: editValue,
    key: e.id,
  };
  db.ref("Todos").child(e.id).set(editTodoObj);
}

clear.onclick = function delAll() {
  db.ref("Todos").remove();
  todoList.remove();
  todoItems.remove();
};
todoInput.onfocus = () => {
  todoInput.style.boxShadow = " 10px 10px 20px 5px";
  todoInput.style.animation = "input 3s ease 1"
};
todoInput.onblur = () => {
  todoInput.style.boxShadow = "none";
};

// Animations
var i = 0;
var txt = todoInput.value;
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml5 .line",
    opacity: [0.5, 1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700,
  })
  .add({
    targets: ".ml5 .line",
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => -0.625 + 0.625 * 2 * i + "em",
  })
  .add({
    targets: ".ml5 .ampersand",
    opacity: [0, 1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: "-=600",
  })
  .add({
    targets: ".ml5 .letters-left",
    opacity: [0, 1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: "-=300",
  })
  .add({
    targets: ".ml5 .letters-right",
    opacity: [0, 1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: "-=600",
  })
  .add({
    targets: ".ml5",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

// Animations

// ServiceWorker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
// ServiceWorker
