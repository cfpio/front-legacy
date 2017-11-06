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

angular.module('CallForPaper').factory('AuthService', function (Users, $window, $location, AppConfig) {

    var authService = {};
    authService.server = AppConfig.authServer;

    /**
     * Initialise user
     * @return {void}
     */
    authService.init = function () {
        return Users.getCurrentUser().then(function (userInfo) {
            return authService.user = userInfo;
        });
    };

    /**
     * Login the user and redirect to the given state
     */
    authService.login = function () {
        if (authService.server) {
            $window.location.href = authService.server + '/?target=' + encodeURIComponent($location.absUrl());
        }
    };

    /**
     * Logout the user and redirect to the given state
     */
    authService.logout = function () {
        $window.location.href = authService.server + '/logout';
    };

    return authService;

});
