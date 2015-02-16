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
          '<div class="image" ng-click="ngClick()">',
            '<img src="{{ src }}" />',
          '</div>',
        '</div>',
        '<div class="caption">{{ caption }}</div>',
      '</div>'
    ].join('\n'),
    replace: true,
    scope: {
      src: "@src",
      caption: "@title",
      ngClick: "&?"
    }
  };
})

.directive('deskSection', function() {
  return {
    restrict: 'A',
    transclude: true,
    template: [
      '<div ng-class="{ pages: true, \'no-pages\': (pages == 0) }"',
      '     ng-style="{ ',
              'width: (math.max(pages, 1) * 100) + \'%\',',
              '\'margin-left\': ((currentPage - 1) * -100) + \'%\'',
            '}"',
      '     ng-transclude>',
      '</div>'
    ].join('\n'),
    scope: {
      pages: "=?",
      currentPage: "=?"
    },
    link: function(scope, element) {
      scope.math = Math;
      scope.pages = scope.pages || 0;
      scope.currentPage = scope.currentPage || 1;
      element.addClass('section');
    },
    controller: function($scope) {
      this.setPages = function(page) {
        $scope.pages = page;
      }

      this.getPages = function() {
        return $scope.pages;
      }

      this.setPage = function(page) {
        $scope.currentPage = page;
      }

      this.getPage = function() {
        return $scope.currentPage;
      }
    }
  };
})

.directive('sectionPage', function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    priority: 100,
    require: '^deskSection',
    template: [
      '<div class="section-page" ng-transclude>',
      '</div>',
    ].join('\n'),
    link: function(scope, element, _, sectionCtrl) {
      var currentPages = sectionCtrl.getPages() + 1 || 1;
      sectionCtrl.setPages(currentPages);

      // Need to ensure all the pages have a fixed proportion of width
      var $pages = element.parent();
      $pages.children().css({ width: (100 / currentPages) + '%' });

      scope.setPage = function(page) {
        sectionCtrl.setPage(page);
      }

      scope.$on('reset:pages', function() {
        scope.setPage(1);
      });
    }
  };
})

  .directive('menuItem', function($compile, $rootScope) {
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
      scope.resetPages = function() {
        $rootScope.$broadcast('reset:pages');
      };

      var newEl = angular.element([
        '<li du-scrollspy="{{ href.replace(\'#\', \'\') }}">',
          '<a ng-click="resetPages()" href="{{ href }}" du-smooth-scroll>{{ title }}</a>',
        '</li>'
      ].join('\n'));

      $compile(newEl)(scope);
      element.replaceWith(newEl);
    }
  };
});
