
const firebaseConfig = {
  apiKey: "AIzaSyA6KzvopZ2eOj1YxjeqWVIYDHBRuVNxk_k",
  authDomain: "project-3-1a4b1.firebaseapp.com",
  databaseURL: "https://project-3-1a4b1-default-rtdb.firebaseio.com",
  projectId: "project-3-1a4b1",
  storageBucket: "project-3-1a4b1.appspot.com",
  messagingSenderId: "956952021610",
  appId: "1:956952021610:web:de7e76d6fb7e372a3a9813"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
const getID = (id)=>{
	return document.getElementById(id)
}

const masterTl = gsap.timeline();
const component = document.querySelector('.js-Trash');
const trashGroup = document.querySelector('.js-Trash-group');
const trashRecycle = document.querySelector('.js-Trash-recycle');

function tlIntro() {
  let tl = gsap.timeline();

  tl.
  set(component, { autoAlpha: 1 }).
  set(trashRecycle, { transformOrigin: '50%' }).
  set(trashGroup, { x: '-100%' }).
  to(trashGroup, {
    duration: 1,
    x: '0%',
    rotate: '0',
    ease: 'inOut',
    transformOrigin: '100% 100%' }).

  to(trashGroup, {
    duration: 0.5,
    rotate: '15deg',
    scaleY: 1.05,
    ease: 'back.out(1.8)' },
  '-=0.3').
  to(trashRecycle, {
    duration: 0.4,
    rotation: '145turn',
    ease: 'in' },
  '<').
  to(trashGroup, {
    duration: 0.8,
    scaleY: 1,
    rotate: '0',
    ease: 'elastic.out(1.1, 0.4)' }).

  to(trashRecycle, {
    duration: 1,
    rotation: '-360turn',
    ease: 'expo.out',
    onComplete: () => tlRepeat() },
  '<');

  return tl;
}

function tlRepeat() {
  let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

  tl.
  to(trashGroup, {
    transformOrigin: '50% 100%',
    duration: 0.4,
    scaleX: 1.1,
    scaleY: 0.90 }).

  to(trashGroup, {
    duration: 2,
    scaleX: 1,
    scaleY: 1,
    ease: 'elastic.out(1, 0.2)' });


  return tl;
}

masterTl.add(tlIntro());

// _________________________________________________________________

// firebase


function openTrash(){
  var firebaseRef = firebase.database().ref().child("Value");         
  firebaseRef.set(Number(1));  
}
function closeTrash(){
  var firebaseRef = firebase.database().ref().child("Value");         
  firebaseRef.set(Number(0));  
}
database.ref().on("value", function(snap){      
  const statusTrash = snap.val().amount;
  var percentTrash = ((1- (statusTrash/20))*100).toFixed(2);

  if(statusTrash > 20){
    getID("inputRange").value = 0;
    getID("statusTrash").innerHTML = "0%";
  }else{
    getID("inputRange").value = percentTrash;
    getID("statusTrash").innerHTML = `${percentTrash}%`;
    if(percentTrash >= 95){
      getID("title").innerHTML = "Thùng rác đã đầy";
      getID("title").style.color = "red";
      getID("open").disabled = false;
      getID("close").disabled = false;
    }else if(percentTrash >= 75){
      getID("title").innerHTML = "Đồ án 3";
      getID("title").style.color = "#4482BB";
      getID("open").disabled = false;
      getID("close").disabled = false;
    }else{
      getID("title").innerHTML = "Đồ án 3";
      getID("title").style.color = "#4482BB";
      getID("open").disabled = true;
      getID("close").disabled = true;
    }      
  }  
  console.log("statusTrash", statusTrash )
  console.log("percentTrash", percentTrash )
});
