// Copyright (C) 2016 Joseph Edwards VIII <jedwards8th@gmail.com>
// License GPLV3
// Adds OpOrg functionality to org-ehtml and theme assets

var oporg_outline = {
  'outline-2': []
};

$(function() {
  $('.title').prepend('<i class="fa fa-connectdevelop logo"></i>');
});

function concat_outline_text(obj) {
  var eip_l = $(obj).find('.edit_in_place');
  var raw_l = $(obj).find('.raw-org');

  if (eip_l.length > 1 && raw_l.length > 1) {
    var first_eip = eip_l.eq(0);
    var first_raw = raw_l.eq(0);

    for (i=1; i<eip_l.length; i++) {
      first_eip.append(eip_l.eq(i).html());
      first_raw.append(raw_l.eq(i).html());
      first_raw.attr('contents-end', raw_l.eq(i).attr('contents-end'));
      eip_l.eq(i).remove();
      raw_l.eq(i).remove();
    }
  }
}

// From http://www.impressivewebs.com/textarea-auto-resize/
function set_autoresize(elt) {
  var txt = $(elt),
      hiddenDiv = $(document.createElement('div')),
      content = null;

  // txt.addClass('txtstuff');  // <-- WHY?!?
  hiddenDiv.addClass('hiddendiv common');
  $('body').append(hiddenDiv);

  // match widths
  txt.outerWidth(txt.parent().width());
  hiddenDiv.width(txt.width());

  txt.on('keyup', function () {
    content = $(this).val();
    content = content.replace(/\n/g, '<br>');
    hiddenDiv.html(content + '<br class="lbr">');
    $(this).css('height', hiddenDiv.height());
  });
}

function unset_autoresize() {
  $('.hiddendiv.common').remove();
}

function oporg_process_outline() {
  //handle special outline-2 (tabs)
  $('.outline-2').each(function(){
    oporg_outline['outline-2'].push({
      'level': 2,
      'id': $(this).attr('id'),
      'elt': this,
      'maxdepth': 12
    });
  });

  for (var i=0; i < oporg_outline['outline-2'].length; i++) {
    var ol2_i = oporg_outline['outline-2'][i];

    for (var olix=3; olix <= ol2_i['maxdepth']; olix++) {
      var subtree = $(ol2_i['elt']).find('.outline-'+olix);
      if (subtree.length === 0) continue;

      if (!oporg_outline['outline'+olix])
        oporg_outline['outline-'+olix] = [];

      subtree.each(function(){
        // concat consecutive raw-org divs in the outline-text-N
        subtree.find('div[class^="outline-text-"]').each(function(){
          concat_outline_text(this);
        });

        // make_sortable outline-container-orgheadline[N]
        $(this).addClass('sortable');

        // adding to the outline object
        oporg_outline['outline-'+olix].push({
          'level': olix,
          'id': $(this).attr('id'),
          'elt': this
        });
      });
    }
  }

  // activate sortable
  $('.sortable').sortable();
}