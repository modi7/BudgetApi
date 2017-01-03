module.exports = function(app) {
    app.dataSources.sqlite3.connector.observe('after execute', function(ctx, next) {
        try {
            if (ctx.req.sql.indexOf("RepartitionAff") !== -1) {
                var newRespone = ctx.res // Add your changes here.
                var fTotal = ctx.res.reduce(function(sum, item) {
                    return sum + item.Debit;
                }, 0);
                ctx.res.forEach(function(item) {
                    item.Pourcentage = 100 * item.Debit / fTotal;
                });
            }
        } catch (error) {

        }

        next();
        //   ctx.end(err, ctx, response);
    });
};