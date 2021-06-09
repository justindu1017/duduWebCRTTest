Vue.config.devtools = true;

var indexVue = new Vue({
  el: "#mainDiv",
  data: {
    isRecording: false,
    recorder: "",
  },
  methods: {
    startRecord() {
      console.log("recording...");
      MediaRecorder.isTypeSupported("video/webm;codecs=h264")
        ? this.recordH264()
        : this.recordVp8();
      this.isRecording = true;
    },
    stopRecord() {
      console.log("stop recording...");
      this.recorder.ondataavailable = (e) => {
        console.log("here: ", e);

        var a = document.createElement("a");
        a.download = ["video_", (new Date() + "").slice(4, 28), ".webm"].join(
          ""
        );
        a.href = URL.createObjectURL(e.data);
        // fetch(URL.createObjectURL(e.data)).then((res) =>
        //   console.log(
        //     "herer: ",
        //     res.arrayBuffer().then((e) => {
        //       console.log(e);
        //     })
        //   )
        // );
        // console.log(e.data);
        a.textContent = a.download;
        // console.log(document.getElementsByClassName("as"));
        document.getElementById("as").appendChild(a);

        console.log("user press stop record...");
      };
      this.recorder.stop();

      this.isRecording = false;
    },
    recordH264() {
      this.recorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=h264",
      });
      this.recorder.start();
    },
    recordVp8() {
      this.recorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp8",
      });
      this.recorder.start();
    },
  },
  computed: {
    Recording() {
      return this.isRecording;
    },
  },
});

const videoConstrain = {
  video: true,
  // audio: true,
};
const localVideo = document.querySelector("video");
var stream;

function getMediaSuccess(mediaStream) {
  //   $("localVideo").attr("srcObject") = mediaStream;
  stream = mediaStream;
  localVideo.srcObject = mediaStream;
}

function getMediaFailed(err) {
  console.log("getUserMedia jump to catch with err: ", err);
}

function streamVideo() {
  console.log("streaming...");

  navigator.mediaDevices
    .getUserMedia(videoConstrain)
    .then(getMediaSuccess)
    .catch(getMediaFailed);
}

streamVideo();
