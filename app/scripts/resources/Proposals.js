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

angular.module('CallForPaper').factory('Proposals', function($q, $http, AppConfig) {
    return {
        save: function(proposal) {
            if (proposal.id) {
                return update(proposal);
            } else {
                return create(proposal);
            }
        },
        create: function(proposal) {
            return $http.post(AppConfig.apiBaseUrl + '/proposals', proposal)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        update: function(proposal) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/'+proposal.id, proposal)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        get: function(id) {
            return $http.get(AppConfig.apiBaseUrl + '/proposals/'+id)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        getMyProposals: function(states) {
            return $http.get(AppConfig.apiBaseUrl + '/users/me/proposals', {
                    params: { states: states }
                })
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        getAll: function(states) {
            return $http.get(AppConfig.apiBaseUrl + '/proposals', {
                    params: { states: states }
                })
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        delete: function(id) {
            return $http.delete(AppConfig.apiBaseUrl + '/proposals/'+id)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        accept: function(proposal) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + proposal.id + '/accept', proposal)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        backup: function(proposal) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + proposal.id + '/backup', proposal)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        reject: function(proposal) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + proposal.id + '/reject', proposal)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        confirm: function(proposal) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + proposal.id + '/confirm', proposal)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        retract: function(proposal) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + proposal.id + '/retract', proposal)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        }
    };
});
