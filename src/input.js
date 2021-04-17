export default class InputHandler {

  constructor(chores) {

    navigator.sayswho = (function () {
      var N = navigator.appName, ua = navigator.userAgent, tem;
      var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
      if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
      M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

      return M;
    })();

    this.browser = "f";
    if (navigator.sayswho[0] == "Firefox")
      this.browser = "f";
    else if (navigator.sayswho[0] == "Chrome")
      this.browser = "c";
    else if (navigator.sayswho[0] == "Safari")
      this.browser = "s";
    else if (navigator.sayswho[0] == "Microsoft")
      this.browser = "m";

    document.addEventListener("keydown", (event) => {
      chores.getKey(event.keyCode);
    });
    document.addEventListener("keyup", (event) => {
      chores.stopKey(event.keyCode);
    });
    document.addEventListener("click", (event) => {
      chores.getMouse(event);
    }, false);
  }

}