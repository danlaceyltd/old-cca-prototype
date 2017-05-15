(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var PropertiesTableSmall = function (){

        $(document).on('click', '#propertiesTableSmall thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#propertiesTableSmall thead tr#filterrow th')
            .not('#propertiesTableSmall thead tr#filterrow th:eq(3)')
                .each( function () {
                    $(this).html( '<input type="search" />' );
            });


        var table = $('#propertiesTableSmall').DataTable({
            ajax: 'https://api.myjson.com/bins/19tkll',//'https://api.myjson.com/bins/tx94l',//'https://api.myjson.com/bins/ctm8p',//'https://api.myjson.com/bins/g3i2h',//'https://api.myjson.com/bins/l6y8h',
            orderCellsTop: true,
/*
            initComplete: function () {
                this.api().columns(2).every( function () {
                    var column = this;
                    var select = $('<select><option value=""></option></select>')
                        .appendTo( $('#propertiesTableSmall thead tr#filterrow th:eq(2)') )
                        .on( 'change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search( val ? '^'+val+'$' : '', true, false )
                                .draw();
                        } );

                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                });

            },
*/
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

                //$('td:eq(0)', nRow).html('<a href="/dashboard/2/property-details?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'">'+aData[0]+'</a>');

                if(aData[3] === 'y'){
                    $('td:eq(3)', nRow).html('<ul class="list list-actions"><li><a href="#">Accept client request</a></li><li><a href="#">Reject client request</a></li></ul>');
                }else if(aData[4] === "Pending"){
                        $('td:eq(3)', nRow).html('<a href="/dashboard/2/agent-small/pending?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'">Pending VOA approval</a>');
                }else{
                    $('td:eq(3)', nRow).html('<a href="/dashboard/2/agent-small/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'">Property details</a>');
                }


                //$('td:eq(2)', nRow).html('<a href="/dashboard/2/manage-agents">'+aData[2]+'</a>');
            }
        });

        $("#propertiesTableSmall thead input").on( 'keyup change', function (e) {
            if (e.keyCode == 13 || !this.value) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });

/*
        $('#propertiesTableSmall').closest('.table-wrapper').find('.dataTables_filter').empty().append('<a href="#">Show filters</a>');


        $(document).on('click', '#propertiesTableSmall_filter a', function(e) {
            e.preventDefault();
            $('#propertiesTableSmall thead tr#filterrow').toggle();
            $(this).text(function(i, text){
                return text === 'Show filters' ? 'Hide filters' : 'Show filters';
            });
        });
*/
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

        $('.data-filter').insertBefore($('#propertiesTableSmall'));


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

    root.VOA.PropertiesTableSmall = PropertiesTableSmall;

}).call(this);
