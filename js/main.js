// 검색 input
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// scroll 따른 요소 노출 설정
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// Lodash library 의_.throttle 스크롤 이벤트 작업할때 많이쓰임
// _.throttle의 익명함수 안의 명령이 지정한 시간에 한번식 실행할 수 있게 해줌
// _.lthrottle(익명함수, 시간) -> 밀리세컨트단위 1000 1초 300 0.3초
window.addEventListener('scroll', _.throttle(function () {
    console.log(window.scrollY);
    if (window.scrollY > 500) {
      // 배지 숨기기
      // badgeEl.style.display = 'none';

      // gsap 애니메이션을 처리해주는 라이브러리
      // gsap.to(요소, 초단위 지속시간, {css옵션});
      gsap.to(badgeEl, .6, {
        opacity: 0,
        display: 'none',
      });
      // Top 버튼보이기
      gsap.to(toTopEl, .2, {
        x: 0
      });

    } else {
      // 배지보이기
      // badgeEl.style.display = 'block';

      gsap.to(badgeEl, .6, {
        opacity: 1,
        display: 'block',
      });
      // Top 버튼숨기기
      gsap.to(toTopEl, .2, {
        x: 100
      });
    }
  }, 800)
);

// To-top - GSAP의 ScrollToPlugin 필요
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.0/gsap.min.js" integrity="sha512-1dalHDkG9EtcOmCnoCjiwQ/HEB5SDNqw8d4G2MKoNwjiwMNeBAkudsBCmSlMnXdsH8Bm0mOd3tl/6nL5y0bMaQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollToPlugin.min.js" integrity="sha512-tQFq+nb/TSS648SDzWbSj0A67t4I1PFzR0U6Oi/yEYFyUbAIwg74SOCbr7t2X1Rn+iln7sYwfh8y+z7p0gddOw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    scrollTo: 0
  })
});

// visual 요소 순차적으로 노출
const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function (fadeEl, index) {
  // gsap.to(요소, 초간위 지속시간, {css옵션});
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7,
    opacity: 1,
  });
});

// 공지사항 swiper
// new Swiper(선택자, 옵션);
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true, // 자동재생 기본값 3000
  loop: true, // 반복재생
});
// promotion swiper
new Swiper('.promotion .swiper', {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 가운데서 슬라이드 시작을 하겠다
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true, // 사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next',
  },
});
// Awards Swiper
new Swiper('.awards .swiper', {
  autoplay: true,
  loop: true,
  slidesPerView: 5,
  spaceBetween: 30,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

// promotion toggle
const promotionEl = document.querySelector('.promotion');
const promorionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promorionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});

// youtube floating img
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작시간
    {
      // 옵션
      y: size,
      repeat: -1, // gsap에서 지원하는 기능 -1 무한반복
      yoyo: true, // 재생된 애니매이션을 뒤로(거꾸로) 재생
      ease: Power1.easeInOut,
      delay: random(0, delay),
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);

// ScrollMagic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐의 여부를 감시할 요소를 지정
      triggerHook: .8, // 뷰포트 맨위 0 맨아래 1 중 .8에 걸려있어 실행
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

// Copyrigth 년도 자동 업데이트
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 올해년도