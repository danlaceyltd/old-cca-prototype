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
        new VOA.InterimProperties();
        new VOA.InterimClientProperties();
        new VOA.DraftsTable();
    });

}(window.VOA = window.VOA || {}, jQuery));
