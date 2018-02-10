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

angular.module('CallForPaper').controller('AdminStatsCtrl', function($scope, $http, currentUser, Rates, Tracks) {

    $scope.currentUser = currentUser;


    Rates.stats().then(function successCallback(stats) {

        var users = [];
        var rated = [];
        Object.keys(stats).forEach(function(key) {
            users.push(key);
            rated.push(stats[key]);
        });

        $scope.rates_labels = users;
        $scope.rates_series = ['Rated'];
        $scope.rates_data = [rated];
    });

    Tracks.stats().then(function successCallback(stats) {

        var tracks = [];
        var counts = [];
        Object.keys(stats).forEach(function(key) {
            tracks.push(key);
            counts.push(stats[key]);
        });

        $scope.tracks_labels = tracks;
        $scope.tracks_series = ['Tracks'];
        $scope.tracks_all_data = counts;
    }).then(function() {
        return Tracks.stats('ACCEPTED');
    }).then(function successCallback(stats) {

            var tracks = [];
            var counts = [];
            Object.keys(stats).forEach(function(key) {
                tracks.push(key);
                counts.push(stats[key]);
            });

            $scope.tracks_data = [];
            $scope.tracks_data.push($scope.tracks_all_data);
            $scope.tracks_data.push(counts);
      });

});
