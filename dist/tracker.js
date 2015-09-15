(function (scope) {
    scope.track = function (actor, context) {
        var links = Array.prototype.slice.call(document.getElementsByTagName('a'), 0);
        links.filter(function (elem) {
            return elem.href.indexOf('http://localhost:3000/') === 0;
        }).map(function (elem) {
            elem.onclick = function (e) {
                var options = encodeURIComponent(JSON.stringify({ actor: actor, context: context }));
                scope.location.href = elem.href + '?options=' + options;
                e.preventDefault();
            };
        });
    };
}(window));
/*
track({
  account: {
    name: '1',
    homePage: document.URL
  }
}, {
  instructor: {
    objectType: "Agent",
    mbox: "mailto:joesdad@example.com"
  },
  contextActivities: {
    parent: [{
      objectType: "Activity",
      id: "tag:adlnet.gov,2013:expapi:0.9:activities:non-absolute-activity-id",
      definition: {
        name: {
          "en-GB": "Another Activity"
        }
      }
    }]
  }
});
*/ 
