sap.ui.define([], function() {
	"use strict";

	return {

		onCCDetermination: function(oEvent) {
			/** @type sap.m.routing.Router */
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detAffectation");
			//oRouter.getTargets().display("detAffectation");
		},
		
		onCharts: function(oEvent) {
			/** @type sap.m.routing.Router */
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("charts");
			//oRouter.getTargets().display("detAffectation");
		}
	};

});