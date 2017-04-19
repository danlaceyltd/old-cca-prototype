(function (VOA, $) {
    //'use strict';

    $(document).ready(function() {
        new VOA.RadioToggleFields();
        new VOA.RadioToggleAdvanced();
        new VOA.JqueryFiler();
        new VOA.Pagination();
        new VOA.ShowDialog();
    });

}(window.VOA = window.VOA || {}, jQuery));
