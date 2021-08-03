let localvideo = document.getElementById("remote-video");
let remotevideo = document.getElementById("local-video");

localvideo.style.opacity = 0;
remotevideo.style.opacity = 0;

localvideo.onplaying = () => {
  localvideo.style.opacity = 1;
};
remotevideo.onplaying = () => {
  remotevideo.style.opacity = 1;
};

let peer;

function init(userId) {
  peer = new Peer(userId);
  peer.on("open", function (id) {
  });
  listen();
}
let localStream;
function listen() {
  peer.on("call", (call) => {
    navigator.getUserMedia(
      {
        audio: true,
        video: true,
      },
      (stream) => {
        localvideo.srcObject = stream;
        localStream = stream;
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          remotevideo.srcObject = remoteStream;
          remotevideo.className = "primary-video";
          localvideo.className = "secondary-video";
        });
      }
    );
  });
}

function startCall(otherUserId) {
  navigator.getUserMedia(
    {
      audio: true,
      video: true,
    },
    (stream) => {
      localvideo.srcObject = stream;
      localStream = stream;

      const call = peer.call(otherUserId, stream);

      call.on("stream", (remoteStream) => {
        remotevideo.srcObject = remoteStream;
        remotevideo.className = "primary-video";
        localvideo.className = "secondary-video";
      });
    });
}

function toggleVideo(b) {
    if(b == "true"){
        localStream.getVideoTracks()[0].enabled = true;
    }else{
        localStream.getVideoTracks()[0].enabled = false;

    }
}
function toggleAudio(b) {
    if(b == "true"){
        localStream.getAudioTracks()[0].enabled = true;
    }else{
        localStream.getAudioTracks()[0].enabled = false;

    }
}
