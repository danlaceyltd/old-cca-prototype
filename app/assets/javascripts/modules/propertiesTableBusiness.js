(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var PropertiesTableBusiness = function (){

        $(document).on('click', '#propertiesTableBusiness thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#propertiesTableBusiness thead tr#filterrow th')
            .not('#propertiesTableBusiness thead tr#filterrow th:eq(3)')
                .each( function () {
                    $(this).html( '<input type="search" />' );
            });


        var table = $('#propertiesTableBusiness').DataTable({
            orderCellsTop: true,
            "language": {
                "info": "Showing page _PAGE_ of _PAGES_",
                "lengthMenu": "Show _MENU_"
            },
            "aoColumns": [
             null,
             null,
              null,
               { "bSortable": false },
               { "bSortable": false, "visible": false   }
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if(!aData[2]){
                    $('td:eq(2)', nRow).html('<a href="/dashboard/2/business/appoint-agent">Appoint agent</a>');
                }

                if(aData[4] === "Approved"){
                    $('td:eq(3)', nRow).html('<a href="/dashboard/2/business/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'">Property details</a>');
                }else if(aData[4] === "Pending"){
                    $('td:eq(3)', nRow).html('<a href="/dashboard/2/business/pending">Pending VOA approval</a>');
                }
            }
        });

        $("#propertiesTableBusiness thead input").on( 'keyup change', function (e) {
            if (e.keyCode == 13 || !this.value) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });


        $(document).on('click', '.data-filter a', function(e) {
            $('.data-filter a').removeClass('current');
            $(this).addClass('current');
            if($(this).attr('data-filter') === 'all'){
                table.columns(4).search('').draw();
                table.columns(2).search('').draw();
            }else if($(this).attr('data-filter') === 'MNO Client'){
                table.columns(2).search($(this).attr('data-filter')).draw();
                table.columns(4).search('').draw();
            }
            else {
                table.columns(4).search($(this).attr('data-filter')).draw();
                table.columns(2).search('').draw();
            }
        });

        $('.data-filter').insertBefore($('#propertiesTableBusiness'));


        //property-details


        function getUrlVars(){
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = decodeURI(hash[1]);
            }
            return vars;
        }


        $('.property-address').text(getUrlVars()["address"]);
        $('.property-client-name').text(getUrlVars()["client"]);
        $('.property-ba-ref').text(getUrlVars()["ba"]);



    };

    root.VOA.PropertiesTableBusiness = PropertiesTableBusiness;

}).call(this);
