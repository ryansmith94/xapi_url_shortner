(function (scope) {
    scope.track = function (href, actor, context) {
        document.onclick = function (e) {
            var target = e.target;
            if (target &&
                target.href &&
                target.href.indexOf(href) === 0 &&
                target.tagName === 'A') {
                var options = encodeURIComponent(JSON.stringify({ actor: actor, context: context }));
                scope.location.href = target.href + '?options=' + options;
                e.preventDefault();
            }
        };
    };
}(window));
//# sourceMappingURL=tracker.js.map