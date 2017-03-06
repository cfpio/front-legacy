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

            $scope.tracks = Tracks.getAll();
            $scope.formats = Formats.getAll();
            $scope.rooms = Rooms.getAll();

            $scope.addTrack = function() {
                Tracks.add({libelle: 'new name', description: 'new description'}, function(track) {
                    $scope.tracks.push(track);
                });
            };

            $scope.removeTrack = function(index) {
                var dlg = dialogs.confirm(translateFilter('confirmModal.confirmDelete'), translateFilter('confirmModal.textDeleteTrack'));
                dlg.result.then(function() {
                    var track = $scope.tracks.splice(index, 1)[0];
                    Tracks.remove({id: track.id});
                });
            };

            $scope.saveTrack = function(track) {
                Tracks.update({id: track.id}, track);
            };

            $scope.addFormat = function() {
                Formats.add({name: 'new name', duration: 60, description: 'new description'}, function(format) {
                    $scope.formats.push(format);
                });
            };

            $scope.removeFormat = function(index) {
                var dlg = dialogs.confirm(translateFilter('confirmModal.confirmDelete'), translateFilter('confirmModal.textDeleteFormat'));
                dlg.result.then(function() {
                    var format = $scope.formats.splice(index, 1)[0];
                    Formats.remove({id: format.id});
                });
            };


            $scope.saveRoom = function(room) {
                Rooms.update({id: room.id}, room);
            };

            $scope.addRoom = function() {
                Rooms.add({name: 'new name'}, function(room) {
                    $scope.rooms.push(room);
                });
            };

            $scope.removeRoom = function(index) {
                var dlg = dialogs.confirm(translateFilter('confirmModal.confirmDelete'), translateFilter('confirmModal.textDeleteRoom'));
                dlg.result.then(function() {
                    var room = $scope.rooms.splice(index, 1)[0];
                    Rooms.remove({id: room.id});
                });
            };

            $scope.saveRoom = function(room) {
                Rooms.update({id: room.id}, room);
            };
        }
    ]);
