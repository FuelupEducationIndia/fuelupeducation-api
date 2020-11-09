const socket = io('/');
const mypeer = new Peer(undefined, {
    host: '/',
    port: '3030'
});
const videoGride = document.getElementById('video-grid');

const myVideo = document.createElement('video');

myVideo.muted = true;

mypeer.on('open', (id) => {
    socket.emit('join-room', ROOM_ID, id);
});

socket.on('user-connected', (userId) => {
    console.log(`User connected : ${userId}`);
    console.log('ssssssssss');
});

// socket.on('user-disconnected', (userId) => {
//     console.log(`User disconnected : ${userId}`);
// });

//  navigator.mediaDevices.getUserMedia({
//      video: true,
//      audio: true
//  }).then((strem) => {
//      addVidioStrem(myVideo, strem);
//  }).catch((err) => {});

//  function addVidioStrem(video, strem) {
//      video.srcObject = strem;
//      video.addEventListener('loadedmetadata', () => {
//          //video.play();
//      });
//      //videoGride.append(video);
//  }