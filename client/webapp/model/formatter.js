sap.ui.define([], function() {
    "use strict";

    return {

        /**
         * Rounds the number unit value to 2 digits
         * @public
         * @param {string} sValue the number string to be rounded
         * @returns {string} sValue with 2 digits rounded
         */
        numberUnit: function(sValue) {
            if (!sValue) {
                return "";
            }
            if (sValue == 0) {
                return "";
            }
            var fValue = parseFloat(sValue);
            return fValue.toFixed(2);
        },

        soldeState: function(sValue) {
            if (!sValue) {
                return sap.ui.core.ValueState.None;
            }

            var fValue = parseFloat(sValue);

            if (fValue > 1000) {
                return sap.ui.core.ValueState.Success;
            } else if (fValue < 1000 && fValue > 500) {
                return sap.ui.core.ValueState.None;
            } else if (fValue < 500 && fValue > 100) {
                return sap.ui.core.ValueState.Warning;
            }

            return sap.ui.core.ValueState.Error;
            // 

        },

        isCard: function(sValue) {
            if (sValue) {
                return "sap-icon://credit-card";
            }
            return null;
        },

        cardColor: function(sValue) {
            if (sValue) {
                var sColor = sValue === "O" ? "#FFD700" : "#00cc66";
                return sColor;
            }
            return null;

        }


    };

});