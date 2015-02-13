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
    replace: true,
    scope: {
      src: "@src",
      caption: "@title"
    }
  };
});

angular.module('desk').directive('deskSection', function() {
  return {
    restrict: 'A',
    transclude: true,
    template: [
      '<div class="content">',
        '<ng-transclude></ng-transclude>',
      '</div>'
    ].join('\n'),
    link: function(_, element) {
      element.addClass('section');
    }
  }
});


angular.module('desk').directive('menuItem', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    priority: -1,
    template: '<li></li>',
    scope: {
      href: "@",
      title: "@"
    },
    link: function(scope, element, attrs) {
      var newEl = angular.element([
        '<li du-scrollspy="{{ href.replace(\'#\', \'\') }}">',
          '<a href="{{ href }}" du-smooth-scroll>{{ title }}</a>',
        '</li>'
      ].join('\n'));

      $compile(newEl)(scope);
      element.replaceWith(newEl);
    }
  };
});
