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

angular.module('CallForPaper').service('Comments', function($http, $q, AppConfig) {
    return {
        save: function(proposalId, comment) {
            if (comment.id) {
                return this.update(proposalId, comment);
            } else {
                return this.create(proposalId, comment);
            }
        },
        create: function(proposalId, comment) {
            return $http.post(AppConfig.apiBaseUrl + '/proposals/' + proposalId + '/comments', comment)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        update: function(proposalId, comment) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + proposalId + '/comments/'+ comment.id, comment)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        get: function(proposalId, commentId) {
            return $http.get(AppConfig.apiBaseUrl + '/proposals/' + proposalId + '/comments/'+ commentId)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        getAll: function(proposalId) {
            return $http.get(AppConfig.apiBaseUrl + '/proposals/' + proposalId + '/comments')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        delete: function(proposalId, commentId) {
            return $http.delete(AppConfig.apiBaseUrl + '/proposals/' + proposalId + '/comments/'+ commentId)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        }
    };
});
