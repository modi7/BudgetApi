'use strict';

module.exports = function (Soldemois) {
	//
	Soldemois.observe('loaded', function logQuery(ctx, next) {
		if (ctx.Model.myResult) {
			ctx.instance.__data = ctx.Model.myResult;
		}
		//console.log( JSON.stringify(ctx.instance.__data));
		next();
	});

	Soldemois.observe('access', function logQuery1(ctx, next) {
		var sWhere = {
			CompteId: 0
		};
		if (!ctx.query.where) {
			next();
			return;
		}
		var sId = ctx.query.where.id.toString();
		sWhere.CompteId = sId.substring(0, 1);
		//	sWhere.Year = sId.substring(1, 5);
		//	sWhere.Month = sId.substring(5, sId.length);

		var sSqlRequest = "SELECT 'SoldeDebut' as Colonne, SUM( ifnull(Ecriture.Credit,0) - ifnull(Ecriture.Debit,0))  as montant FROM Ecriture Where CompteId = vCompteId  and ( Year = vYearId and Month < vMonthId or  ( Year < vYearId ))" +
			" union " +
			"SELECT 'Depense' as Colonne, SUM(Debit) as montant FROM Ecriture inner join Affectation on Ecriture.AffectationId = Affectation.id   where CompteId = vCompteId  and Year = vYearId and Month = vMonthId and Kind <> 'P' and ( Carte is null  or Carte = 'C' )" +
			" union " +
			"SELECT 'Epargne' as Colonne, SUM( ifnull(Ecriture.Debit,0) - ifnull(Ecriture.Credit,0))  as montant FROM Ecriture inner join Affectation on Ecriture.AffectationId = Affectation.id   where CompteId = vCompteId  and Year = vYearId and Month = vMonthId and Kind = 'P'" +
			" union " +
			"SELECT 'Carte' as Colonne, SUM( ifnull(Ecriture.Debit,0) - ifnull(Ecriture.Credit,0))  as montant FROM Ecriture  where CompteId = vCompteId  and Year = vYearId and Month = vMonthId and  Carte is not null " +
			" union " +
			"SELECT 'Entrees' as Colonne, SUM(Credit) as montant FROM Ecriture inner join Affectation on Ecriture.AffectationId = Affectation.id   where CompteId = vCompteId  and Year = vYearId and Month = vMonthId and Kind <> 'P'" +
			" union " +
			"Select 'CarteDebite' as Colonne, Count(Carte) as montant from Ecriture where CompteId = vCompteId  and Year = vYearId and Month = vMonthId and Carte = 'C' ";

		sSqlRequest = sSqlRequest.replace(/vCompteId/g, sId.substring(0, 1));
		sSqlRequest = sSqlRequest.replace(/vYearId/g, sId.substring(1, 5));
		sSqlRequest = sSqlRequest.replace(/vMonthId/g, sId.substring(5, sId.length));
		var oConnector = ctx.Model.getConnector();
		var db = oConnector.client;
		db.all(sSqlRequest, function (err, rows) {

			var myResult = {};
			myResult.CompteId = parseInt(sId.substring(0, 1));
			myResult.Year = parseInt(sId.substring(1, 5));
			myResult.Month = parseInt(sId.substring(5, sId.length));
			myResult.id = parseInt(sId);
			if (rows) {
				rows.forEach(function (item) {

					myResult[item.Colonne] = item.montant ? item.montant : parseFloat(0);

				})
				console.log(JSON.stringify(myResult));
				myResult.SoldeFin = myResult.CarteDebite > 0 ? myResult.SoldeDebut + myResult.Entrees - myResult.Depense - myResult.Epargne : myResult.SoldeDebut + myResult.Entrees - myResult.Depense - myResult.Epargne - myResult.Carte;
				myResult.SoldeInt = myResult.CarteDebite > 0 ? myResult.SoldeFin : myResult.SoldeFin + myResult.Carte;

				ctx.Model.myResult = myResult;

				ctx.query.where = sWhere;

				//console.log(JSON.stringify(myResult)+ "\n");
				next();
			}
		});

	});

};
//

/*
var file = "hr";
var db = new sqlite3.Database(file);
db.all("SELECT first_name,last_name FROM employees", function(err, rows) {
rows.forEach(function (row) {
console.log(row.first_name, row.last_name);
})
});
db.close(); */
