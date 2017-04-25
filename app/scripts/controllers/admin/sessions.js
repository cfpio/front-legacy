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

angular.module('CallForPaper').controller('AdminSessionsCtrl', function($scope, $http, AppConfig, translateFilter, NgTableParams, $q, format, talkformats, tracks, sessions, stats, $templateCache, currentUser, AdminSession) {

    $scope.talkFormats = talkformats;
    $scope.format = format;
    $scope.currentUser = currentUser;

    $scope.stats = stats;

    var tracksMap = _.indexBy(tracks, 'id');

    $scope.sessions = sessions.map(function(session) {
        var track = tracksMap[session.trackId];
        if (track) {
            session.trackLabel = track.libelle;
        }
        return session;
    });

    $scope.difficulties = [{id: '', title: ''}].concat(_.map(_.range(1, 4), function(difficulty) {
        return {
            id: difficulty,
            title: translateFilter('talk.difficulty.' + difficulty)
        };
    }));

    $scope.tracks = [{id: '', title: ''}].concat(_.map(tracks, function(track) {
        return {
            id: track.libelle,
            title: track.libelle
        };
    }));

    var sessionCount = sessions.length;
    var counts = [10, 25, 50, 100].filter(function(count) {
        return count < sessionCount;
    });
    if (counts.length > 0) {
        counts.push(sessionCount);
    }

    $scope.remaining = sessions.filter(function(session) {
        return !session.voteUsersEmail || !session.voteUsersEmail.includes(currentUser.email);
    }).length;

    $scope.tableParams = new NgTableParams({
        count: 10,
        sorting: {added: 'desc'}
    }, {
        data: sessions,
        counts: counts
    });

    /**
     * Filter tables according to checkbox state
     * @return {void}
     */
    $scope.handleNotReviewed = function() {
        if ($scope.notReviewed === true) {
            $scope.tableParams.filter().reviewed = false;
        } else {
            $scope.tableParams.filter().reviewed = '';
        }
    };


    $scope.accept = function(talk) {
        var scope = $scope;
        $http({
            method: 'PUT',
            url: AppConfig.apiBaseUrl + '/admin/sessions/' + talk.id + '/accept'
        }).then(function successCallback(response) {
            talk.state = 'ACCEPTED';
        });

    };

    $scope.backup = function(talk) {
        $http({
            method: 'PUT',
            url: AppConfig.apiBaseUrl + '/admin/sessions/' + talk.id + '/backup'
        }).then(function successCallback(response) {
            talk.state = 'BACKUP';
        });

    };

    $scope.reject = function(talk) {
        $http({
            method: 'PUT',
            url: AppConfig.apiBaseUrl + '/admin/sessions/' + talk.id + '/reject'
        }).then(function successCallback(response) {
            talk.state = 'REFUSED';
        });
    };

    $scope.rectract = function(talk) {
        $http({
            method: 'PUT',
            url: AppConfig.apiBaseUrl + '/admin/sessions/' + talk.id + '/retract'
        }).then(function successCallback(response) {
            talk.state = 'CONFIRMED';
        });
    };

    $templateCache.put('ng-table/pager.html', '<div class="ng-cloak ng-table-pager" ng-if="params.data.length"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <ng-switch on="$last"> <span ng-switch-when="true" translate>admin.showAllSessions</span> <span ng-switch-default ng-bind="count"></span> </ng-switch> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> ');
});
