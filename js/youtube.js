// 유튜브 영상 제어(자동재생, 반복재생 등)

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

// 유튜브 라이브러리
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  // YT - 유튜브 명령 객체
  // <div id="player"></div>
  new YT.Player('player', {
    // https://www.youtube.com/embed/An6LvWQuj_8
    // 사용할 유튜브 주소창 맨뒤에있는 값
    videoId: 'An6LvWQuj_8', // 최초 재생할 유튜브 영상 ID
    playerVars: {
      // 영상을 재생하기위한 객체 데이터 할당
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 유무
      playlist: 'An6LvWQuj_8', // loop:true 일경우 반복 재생할 유튜브 영상 ID 목록
    },
    events: {
      onReady: function (event) {
        event.target.mute() // 음소거
      }
    }
  });
}
