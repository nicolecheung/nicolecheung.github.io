/* jshint latedef:false */

angular
  .module('desk', [
    'duScroll'
  ]);

angular.module('desk')

.directive('selectorItem', function() {
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
})

.directive('deskSection', function() {
  return {
    restrict: 'A',
    transclude: true,
    template: [
      '<div class="pages">',
        '<div class="content">',
          '<ng-transclude></ng-transclude>',
        '</div>',
      '</div>'
    ].join('\n'),
    link: function(_, element) {
      element.addClass('section');
    }
  };
})

.directive('sectionPage', function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    priority: 100,
    template: [
      '<div class="section-page">',
        '<ng-transclude></ng-transclude>',
      '</div>',
    ].join('\n'),
    link: function(_, element) {
      var $content = element.parent().parent();
      $content.after(element);
      var $pages = $content.parent();
      var currentPages = $pages.data('pages') + 1 || 2;
      $pages.data('pages', currentPages)
      $pages.css({ width: (currentPages * 100) + '%' });
    }
  };
})

.directive('menuItem', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    priority: 100,
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
