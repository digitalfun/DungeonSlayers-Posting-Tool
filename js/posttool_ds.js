
<!--

/*
------------------------------
File: posttool_ds.js
Type: JavaScript
Author: Florian Schmid (LordSmith)
Company: private
Desc:
Creates Forum-Code for Play-By-Post Forum Roleplaying sessions.
This is a special version for Dungeonslayers.net Forum.

Last edit:
 *30.8.2011
------------------------------
 VERSION HISTORY:
 1.04: @createCode_Roll(): changed code for multiple rolls from "*" to "x" (1d20x2 = two times 1d20)
 1.03: @createCode_Roll(): added DS Forum-Symbols ( :kw5: etc)
 1.02: @createCode_OOC(): added [size]-tag
 1.01: added MIT-License
 1.00: Release
*/

/*
###########################
LICENSE START
"MIT License"
###########################
Copyright (c) 2011 Florian Markus Schmid (aka LordSmith aka DM Spry), Switzerland

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

###########################
LICENSE END
###########################

*/

/*
function createCode_Char ( ) {
	var sCode;
	
	var textChar = document.getElementById( "textChar");
	var textForum = document.getElementById( "textForum");
	sCode = ":ds: ";
	sCode += "[color=blue][b][size=12pt]";
	sCode += textChar.value;
	sCode += "[/size][/b][/color]\n";

	textForum.value += sCode;
	
return sCode;
};
*/

function createCode_Roll ( ) {
	var sCode;
	
	var textRoll = document.getElementById( "textRoll");
	var textRollTimes = document.getElementById( "textRollTimes");
	var textRollDesc = document.getElementById( "textRollDesc");
	var textProps = document.getElementById( "text_RollProperties");
	
	
	var textForum = document.getElementById( "textForum");

	sCode = "[roll]";
	sCode += "{";
	if( textRollDesc.value != "") sCode += textRollDesc.value +"; ";

	if( selectProbe.value != "leer") { 
		var theText = selectProbe.value.split(":"); 
				
		switch ( theText[ 0]) {
			case 'Schlagen': sCode += ":kw5: "; break;
			case 'Schiessen': sCode += ":kw6: "; break;
			case 'Abwehr': sCode += ":kw2: "; break;
			case 'Zaubern': sCode += ":kw7: "; break;
			case 'Zielzauber': sCode += ":kw8: "; break;
			
			default: sCode += theText[ 0]; 
		}
	}
	
	
	if( textProps.value != "") { 

		var nTotal = 0;
		var nCount = 0;
		var nPosStart = 0;
		var nPosEnd = 0;
		var sSearch = textProps.value;
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
		
		if( nCount == 1) sCode += " - " +textProps.value +" | ";
		else sCode += " - " +textProps.value +"= " +nTotal +" | ";
	} //if
	
	sCode += "}";
	sCode += textRoll.value + "x" + textRollTimes.value;
	sCode +="[/roll]\n";

	textForum.value += sCode;
return sCode;
};


function selectProbe_onChange() {
	var select = document.getElementById( "selectProbe");
	var textProps = document.getElementById( "text_RollProperties");
	var theProps = select.value;
	var sText = "";

	theProps = theProps.split(":");
	if( theProps.length == 1) return (false);
	theProps = theProps[ 1];
	theProps = theProps.split(",");
	for( x in theProps) {
		sText += theProps[ x] +"() ";
	}	

	textProps.value = sText;

return (true);
};


function createCode_Talk ( ) {
	var sCode;
	
	var textRoll = document.getElementById( "textTalk");
	
	var textForum = document.getElementById( "textForum");

	sCode = "[color=blue]>>";
	sCode += textTalk.value;
	sCode +="<<[/color]\n";

	textForum.value += sCode;
return sCode;
};

function createCode_Thought ( ) {
	var sCode;
	
	var textRoll = document.getElementById( "textThought");
	
	var textForum = document.getElementById( "textForum");

	sCode = "[i]>>";
	sCode += textThought.value;
	sCode +="<<[/i]\n";

	textForum.value += sCode;
return sCode;
};

function createCode_Action ( ) {
	var sCode;
	
	var textForum = document.getElementById( "textForum");

	sCode = "[color=green]*";
	sCode += selectAction.value;
	sCode +="*[/color]\n";

	textForum.value += sCode;
return sCode;
};

/*
function createCode_OOC ( ) {
	var sCode;
	
	var textRoll = document.getElementById( "textOOC");
	
	var textForum = document.getElementById( "textForum");

	sCode = "[color=red][size=8pt][i]OOC: ";
	sCode += textOOC.value;
	sCode +="[/i][/size][/color]\n";

	textForum.value += sCode;
return sCode;
};
*/


-->