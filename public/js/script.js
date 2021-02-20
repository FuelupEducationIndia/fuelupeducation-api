//import h from "./helpers.js";
const socket = io("/");
const mypeer = new Peer(undefined, {
    host: "/",
    port: "3001",
});
let myVideoStream;
let screenStream;
const peers = {};
const videoGride = document.getElementById("video-grid");

const myVideo = document.createElement("video");

var mediaRecorder = "";
var recordedStream = [];

myVideo.muted = true;

if (!navigator.mediaDevices) {
    alert("getUserMedia support required to use this page");
}
navigator.mediaDevices
    .getUserMedia({
        audio: true,
        video: {
            width: {
                ideal: 1280,
            },
            height: {
                ideal: 720,
            },
        },
    })
    .then((stream) => {
        myVideoStream = stream;
        addVidioStrem(myVideo, stream);
        mypeer.on("call", (call) => {
            call.answer(stream);
            const userVideo = document.createElement("video");
            call.on("stream", (userVideoStream) => {
                addVidioStrem(userVideo, userVideoStream);
            });
        });

        socket.on("user-connected", (userId) => {
            console.log(`User connected : ${userId}`);
            connectToNewUser(userId, stream);
        });
    })
    .catch((err) => {});

// input value
let text = $("input");

// get input value when user type...
$("html").keydown(function(e) {
    if (e.which == 13 && text.val().length !== 0) {
        socket.emit("message", text.val());
        text.val("");
    }
});

socket.on("createMessage", (message, userId) => {
    $("ul").append(`<li class="message"><b>${userId}</b><br/>${message}</li>`);
    scrollToBottom();
});

socket.on("user-disconnected", (userId) => {
    if (peers[userId]) peers[userId].close();
});

mypeer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id);
});

function scrollToBottom() {
    var d = $(".main__chat_window");
    d.scrollTop(d.prop("scrollHeight"));
}

function connectToNewUser(userId, stream) {
    const call = mypeer.call(userId, stream);
    const video = document.createElement("video");

    call.on("stream", (userVideoStream) => {
        addVidioStrem(video, userVideoStream);
    });

    call.on("close", () => {
        video.remove();
    });

    peers[userId] = call;
}

function addVidioStrem(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
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
};

const setUnmuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `;
    document.querySelector(".main__mute_button").innerHTML = html;
};

const setMuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `;
    document.querySelector(".main__mute_button").innerHTML = html;
};

const playStop = () => {
    const videoEnabled = myVideoStream.getVideoTracks()[0].enabled;
    if (videoEnabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
};

const setPlayVideo = () => {
    const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `;
    document.querySelector(".main__video_button").innerHTML = html;
};

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `;
    document.querySelector(".main__video_button").innerHTML = html;
};

const record = () => {
    if (!mediaRecorder || mediaRecorder.state == "inactive") {
        toggleModal("recording-options-modal", true);
    }
};

function toggleModal(id, show) {
    let el = document.getElementById(id);

    if (show) {
        el.style.display = "block";
        el.removeAttribute("aria-hidden");
    } else {
        el.style.display = "none";
        el.setAttribute("aria-hidden", true);
    }
}

function startRecording(stream) {
    mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
    });
    mediaRecorder.start(1000);
    toggleRecordingIcons(true);

    mediaRecorder.ondataavailable = function(e) {
        recordedStream.push(e.data);
    };

    mediaRecorder.onstop = function() {
        toggleRecordingIcons(false);
        saveRecordedStream(recordedStream, 3);
        setTimeout(() => {
            recordedStream = [];
        }, 3000);
    };

    mediaRecorder.onerror = function(e) {
        console.error(e);
    };
}

function saveRecordedStream(stream, user) {
    let blob = new Blob(stream, {
        type: "video/webm",
    });

    let file = new File([blob], `${user}-${moment().unix()}-record.webm`);

    // create FormData
    var formData = new FormData();
    formData.append('videoFilename', file.name);
    formData.append('videoData', file);

    $.ajax({
        type: "POST",
        url: "/uploadRecording",
        data: formData,
        processData: false,
        contentType: false,
    }).done(function(data) {
        console.log(data);
    });
    //saveAs(file);
}

function toggleRecordingIcons(isRecording) {
    let e = document.getElementById("record");

    if (isRecording) {
        e.setAttribute("title", "Stop recording");
        e.children[0].classList.add("text-danger");
        e.children[0].classList.remove("text-white");
    } else {
        e.setAttribute("title", "Record");
        e.children[0].classList.add("text-white");
        e.children[0].classList.remove("text-danger");
    }
}

//When record button is clicked
document.getElementById("record").addEventListener("click", (e) => {
    /**
     * Ask user what they want to record.
     * Get the stream based on selection and start recording
     */
    if (!mediaRecorder || mediaRecorder.state == "inactive") {
        toggleModal("recording-options-modal", true);
    } else if (mediaRecorder.state == "paused") {
        mediaRecorder.resume();
    } else if (mediaRecorder.state == "recording") {
        mediaRecorder.stop();
    }
});

//When user choose to record own video
document.getElementById("record-video").addEventListener("click", () => {
    toggleModal("recording-options-modal", false);

    if (myVideoStream && myVideoStream.getTracks().length) {
        startRecording(myVideoStream);
    } else {}
});

//When user choose to record sreen
document.getElementById("record-screen").addEventListener("click", () => {
    toggleModal("recording-options-modal", false);
    shareScreen()
        .then((screenStream) => {
            startRecording(screenStream);
        })
        .catch(() => {});
});

function shareScreen() {
    return navigator.mediaDevices.getDisplayMedia({
        video: {
            cursor: "always",
        },
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
        },
    });
}