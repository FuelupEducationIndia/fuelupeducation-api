const socket = io("/");
const mypeer = new Peer(undefined, {
    host: "/",
    port: "3001",
});
let myVideoStream;
const peers = {};
const videoGride = document.getElementById('video-grid');

const myVideo = document.createElement('video');

myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {
    myVideoStream = stream;
    addVidioStrem(myVideo, stream);
    mypeer.on('call', (call) => {
        call.answer(stream);
        const userVideo = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVidioStrem(userVideo, userVideoStream);
        })
    });

    socket.on("user-connected", (userId) => {
        console.log(`User connected : ${userId}`);
        connectToNewUser(userId, stream)
    });
}).catch((err) => {});

socket.on('user-disconnected', (userId) => {
    if (peers[userId]) peers[userId].close();
});

mypeer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
    const call = mypeer.call(userId, stream);
    const video = document.createElement('video');

    call.on('stream', userVideoStream => {
        addVidioStrem(video, userVideoStream);
    });

    call.on('close', () => {
        video.remove();
    });

    peers[userId] = call;
}

function addVidioStrem(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGride.append(video);
}

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;

    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }

    console.log(myVideoStream.getVideoTracks());
}

const setUnmuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setMuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const playStop = () => {
    const videoEnabled = myVideoStream.getVideoTracks()[0].enabled;
    if (videoEnabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo()
    } else {
        setStopVideo()
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}


const setPlayVideo = () => {
    const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
    document.querySelector('.main__video_button').innerHTML = html;
}

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
    document.querySelector('.main__video_button').innerHTML = html;
}