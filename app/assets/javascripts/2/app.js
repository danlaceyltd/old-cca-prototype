(function (VOA, $) {
    //'use strict';

    $(document).ready(function() {
        new VOA.RadioToggleFields();
        new VOA.RadioToggleAdvanced();
        new VOA.JqueryFiler();
        new VOA.ShowDialog();
        new VOA.PropertiesTable();
        new VOA.PropertiesTableSmall();
        new VOA.PropertiesTableBusiness();
        new VOA.PropertiesTableBusinessSmall();
        new VOA.ClientsTable();
        new VOA.DraftsTable();
    });

}(window.VOA = window.VOA || {}, jQuery));
