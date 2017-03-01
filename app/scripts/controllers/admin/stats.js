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

angular.module('CallForPaper').controller('AdminStatsCtrl', function($scope, $http) {

    $http({
        method: 'GET',
        url: 'https://api.cfp.io/api/rates/stats'
    }).then(function successCallback(response) {

        var users = []
        var rated = []
        Object.keys(response.data).forEach(function(key) {
            users.push(key)
            rated.push(response.data[key])
        });

        $scope.rates_labels = users;
        $scope.rates_series = ['Rated'];
        $scope.rates_data = [rated];
    });


    $http({
        method: 'GET',
        url: 'https://api.cfp.io/api/tracks/stats'
    }).then(function successCallback(response) {

        var tracks = []
        var counts = []
        Object.keys(response.data).forEach(function(key) {
            tracks.push(key)
            counts.push(response.data[key])
        });

        $scope.tracks_labels = tracks;
        $scope.tracks_series = ['Tracks'];
        $scope.tracks_data = [counts];
    });



});
