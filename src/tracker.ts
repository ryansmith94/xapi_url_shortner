interface Window {
  track: any
}
declare var window:Window;

(function (scope: Window) {
  scope.track = function (actor, context) {
    document.onclick = function (e) {
      var target: any = e.target;
      if (
        target &&
        target.href &&
        target.href.indexOf('http://localhost:3000/') === 0 &&
        target.tagName === 'A'
      ) {
        var options = encodeURIComponent(JSON.stringify({actor: actor, context: context}));
        scope.location.href = target.href+'?options='+options;
        e.preventDefault();
      }
    };
  };
}(window));

// Example use available at: "../example/index.html".