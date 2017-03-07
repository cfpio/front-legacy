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

angular.module('CallForPaper').controller('AdminScheduleCtrl', function($scope, AppConfig, AdminStats, Upload, $http) {

    $scope.submission = AppConfig.open;

    function queryMeter() {
        AdminStats.meter().$promise.then(function(statsTmp) {
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
      $http({
          method: 'PUT',
          url:  AppConfig.apiBaseUrl + '/admin/sessions/rejectOthers'
      });
    };

    $scope.notifySpeakers = function() {
        $http({
            method: 'POST',
            url:  AppConfig.apiBaseUrl + '/schedule/notification'
        });
    };

    $scope.calendarConfig = {
        defaultDate: '2017-04-19',
        defaultView: 'agendaDay',
        slotEventOverlap: false,
        slotDuration: '00:15:00',
        editable: false,
        header: {
            left: '',
            center: '',
            right: 'prev,next'
        },
        titleFormat: {
            day: ''
        },
        columnFormat: {
            day: ''
        },
        allDaySlot: false,
        minTime: '08:30:00',
        maxTime: '21:00:00',
        axisFormat: 'HH:mm',
        contentHeight: 1125,
        height: 1125,
        timeFormat: {
            agenda: 'HH:mm'
        }
    };

    $scope.agenda = { events: []};
    $http.get('https://api.cfp.io/api/schedule/accepted').then(function(response) {
        var talks = response.data;
        console.log(talks);

        $scope.agenda.events = function(start, end, timezone, callback) {
            callback(_.map(talks, function(talk) {
                return {
                    title: talk.name,
                    format: talk.format,
                    category: talk.event_type,
                    description: talk.description,
                    speakers: talk.speakers,
                    start: talk.event_start,
                    end: talk.event_end,
                    color: categoryColors[talk.event_type],
                    room: rooms[talk.venue]
                };
            }));
        };
    }.bind(this));



    queryMeter();

});
