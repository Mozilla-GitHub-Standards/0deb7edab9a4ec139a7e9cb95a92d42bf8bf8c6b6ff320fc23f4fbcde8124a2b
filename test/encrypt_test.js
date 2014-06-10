/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var expect = require("chai").expect;
var crypto = require("crypto");
var encrypt = require("../msisdn-gateway/encrypt");

describe("ENCRYPT", function() {
  describe("#encrypt/#decrypt", function() {
    it("should be able to encrypt and decrypt a string", function() {
      var hawkHmacId = crypto.randomBytes(32).toString("hex");
      var text = "Bonjour les gens";
      var encrypted = encrypt.encrypt(hawkHmacId, text);
      var decrypted = encrypt.decrypt(hawkHmacId, encrypted);
      expect(decrypted).to.eql(text);
    });
  });
});
