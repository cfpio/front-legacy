/*
 * Copyright (c) 2016 BreizhCamp
 * [http://breizhcamp.org]
 *
 * This file is part of CFP.io.
 *
 * CFP.io is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

angular.module('CallForPaper').controller('AdminScheduleCtrl', function($scope, AppConfig, Stats, Upload, Proposals, $http) {

    $scope.submission = AppConfig.open;

    function queryMeter() {
        Stats.event().then(function(statsTmp) {
            $scope.stats = statsTmp;
        });
    }

    $scope.upload = function(file) {
        Upload.upload({
            url: AppConfig.apiBaseUrl + '/schedule',
            method: 'POST',
            data: {file: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.rejectOthers = function() {
      Proposals.rejectOthers();
    };

    $scope.notifyAllSpeakers = function() {
        $http({
            method: 'POST',
            url:  AppConfig.apiBaseUrl + '/schedule/notification'
        });
    };

    $scope.notifyRefusedSpeakers = function() {
        $http({
            method: 'POST',
            url:  AppConfig.apiBaseUrl + '/schedule/notification?filter=refused'
        });
    };

    $scope.notifyAcceptedSpeakers = function() {
        $http({
            method: 'POST',
            url:  AppConfig.apiBaseUrl + '/schedule/notification?filter=accepted'
        });
    };

    queryMeter();

});
