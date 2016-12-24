sap.ui.define([
    "budget/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "budget/model/formatter",
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format'	
], function(BaseController, JSONModel, History, Filter, FilterOperator, formatter, ChartFormatter, Format) {
	"use strict";

	return BaseController.extend("budget.controller.Charts", {
        formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf budget.client..view.Charts
		 */
			onInit: function() {
		
		            this._initViz();
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf budget.client..view.Charts
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf budget.client..view.Charts
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf budget.client..view.Charts
		 */
		//	onExit: function() {
		//
		//	}
        onSelectionChange: function() {
            //This code was generated by the layout editor.
            var oFilter = new Filter({
                filters: [
                    new Filter({
                        path: "Year",
                        operator: "EQ",
                        value1: 2016
                    }),
                    new Filter({
                        path: "CompteId",
                        operator: "EQ",
                        value1: 2
                    })
                ],
                and: true
            });
			this.byId("vizData").getBinding("data").filter(oFilter);
			this.byId("vizDataRep").getBinding("data").filter(oFilter);
        },

		        _initViz: function() {

            var oVizFrameYear = this.oVizFrame = this.getView().byId("idVizYear");
			var oVizFrameRep = this.oVizFrame = this.getView().byId("idVizRep");
            //	var oPopOver = this.getView().byId("idPopOver");
            //	oPopOver.connect(oVizFrame.getVizUid());
            //	oPopOver.setFormatString("__UI5__FloatMaxFraction2");
            oVizFrameYear.setVizProperties({
                title: {
                    visible: false,
                    text: 'Répartition'
                },
                interaction: {
                    behaviorType: null,
                    selectability: {
                        mode: "SINGLE"
                    }
                },
                tooltip: {
                    visible: false,
                    formatString: "__UI5__FloatMaxFraction2",
                    bodyDimensionLabel: "Type",
                    bodyDimensionValue: "Type",
                    bodyMesureValue:"Crédit",
                     bodyMesureLabel:"Crédit",
                },
                legend: {
                    visible: false
                }

            });

           oVizFrameRep.setVizProperties({
                title: {
                    visible: false,
                    text: 'Répartition'
                },
                interaction: {
                    behaviorType: null,
                    selectability: {
                        mode: "SINGLE"
                    }
                },
				   plotArea: {
                        dataLabel: {
                            visible: true,
							formatString: "__UI5__FloatMaxFraction2",
                        }
                    },
                tooltip: {
                    visible: true,
                    formatString: "__UI5__FloatMaxFraction2",
                    bodyDimensionLabel: "Affectation",
                    bodyDimensionValue: "Affectation",
                },
                legend: {
                    visible: false
                }

            });

            this._initCustomFormat();
        },

        _initCustomFormat: function() {
            var chartFormatter = this.chartFormatter = ChartFormatter.getInstance();
            chartFormatter.registerCustomFormatter("__UI5__FloatMaxFraction2",
                function(value) {
                    var fixedFloat = sap.ui.core.format.NumberFormat.getFloatInstance({
                        style: 'Standard',
                        maxFractionDigits: 2,
                        minFractionDigits: 2
                    });
                    return fixedFloat.format(value);
                });
            Format.numericFormatter(chartFormatter);
        },		
	});

});