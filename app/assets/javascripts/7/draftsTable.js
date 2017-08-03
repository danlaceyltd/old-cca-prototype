(function() {

  'use strict';

  var root = this,
    $ = root.jQuery;

  if (typeof VOA === 'undefined') {
    root.VOA = {};
  }

  var DraftsTable = function() {



    $(document).on('click', '#draftsTable thead tr#filterrow th input', function(e) {
      if (e.stopPropagation !== undefined) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    });



    $('#draftsTable thead tr#filterrow th')
      .not('#draftsTable thead tr#filterrow th:eq(2), #draftsTable thead tr#filterrow th:eq(3), #draftsTable thead tr#filterrow th:eq(4), #draftsTable thead tr#filterrow th:eq(5)')
      .each(function() {
        $(this).html('<input type="search" class="filter-input" /><button class="icon"><i class="search-icon"></i></button>');
      });

    $('#draftsTable thead tr#filterrow th:eq(5)').html('<a href="#" class="clear">Clear search</a>');


    var table = $('#draftsTable').DataTable({
      orderCellsTop: true,

      "language": {
        "info": "Showing page _PAGE_ of _PAGES_",
        "lengthMenu": "Show _MENU_"
      },
      "aoColumns": [
		  null,
        null,
        null,
        
        null,
        {
          "bSortable": false
        }
      ],
      fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {


        //$('td:eq(1)', nRow).html('<a href="/dashboard/2/manage-clients">'+aData[1]+'</a>');
        //$('td:eq(2)', nRow).html('<a href="/dashboard/2/valuations">Property details</a>');

      }
    });

    $("#draftsTable thead input").on('keyup change', function(e) {
      if (e.keyCode == 13) {
        table.column($(this).parent().index() + ':visible').search(this.value).draw();
      }
    });

    $("#draftsTable thead input").on('input', function(e) {
      if (!this.value) {
        table.column($(this).parent().index() + ':visible').search(this.value).draw();
      }
    });

    $(document).on('click', '#draftsTable #filterrow button', function(e) {
      e.preventDefault();
      var i = $(this).closest('th').index();
      var value = $(this).prev().val();
      table.columns(i).search(value).draw();
    });

    $(document).on('click', '#draftsTable .clear', function(e) {
      e.preventDefault();
      $('#filterrow input').val('');
      table.columns(0).search('').draw();
      table.columns(1).search('').draw();
    });

    // Somme's original code to filter on click of a link (see version 5)

    // $(document).on('click', '#draftsTable_wrapper .data-filter li:not(".claim-property") a', function(e) {
    //     $('.data-filter li:not(".claim-property") a').removeClass('current');
    //     $(this).addClass('current');
    //
    //     table.columns(3).search($(this).attr('data-filter')).draw();
    //     $('#draftsTable .filter').text($(this).attr('data-filter').toLowerCase());
    //
    // });

    // Filters based on user's choice of all/check/challenge cases. Inserts words and adjusts grammar accordingly.
    $(document).ready(function() {
      $('input[type=radio][name=draftType]').change(function() {
        table.columns(2).search($(this).attr('data-filter')).draw();
        $('#draftsTable .count').text(count());
        if (this.value == 'check') {
          $('#draftsTable .filter').text(' check');
        } else if (this.value == 'challenge') {
          $('#draftsTable .filter').text(' challenge');
        } else {
          $('#draftsTable .filter').text('');
        }
        if (count() == 1) {
          $('#draftsTable .filterPlurality').text('case');
        } else {
          $('#draftsTable .filterPlurality').text('cases');
        }
      });
    });

    // Counts number of records currently being displayed
    function count() {
      if (table.page.info()) {
        return table.page.info().recordsDisplay
      }
    }

    // Somme's original code that initially filters the table by Check cases

    // table.columns(3).search('Check').draw();

    $('#draftsTable .count').text(count());
    $('#draftsTable .filter').text('');
    $('#draftsTable .filterPlurality').text('cases');

    $('.data-filter').insertBefore($('#draftsTable'));

    $('#draftsTable_length').insertAfter($('#draftsTable_info')).css({
      'float': 'none',
      'margin-left': '30px',
      'display': 'inline-block',
      'margin-top': '13px'
    });
    $('#draftsTable_paginate').css({
      'margin-top': '8px',
      'margin-right': '-10px'
    });

  };

  root.VOA.DraftsTable = DraftsTable;

}).call(this);
