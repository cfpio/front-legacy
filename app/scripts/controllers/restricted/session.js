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
    .controller('RestrictedSessionCtrl', function($scope, $stateParams, $filter, Proposals, RestrictedCoSession, Comments, $modal, talkformats, isCoSession, tracks) {
        $scope.tab = $stateParams.tab;

        $scope.session = null;

        $scope.talkformats=_.indexBy(talkformats, 'id');
        $scope.tracks = _.indexBy(tracks, 'id');

        $scope.cospeakers = [];


        getProposal($stateParams.id);

        function getProposal(id) {
            if (isCoSession) {
                RestrictedCoSession.get({
                    id: id
                }).$promise.then(function (sessionTmp) {
                    $scope.session = sessionTmp;

                    // Add link to social
                    $scope.session.socialLinks = [];
                    if (sessionTmp.speaker.social !== null) {
                        var links = sessionTmp.speaker.social.split(',').map(function (value) {
                            return $filter('createLinks')(value);
                        });
                        $scope.session.socialLinks = links;
                    }
                    if (sessionTmp.speaker.twitter !== null) {
                        $scope.session.speaker.twitter = $filter('createLinks')(sessionTmp.speaker.twitter);
                    }
                    if (sessionTmp.speaker.googleplus !== null) {
                        $scope.session.speaker.googleplus = $filter('createLinks')(sessionTmp.speaker.googleplus);
                    }
                    if (sessionTmp.speaker.github !== null) {
                        $scope.session.speaker.github = $filter('createLinks')(sessionTmp.speaker.github);
                    }
                    $scope.session.keyDifficulty = (['beginner', 'confirmed', 'expert'])[sessionTmp.difficulty - 1];


                    $scope.session.speaker.profilImageUrl = $scope.session.speaker.socialProfilImageUrl;

                    $scope.cospeakers = $scope.session.cospeakers.map(function (speaker) {
                        return speaker.email;
                    });
                });
            } else {
                Proposals.get(id).then(function (sessionTmp) {
                    $scope.session = sessionTmp;

                    // Add link to social
                    $scope.session.socialLinks = [];
                    if (sessionTmp.speaker.social !== null) {
                        var links = sessionTmp.speaker.social.split(',').map(function (value) {
                            return $filter('createLinks')(value);
                        });
                        $scope.session.socialLinks = links;
                    }
                    if (sessionTmp.speaker.twitter !== null) {
                        $scope.session.speaker.twitter = $filter('createLinks')(sessionTmp.speaker.twitter);
                    }
                    if (sessionTmp.speaker.googleplus !== null) {
                        $scope.session.speaker.googleplus = $filter('createLinks')(sessionTmp.speaker.googleplus);
                    }
                    if (sessionTmp.speaker.github !== null) {
                        $scope.session.speaker.github = $filter('createLinks')(sessionTmp.speaker.github);
                    }
                    $scope.session.keyDifficulty = (['beginner', 'confirmed', 'expert'])[sessionTmp.difficulty - 1];


                    $scope.session.speaker.profilImageUrl = $scope.session.speaker.socialProfilImageUrl;

                    $scope.cospeakers = $scope.session.cospeakers.map(function (speaker) {
                        return speaker.email;
                    });
                });
            }
        }

        /**
         * Comments
         */

        /**
         * get contacts of the session
         * @return {[Comment]}
         */
        var refreshComments = function() {
            Comments.getAll($stateParams.id).then(function(contacts) {
                $scope.contacts = contacts;
            });
        };
        refreshComments();

        $scope.contactButtonDisabled = false;
        /**
         * Post current contact in textarea
         * @return {Comment} posted comment
         */
        $scope.postComment = function() {
            $scope.contactButtonDisabled = true;
            Comments.save($stateParams.id, {
                'comment': $scope.contactMsg
            }).then(function() {
                $scope.contactMsg = '';
                $scope.contactButtonDisabled = false;
                refreshComments();
            }).catch(function() {
                $scope.contactButtonDisabled = false;
            });
        };

        /**
         * PUT comment on server
         * @return {Comment} edited contact
         */
        var putComment = function(comment) {
            Comments.save($stateParams.id, comment).then(function() {
                refreshComments();
            });
        };

        /**
         * Open modal for editing
         * @param  {Comment} comment to edit
         * @return {Comment} edited comment text
         */
        $scope.editComment = function(localContact) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/admin/editModal.html',
                controller: 'EditModalInstanceCtrl',
                resolve: {
                    comment: function() {
                        return localContact.comment;
                    }
                }
            });
            modalInstance.result.then(function(comment) {
                putComment(comment);
            }, function() {
                // cancel
            });
        };

        $scope.hasToConfirmPresence = function() {
            return ($scope.session && $scope.session.state === 'ACCEPTED');
        };

        $scope.hasConfirmedPresence = function() {
            return ($scope.session && $scope.session.state === 'PRESENT');
        };

        $scope.confirmPresence = function() {
            Proposals.confirmPresence($stateParams.id).then(function () {
              return getProposal($stateParams.id);
            });
        };

        $scope.isAccepted = function() {
            return ($scope.session && ($scope.session.state === 'ACCEPTED' || $scope.session.state === 'PRESENT'));
        }


    });
