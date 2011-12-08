/*
 * This file is part of the DungeonSlayers Forum Post Tool
 *
 * Copyright 2011, DSFPT Dev Team (see README)
 *
 * File: tests.js
 * Type: JavaScript
 *
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

module("Modul abc", {
    setup: function () {
        // setup
    },
    teardown: function () {
        // teardown
    }
});

test("a basic test example", function() {
  ok( true, "this test is fine" );
  var value = "hello";
  equal( value, "hello", "We expect value to be hello" );
});