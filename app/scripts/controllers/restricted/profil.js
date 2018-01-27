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

angular.module('CallForPaper').controller('ProfilCtrl', function($scope, Users, translateFilter, Notification, $state) {
    $scope.profil = {};
    $scope.profil.phone = '';
    $scope.profil.imageProfilKey = null;

    $scope.$watch(function() {
        return $scope.form && $scope.form.lastname.$valid && $scope.form.firstname.$valid && ($scope.form.phone.$pristine || $scope.form.phone.$valid) && $scope.form.company.$valid && $scope.form.bio.$valid && $scope.form.social.$valid && $scope.form.twitter.$valid && $scope.form.googleplus.$valid && $scope.form.github.$valid && $scope.form.gender.$valid && $scope.form.tshirtSize.$valid;
    }, function(isValid) {
        $scope.profil.isValid = isValid;
    });

    $scope.$watch(function() {
        if ($scope.profil.socialArray !== undefined) {
            return $scope.profil.socialArray.length;
        }
    }, function() {
        if ($scope.profil.socialArray !== undefined) {
            $scope.profil.social = $scope.profil.socialArray.map(function(elem) {
                return elem.text;
            }).join(', ');
        }
    });

    /**
     * Get current user profil
     * @return {User}
     */
    Users.getCurrentUser().then(function(profil) {
        if (profil !== undefined) {
            $scope.profil = profil;
            if (profil.social !== undefined) {
                $scope.profil.socialArray = profil.social.split(', ').map(function (value) {
                    return {
                        text: value
                    };
                });
            }
        }
    });

    /**
     * update profil
     * @type {string} profile img blob key
     */
    $scope.sendError = false;
    $scope.sendSuccess = false;
    $scope.sending = false;
    $scope.update = function() {
        if ($scope.profil.isValid) {
            Users.save($scope.profil).then(function() {
                Notification.success(translateFilter('profil.success'));
                $state.go('app.dashboard', {}, {reload: true});
            }).catch(function() {
                $scope.sendSuccess = false;
                $scope.sendError = true;
                $scope.sending = false;
            });
        }
    };


    /**
     * remove selected img, then current img, then social pimg
     * @return {[type]} [description]
     */
    $scope.removeImage = function() {
        if ($scope.files && $scope.files.length) {
            $scope.files = [];
        } else if ($scope.profil.imageProfilKey) {
            $scope.profil.imageProfilKey = null;
        } else if ($scope.profil.imageProfilURL) {
            $scope.profil.imageProfilURL = null;
        }
    };

    $scope.verify = false;
    $scope.doVerify = function() {
        $scope.verify = true;
        if ($scope.profil.isValid) {
            $scope.sendError = false;
            $scope.sendSuccess = false;
            $scope.sending = true;
            $scope.update();
        }
    };
});
