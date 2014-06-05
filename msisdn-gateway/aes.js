/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var sodium = require("sodium");


/**
 * Take an hawkId and a MSISDN and encrypt them as a string
 */
function encrypt(hawkId, msisdn) {
  // Handle null
  if (msisdn === null) {
    return null;
  }
  var box = new sodium.SecretBox(hawkId);
  var encrypted = box.encrypt(msisdn, "utf8");
  var data = {
    cipherText: encrypted.cipherText.toString("base64"),
    nonce: encrypted.nonce.toString("base64")
  };
  return JSON.stringify(data);
}

/**
 * Take an hawkId and an encrypted string and decrypt them
 */
function decrypt(hawkId, encryptedString) {
  // Handle null
  if (encryptedString === null) {
    return null;
  }

  var encrypted = JSON.parse(encryptedString);
  encrypted.cipherText = new Buffer(encrypted.cipherText, "base64");
  encrypted.nonce = new Buffer(encrypted.nonce, "base64");
  var box = new sodium.SecretBox(hawkId);
  return box.decrypt(encrypted, "utf8");
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};
