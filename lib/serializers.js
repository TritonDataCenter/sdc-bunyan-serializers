/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2015, Joyent, Inc.
 */

/*
 * agent log serializers
 */

var restify = require('restify');



var serializers = {};
var stdSerializers = restify.bunyan.serializers;


/*
 * Serialize an error, including extra fields that we may get from our APIs
 * for debugging
 */
function errSerializer(err) {
    var obj = stdSerializers.err(err);
    if (!obj) {
        /*jsl:ignore*/
        return;
        /*jsl:end*/
    }

    if (err.body && typeof (err.body) === 'object') {
        obj.errors = err.body.errors;
        obj.code = err.body.code;
    }

    return obj;
}


for (var s in stdSerializers) {
    if (s === 'err') {
        continue;
    }

    serializers[s] = stdSerializers[s];
}

serializers.err = errSerializer;


/**
 * Extend a base set of serializers with our built-in ones
 */
function extendSerializers(base) {
    var newSet = {};
    var ser;

    for (ser in base) {
        newSet[ser] = base[ser];
    }

    for (ser in serializers) {
        newSet[ser] = serializers[ser];
    }

    return newSet;
}



module.exports = {
    extend: extendSerializers,
    serializers: serializers
};
