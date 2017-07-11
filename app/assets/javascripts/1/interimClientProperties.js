(function () {

    'use strict';

    var root = this, $ = root.jQuery;

    if (typeof VOA === 'undefined') {
        root.VOA = {};
    }

    var InterimClientProperties = function (){


        $(document).on('click', '#interimClientProperties thead tr#filterrow th input', function(e) {
           if (e.stopPropagation !== undefined) {
               e.stopPropagation();
           } else {
               e.cancelBubble = true;
           }
         });



        $('#interimClientProperties thead tr#filterrow th')
            .not('#interimClientProperties thead tr#filterrow th:eq(0), #interimClientProperties thead tr#filterrow th:eq(2), #interimClientProperties thead tr#filterrow th:eq(3), #interimClientProperties thead tr#filterrow th:eq(4)')
                .each( function () {
                    $(this).html( '<input type="search" class="filter-input" /><button class="icon"><i class="search-icon"></i></button>' );

            });

        $('#interimClientProperties thead tr#filterrow th:eq(4)').html('<a href="#" class="clear">Clear search</a>');


        var table = $('#interimClientProperties').DataTable({
            ajax: 'https://api.myjson.com/bins/uxfad',
            orderCellsTop: true,
            "lengthChange": false,
            //stateSave: true,
            "language": {
                "info": "Showing page _PAGE_ of _PAGES_",
                "lengthMenu": "Show _MENU_"
            },
            "aoColumns":[
                { "bSortable": false },
                { "bSortable": false },
                { "bSortable": false },
                { "bSortable": false, width: '130px' },
                { "bSortable": false, width: '120px'}
            ],
             'order': [[1, 'asc']],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(3)', nRow).html('<ul class="list list-actions"><li>Check: Yes</li><li>Challenge: No</li></ul>');
                $('td:eq(4)', nRow).html('<a href="/dashboard/1/valuations?client='+aData[2]+'&address='+aData[0]+'&ba='+aData[1]+'">Property details</a>');
            },
            initComplete: function( settings, json ) {
                //table.columns(0).search('ABC Agent').draw();
            },
            drawCallback: function( settings ) {

            }

        });


        $(document).on('click', '#interimClientProperties #filterrow button', function(e) {
            e.preventDefault();
            var i = $(this).closest('th').index();
            var value = $(this).prev().val();
            table.columns(i).search(value).draw();
            console.log(i)
        });

        $(document).on('click', '#interimClientProperties .clear', function(e) {
            e.preventDefault();
            $('#filterrow input').val('');
            table.columns(0).search('').draw();
            table.columns(1).search('').draw();
            table.columns(2).search('').draw();
            table.columns(3).search('').draw();
            table.columns(4).search('').draw();
        });


        $("#interimClientProperties thead input").on( 'keyup change', function (e) {
            if (e.keyCode == 13 || !this.value) {
                table.column( $(this).parent().index()+':visible' ).search( this.value ).draw();
            }
        });



    };

    root.VOA.InterimClientProperties = InterimClientProperties;

}).call(this);
