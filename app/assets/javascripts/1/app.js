(function (VOA, $) {
    //'use strict';

    $(document).ready(function() {
        new VOA.RadioToggleFields();
        new VOA.RadioToggleAdvanced();
        new VOA.JqueryFiler();
        new VOA.ShowDialog();
        new VOA.Pagination();
        new VOA.CheckWizard();
    });

}(window.VOA = window.VOA || {}, jQuery));
