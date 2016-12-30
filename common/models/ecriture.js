'use strict';

module.exports = function(Ecriture) {
    Ecriture.includeCard = function(data, cb) {
        data.Carte = "O";
        Ecriture.updateAll(data, { Carte: "C" }, function(err, info) {
            if (err) return cb(err);
            cb(null, info, 'application/json');
        });

    };

    Ecriture.remoteMethod('includeCard', {
        accepts: [
            { arg: 'data', type: 'object', http: { source: 'body' } }
        ],
        description: 'Include credit card to depense',
        http: { path: '/includeCard', verb: 'post' },
        returns: [
            { arg: 'body', type: 'object', root: true },
            { arg: 'Content-Type', type: 'string', http: { target: 'header' } }
        ]
    });
};