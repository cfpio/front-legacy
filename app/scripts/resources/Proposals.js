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
                return this.update(proposal);
            } else {
                return this.create(proposal);
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
        deleteAll: function() {
            return $http.delete(AppConfig.apiBaseUrl + '/proposals')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        accept: function(id) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + id + '/accept')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        backup: function(id) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + id + '/backup')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        reject: function(id) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + id + '/reject')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        rejectOthers: function() {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/rejectOthers')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        confirm: function(id) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + id + '/confirm')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        backToEdit: function(id) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + id + '/back-to-edit')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        confirmPresence: function(id) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + id + '/confirmPresence')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        retract: function(id) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + id + '/retract')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        addRate: function(proposalId, rate) {
            return $http.post(AppConfig.apiBaseUrl + '/proposals/' + proposalId + '/rates', rate)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        updateRate: function(proposalId, rate) {
            return $http.put(AppConfig.apiBaseUrl + '/proposals/' + proposalId + '/rates/' + rate.id, rate)
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        getRates: function(proposalId) {
            return $http.get(AppConfig.apiBaseUrl + '/proposals/' + proposalId + '/rates')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        getMyRate: function(proposalId) {
            return $http.get(AppConfig.apiBaseUrl + '/proposals/' + proposalId + '/rates/me')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        },
        getNextToRate: function() {
            return $http.get(AppConfig.apiBaseUrl + '/proposals/nextToRate')
                .then(function(response) {
                    return response.data;
                }).catch(function(response) {
                    return $q.reject(response);
                });
        }

    };
});
