var connectivity = require("connectivity");
var helperModule = require("~/common/helper");

var ConnectionChecker = (function() {

    var ConnectionChecker = {

        getConnection: function(){
            var connectionType = connectivity.getConnectionType();
            if (connectionType == connectivity.connectionType.none){
                helperModule.notify('You don\'t have connection');
            }
        },

        monitorConnection: function(){
            connectivity.startMonitoring(function onConnectionTypeChanged(newConnectionType){
                if (newConnectionType == connectivity.connectionType.none){
                    helperModule.notify('You don\'t have connection');
                }
            });
        },

        stopMonitoringConnection: function() {
            connectivity.stopMonitoring();
        }

    };

    return ConnectionChecker;
})();

exports.getConnection = ConnectionChecker.getConnection;
exports.monitorConnection = ConnectionChecker.monitorConnection;
exports.stopMonitoringConnection = ConnectionChecker.stopMonitoringConnection;
