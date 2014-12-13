/* jshint latedef:false */

$(bootstrap);

function bootstrap() {

  'use strict';

  /**
   * For toggling active menu items.
   */
  $(window).on('hashchange', function() {
    var hash = window.location.hash;
    $('[href^="#"').closest('[toggle-active]').removeClass('active');
    $('[href="' + hash + '"]').closest('[toggle-active]').addClass('active');
  });

}
