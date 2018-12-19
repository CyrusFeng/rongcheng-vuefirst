export default function() {
  // const viewport = document.querySelector("meta[name=viewport]")
  // if (window.devicePixelRatio == 1) {
  //   viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no')
  // }
  // if (window.devicePixelRatio == 2) {
  //   viewport.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no')
  // }
  // if (window.devicePixelRatio == 3) {
  //   viewport.setAttribute('content', 'width=device-width, initial-scale=0.333333333, maximum-scale=0.333333333, minimum-scale=0.333333333, user-scalable=no')
  // }

  // var devicePixelRatio = 1;
  // var scale = 1 / devicePixelRatio;
  // document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  // 7.5根据设计稿的横向分辨率/100得来
  // alert(document.documentElement.clientWidth)
  //let deviceWidth = document.documentElement.clientWidth;
  let deviceWidth = window.screen.width;
  // var deviceWidth = window.screen.availWidth
  // alert(navigator.userAgent)
  // alert(deviceWidth)
  // console.log(navigator.userAgent)
  // if(deviceWidth > 750) {
  //   // deviceWidth = 750;
  //   deviceWidth = 7.5 * 50;
  // }

  document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';

  // 禁止双击放大
  document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, false);
  let lastTouchEnd = 0;
  document.documentElement.addEventListener('touchend', function (event) {
    let now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}
