/* jshint latedef:false */

angular
  .module('desk', [
    'duScroll'
  ]);

angular.module('desk').directive('selectorItem', function() {

  return {
    restrict: 'E',
    template: [
      '<div class="item">',
        '<div class="accents-one"></div>',
        '<div class="accents-two"></div>',
        '<div class="view">View</div>',
        '<div class="image-wrapper">',
          '<div class="image">',
            '<img src="{{ src }}" />',
          '</div>',
        '</div>',
        '<div class="caption">{{ caption }}</div>',
      '</div>'
    ].join('\n'),
    transclude: true,
    scope: {
      src: "@src",
      caption: "@title"
    }
  }

});
