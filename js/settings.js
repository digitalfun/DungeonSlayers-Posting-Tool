/*
 * This file is part of the DungeonSlayers Forum Post Tool
 *
 * Copyright 2011, DSFPT Dev Team (see README)
 *
 * File: settings.js
 * Type: JavaScript
 *
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


/*
 * Config JSON Object
 *
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