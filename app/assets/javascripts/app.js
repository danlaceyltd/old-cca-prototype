(function (VOA, $) {
    //'use strict';

    $(document).ready(function() {
        new VOA.RadioToggleFields();
        new VOA.RadioToggleAdvanced();
        new VOA.JqueryFiler();
        new VOA.Pagination();
        new VOA.ShowDialog();
        new VOA.PropertiesTable();
        new VOA.PropertiesTableBusiness();
        new VOA.ClientsTable();
        new VOA.DraftsTable();
    });

}(window.VOA = window.VOA || {}, jQuery));
