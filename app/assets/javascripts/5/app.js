(function (VOA, $) {
    //'use strict';

    $(document).ready(function() {
        new VOA.RadioToggleFields();
        new VOA.RadioToggleAdvanced();
        new VOA.JqueryFiler();
        new VOA.ShowDialog();
        new VOA.PropertiesTable();
        new VOA.myPropertiesTable();
        new VOA.PropertiesTableBusiness();
        new VOA.PropertiesTableBusinessSmall();
        new VOA.DraftsTable();
    });

}(window.VOA = window.VOA || {}, jQuery));
