/*
 * This class is part of the DungeonSlayers Forum Post Tool
 *
 * Copyright 2011, DSFPT Dev Team (see README)
 *
 * File: posttool.js
 * Type: JavaScript
 *
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */


      /*
       * Config JSON Object
       * 
       *  TODO: Move to separate file
       */
      config= {
        /*
         * Text Snippets for different text bricks
         */
        snippets: {
          'Character name': ':ds: [color=blue][b][size=12pt]{text}[/size][/b][/color]\n',
          'OOC'   : '[color=red][size=8pt][i]OOC: {text}[/i][/size][/color]\n',
          'Say'   : '[color=blue]>>{text}<<[/color]\n',
          'Think' : '[i]>>{text}<<[/i]\n',
          'Roll'  : '[roll] {{text}} {dice}[/roll]\n',
          'Plain' : '{text}\n'
        },
        /*
         * Text colors for displaying the text bricks in the UI
         */
        colors: {
          'Character name': 'blue',
          'OOC' : 'red',
          'Say'   : 'lightblue',
          'Think' : 'green',
          'Roll'  : 'yellow',
          'Plain' : 'white'
        }
      }

      /*
       * update source field
       *
       * @param void
       * @return void
       */
      function updateSource() {
        var source='';

        // iterate all text bricks in the sortable list
        $('#sortableSaylist').children().each(
          function(index){
            // collect the brick's source
            source+= decodeURI($(this).attr('source'));
          }
        );

        //store complete source to hidden textarea
        $('textarea#source').html(source);
      }

      /*
       * build a text brick
       *
       * Source returned:
       *   <li class="ui-state-default ui-corner-all"
       *         source="{source}"
       *         type="{type}"
       *         timestamp="{timestamp}"
       *   >
       *      <span class="ui-icon ui-icon-arrowthick-2-n-s front"></span>
       *      <span class="text" style="color:{color};">
       *      <span class="ui-icon ui-icon-close floatright back2">
       *      <span class="ui-icon ui-icon-pencil floatright back1">
       *   </li>
       *
       * @param text   string text of the brick to be displayed in UI
       * @param source string BB source of the text brick
       * @param color  string colour to use to display text in UI
       * @param type   string type of text brick
       *
       */
      function createTextBrick(text, source, color, type) {
        textbrick= $('<li class="ui-state-default ui-corner-all">');
        textbrick.attr('source', encodeURI(source));
        textbrick.attr('type', type);
        textbrick.attr('timestamp', (new Date).getTime());
        textbrick.append('<span class="ui-icon ui-icon-arrowthick-2-n-s front">');
        textbrick.append(
            $('<span class="text" style="color:'+color+';">').text(text)
        );
        textbrick.append(
            $('<span class="ui-icon ui-icon-close floatright back2">')
                // attach "onclick" event handler to delete brick
                .click(function(event){
                    $(event.currentTarget).parent().remove();
                })
        );
        textbrick.append(
            $('<span class="ui-icon ui-icon-pencil floatright back1">')
                // attach "onclick" event handler to edit brick
                .click(function(event){
                    // preset edit form fields from brick data
                    $('input#type').val(
                        $(event.currentTarget).parent().attr('type')
                    );
                    $('input#type').change();
                    $('textarea#textAll').val(
                        $(event.currentTarget).siblings('span.text').text()
                    );
                    $('input#edit').val(
                        $(event.currentTarget).parent().attr('timestamp')
                    );

                    $("#dialog-form").dialog('open');
                })
        );

        // add brick to list
        // TODO: does this belong into this function??
        textbrick.appendTo($('#sortableSaylist'));
        return textbrick;
      }

      /*
       * get the code template from the config and replace placeholder
       * with brick text
       *
       * @param text    string brick text from input form
       * @param snippet string snippet key as reference to config
       * @return string BB code
       */
      function createCode(text, snippet) {
        return config.snippets[snippet].replace(/\{text\}/g, text);
      };

      /*
       * get the color value flom config
       *
       * @param type string key to look up the color
       * @returns string HTML color value from config
       *
       */
      function getColor(type) {
        return config.colors[type];
      }

      /*
       * assemble text to be displayed on roll bricks
       *
       * @param string times number of times to roll
       * @param string dice number and type of dice to roll e.g. "3d20"
       * @param string desc description text
       * @param string prop properties of the roll
       * @returns string text to be displayed on brick
       *
       * @TODO: get text snippet from config
       * @TODO: param checking
       */
      function createRollInput(times, dice, desc, prop) {
          return 'roll '+times+' times '+dice+' with text "'+desc+'" values '+prop;
      }

      /*
       * @param string times number of times to roll
       * @param string dice number and type of dice to roll e.g. "3d20"
       * @param string desc description text
       * @param string select value of roll type dropdown select
       * @param string prop properties of the roll
       * @returns string BB code of the brick
       *
       * @TODO: much to big and complicated needs refactoring
       */
      function createRollCode(times, dice, desc, select, prop) {
        var sCode;

        sCode = "[roll]";
        sCode += "{";
        if(desc != "") sCode += desc +"; ";

        if(select != "leer") {
            var theText = select.split(":");

            switch (theText[0]) {
                case 'Schlagen': sCode += ":kw5: "; break;
                case 'Schiessen': sCode += ":kw6: "; break;
                case 'Abwehr': sCode += ":kw2: "; break;
                case 'Zaubern': sCode += ":kw7: "; break;
                case 'Zielzauber': sCode += ":kw8: "; break;

                default: sCode += theText[ 0];
            }
        }

        if(prop != "") {
            var nTotal = 0;
            var nCount = 0;
            var nPosStart = 0;
            var nPosEnd = 0;
            var sSearch = prop;
            var nResult = 0;

            //loop all "(xx)"
            nPosStart = sSearch.indexOf( "(");
            while ( nPosStart != -1) {
                //if no ")" (closing) found, exit
                nPosEnd = sSearch.indexOf( ")");
                if( nPosEnd == -1) break;

                nCount++;
                nPosStart++;
                nResult = parseInt( sSearch.substr( nPosStart, nPosEnd));
                if( isNaN( nResult) == false) {
                        nTotal += nResult;
                }
                nPosEnd++;
                sSearch = sSearch.substring( nPosEnd);
                nPosStart = sSearch.indexOf( "(");
            } //while

            if( nCount == 1) sCode += " - " +prop +" | ";
            else sCode += " - " + prop +"= " +nTotal +" | ";
        } //if

        sCode += "}";
        sCode += dice + "x" + times;
        sCode +="[/roll]\n";

        return sCode;
      }

      //get the form values and bake a brick
      function saveBrick(){
        var type, input, brick, list, edit, code;

        edit=  $('input#edit').val();
        type=  $('input#type').val();

        if (type == 'Roll') {
            input= createRollInput(
                $("input#textRollTimes").val(),
                $("input#textRoll").val(),
                $("input#textRollDesc").val(),
                $("input#textRollProperties").val()
            );
            code= createRollCode(
                $("input#textRollTimes").val(),
                $("input#textRolloll").val(),
                $("input#textRollDesc").val(),
                $("select").val(),
                $("input#textRollProperties").val()
            );
        } else {
            input= $('textarea#textAll').val();
            code= createCode(input, type);
        }

        brick= createTextBrick(
            input,
            code,
            getColor(type),
            type
        );
        list= $('#sortableSaylist');

        if (edit != "") {
            list.children('li[timestamp='+edit+']').replaceWith(brick)
        } else {
            list.append(brick);
        }

        $('input#edit').val('');
        updateSource();
      };

      // setup UI events
      $(document).ready(function(){
        // Sortable
        $( "#sortableSaylist").sortable({
            placeholder: "ui-state-highlight",
            change: function(event, ui) {
              updateSource();
            }
        });
        $( "#sortableSaylist").disableSelection();

        $('input#type').change(function(){
            // do something to set buttons correctly

            var type= $('input#type').val();

            $('span.ui-button-text:contains("'+type+'")').parent().siblings().removeClass('ui-state-selected');
            $('span.ui-button-text:contains("'+type+'")').parent().addClass('ui-state-selected');

            if (type=="Roll") {
                $('textarea#textAll').hide();
                $('div#rollform').show();
            } else {
                $('textarea#textAll').show();
                $('div#rollform').hide();
            }
        });


        $("#dialog-form").dialog({
          autoOpen: false,
          height: 140,
          width: 570,
          modal: true,
          buttons: {
            'Character name': function(event) {
              $('input#type').val('Character name');
              $('input#type').change();
            },
            'OOC': function() {
              $('input#type').val('OOC');
              $('input#type').change();
            },
            'Say': function() {
              $('input#type').val('Say');
              $('input#type').change();
            },
            'Think': function() {
              $('input#type').val('Think');
              $('input#type').change();
            },
            'Roll': function() {
              $('input#type').val('Roll');
              $('input#type').change();
            },
            'Plain': function() {
              $('input#type').val('Plain');
              $('input#type').change();
            },
            "Save Brick": function() {
               saveBrick();
               $(this).dialog("close");
            },
            Cancel: function() {
              $(this).dialog("close");
            }
          },
          create: function(event, ui) {
            // fix button pane
            $('span.ui-button-text:contains("Plain")').parent().css('margin-right', '25px');
            $('input#type').val('Character name');
            $('input#type').change();
          }
        });

        //roll selectbox
        $('select').change(function(){
            var theProps = $(this).val();
            var sText = "";

            theProps = theProps.split(":");
            if(theProps.length == 1) return (false);
            theProps = theProps[1].split(",");
            for(x in theProps) {
            sText += theProps[x] +"() ";
            }

            $('#text_RollProperties').val(sText);

            return (true);
        });


        // buttons
        $('#add').button().click(function(){
            $( "#dialog-form" ).dialog("open");
        });

        $('#view').button().click(function(){
            alert($('textarea#source').val());
        });

        $('a#post').button().zclip({
            path: "ZeroClipboard.swf",
            copy: function(){
                return 'foo'
            }
        });

      });