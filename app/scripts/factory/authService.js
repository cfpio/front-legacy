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
    .factory('AuthService', function($q, Users, $window, $location, AppConfig) {

        var authService = {};
        authService.user = null;
        authService.server = AppConfig.authServer;

        /**
         * Initialise user
         * @return {void}
         */
        authService.init = function() {
            Users.getCurrentUser().then(function(userInfo) {
                authService.user = userInfo;
                if (!authService.isAuthenticated()) {
                    authService.login();
                }
            });
        };

        /**
         * Verify if the user is currently logged
         */
        authService.isAuthenticated = function() {
            return authService.user;
        };

        /**
         * Verify if the user is currently admin
         */
        authService.isAdmin = function() {
            return authService.user && authService.user.admin;
        };

        /**
         * Login the user and redirect to the given state
         */
        authService.login = function() {
            if (authService.server) {
                $window.location.href = authService.server + '/?target=' + encodeURIComponent($location.absUrl());
            }
        };

        /**
         * Logout the user and redirect to the given state
         */
        authService.logout = function() {
            authService.user = null;
            $window.location.href = authService.server + '/logout';
        };

        /**
         * Get current logged in user info
         * @return { connected : bool, admin : bool, uri : string(login/out url depending on the connected state)}
         */
        authService.getCurrentUser = function() {
            if (authService.user) {
                return authService.user;
            } else {
                return Users.getCurrentUser().then(function(userInfo) {
                    authService.user = userInfo;
                    if (!authService.isAuthenticated()) {
                        authService.login();
                    }
                    return userInfo;
                });
            }
        };


        return authService;
    });
