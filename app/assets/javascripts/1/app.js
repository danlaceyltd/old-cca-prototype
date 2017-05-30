(function (VOA, $) {
    //'use strict';

    $(document).ready(function() {
        new VOA.RadioToggleFields();
        new VOA.RadioToggleAdvanced();
        new VOA.JqueryFiler();
        new VOA.ShowDialog();
        new VOA.Pagination();
        new VOA.CheckWizard();
        new VOA.ChallengeWizard();
    });

}(window.VOA = window.VOA || {}, jQuery));
