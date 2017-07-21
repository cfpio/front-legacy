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

angular.module('CallForPaper').service('Tracks', function($http, $q, AppConfig) {
    return {
        save: function(track) {
            if (track.id) {
                return this.update(track);
            } else {
                return this.create(track);
            }
        },
        create: function(track) {
            return $http.post(AppConfig.apiBaseUrl + '/themes', track)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        update: function(track) {
            return $http.put(AppConfig.apiBaseUrl + '/themes/'+track.id, track)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        get: function(id) {
            return $http.get(AppConfig.apiBaseUrl + '/themes/'+id)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        getAll: function() {
            return $http.get(AppConfig.apiBaseUrl + '/themes')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        delete: function(id) {
            return $http.delete(AppConfig.apiBaseUrl + '/themes/'+id)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        stats: function() {
            return $http.get(AppConfig.apiBaseUrl + '/themes/stats')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        }
    };
});
