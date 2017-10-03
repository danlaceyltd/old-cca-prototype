(function() {

  'use strict';

  var root = this,
    $ = root.jQuery;

  if (typeof VOA === 'undefined') {
    root.VOA = {};
  }

  var MessagesTable = function() {



    $(document).on('click', '#messagesTable thead tr#filterrow th input', function(e) {
      if (e.stopPropagation !== undefined) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    });



    $('#messagesTable thead tr#filterrow th')
      .not('#messagesTable thead tr#filterrow th:eq(0),#messagesTable thead tr#filterrow th:eq(5)')
      .each(function() {
        $(this).html('<label for="inputID" class="visuallyhidden">[LABEL]</label><input type="search" class="filter-input" /><button class="icon icon-filters"><i class="search-icon"></i><span class="visuallyhidden">BUTTON TITLE</span></button>');
      });

    $('#messagesTable thead tr#filterrow th:eq(6)').html('<a href="#" class="clear">Clear search</a>');


    var table = $('#messagesTable').DataTable({
      orderCellsTop: true,
		searching: true,
      "language": {
        "info": "Showing page _PAGE_ of _PAGES_",
        "lengthMenu": "Show _MENU_"
		 
      },
		 "lengthMenu": [[10, 30, 45, -1], [10,30, 45, "All"]],
		"pageLength": 10,
      "aoColumns": [
		  null,
        null,
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

    $("#messagesTable thead input").on('keyup change', function(e) {
      if (e.keyCode == 13) {
        table.column($(this).parent().index() + ':visible').search(this.value).draw();
      }
    });

    $("#messagesTable thead input").on('input', function(e) {
      if (!this.value) {
        table.column($(this).parent().index() + ':visible').search(this.value).draw();
      }
    });

    $(document).on('click', '#messagesTable #filterrow button', function(e) {
      e.preventDefault();
      var i = $(this).closest('th').index();
      var value = $(this).prev().val();
      table.columns(i).search(value).draw();
    });

    $(document).on('click', '#messagesTable .clear', function(e) {
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

    $('messagesTable .count').text(count());
    $('#messagesTable .filter').text('');
    $('#messagesTable .filterPlurality').text('cases');

    $('.data-filter').insertBefore($('#messagesTable'));

    $('#messagesTable_length').insertAfter($('#messagesTable_info')).css({
      'float': 'none',
      'margin-left': '30px',
      'display': 'inline-block',
      'margin-top': '13px'
    });
    $('#messagesTable_paginate').css({
      'margin-top': '8px',
      'margin-right': '-10px'
    });

  };

  root.VOA.MessagesTable = MessagesTable;

}).call(this);
