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

angular.module('CallForPaper')
    .controller('OwnerTracksAndFormatsCtrl', ['$scope', 'dialogs', 'translateFilter', 'Tracks', 'Formats', 'Rooms',
        function($scope, dialogs, translateFilter, Tracks, Formats, Rooms) {

            $scope.tracks = [];
            $scope.formats = [];
            $scope.rooms = [];

            Tracks.getAll().then(function(tracks) {
                tracks.forEach(function (track) {
                    $scope.tracks.push(track);
                });
            });
            Formats.getAll().then(function(formats) {
                formats.forEach(function (format) {
                    $scope.formats.push(format);
                });
            });
            Rooms.getAll().then(function(rooms) {
                rooms.forEach(function (room) {
                    $scope.rooms.push(room);
                });
            });

            // Tracks

            $scope.addTrack = function() {
                Tracks.create({libelle: 'new name', description: 'new description', color: '#337ab7'}).then(function(track) {
                    $scope.tracks.push(track);
                });
            };

            $scope.removeTrack = function(index) {
                var dlg = dialogs.confirm(translateFilter('confirmModal.confirmDelete'), translateFilter('confirmModal.textDeleteTrack'));
                dlg.result.then(function() {
                    var track = $scope.tracks.splice(index, 1)[0];
                    Tracks.delete(track.id);
                });
            };

            $scope.saveTrack = function(track) {
                Tracks.update(track);
            };


            // Formats

            $scope.addFormat = function() {
                Formats.create({name: 'new name', duration: 60, description: 'new description', icon: "slideshare"}).then(function(format) {
                    $scope.formats.push(format);
                });
            };

            $scope.removeFormat = function(index) {
                var dlg = dialogs.confirm(translateFilter('confirmModal.confirmDelete'), translateFilter('confirmModal.textDeleteFormat'));
                dlg.result.then(function() {
                    var format = $scope.formats.splice(index, 1)[0];
                    Formats.delete(format.id);
                });
            };

            $scope.saveFormat = function(format) {
                Formats.update(format);
            };


            // Rooms

            $scope.addRoom = function() {
                Rooms.create({name: 'new name'}).then(function(room) {
                    $scope.rooms.push(room);
                });
            };

            $scope.removeRoom = function(index) {
                var dlg = dialogs.confirm(translateFilter('confirmModal.confirmDelete'), translateFilter('confirmModal.textDeleteRoom'));
                dlg.result.then(function() {
                    var room = $scope.rooms.splice(index, 1)[0];
                    Rooms.delete(room.id);
                });
            };

            $scope.saveRoom = function(room) {
                Rooms.update(room);
            };
        }
    ]);
