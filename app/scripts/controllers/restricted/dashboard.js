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
    .controller('DashboardCtrl', function($scope, $filter, Proposals, RestrictedCoSession, RestrictedCoDraft, AuthService, RestrictedStats, talkformats, tracks, AppConfig) {
        $scope.realDifficulty = [$filter('translate')('step2.beginner'), $filter('translate')('step2.confirmed'), $filter('translate')('step2.expert')];
        $scope.tracks = tracks;
        $scope.talkFormats = talkformats;
        $scope.sessions = [];
        $scope.sessionsLoaded = false;
        function querySession() {
            Proposals.getMyProposals('CONFIRMED').then(function(sessionsTmp) {
                $scope.sessions = sessionsTmp.map(function(session) {
                    session.fullname = session.firstname;
                    session.keyDifficulty = (['beginner', 'confirmed', 'expert'])[session.difficulty - 1];
                    return session;
                });
                $scope.sessionsLoaded = true;
            });
        }

        $scope.drafts = [];
        $scope.draftsLoaded = false;
        function queryDraft() {
            Proposals.getMyProposals('DRAFT').then(function(draftsTmp) {
                $scope.drafts = draftsTmp;
                $scope.draftsLoaded = true;
            });
        }

        /**
         * Get current user cosession
         * @return {[RestrictedCoDraft]}
         */
        $scope.coDrafts = [];
        $scope.coDraftsLoaded = false;
        function queryCoDrafts() {
            RestrictedCoDraft.query(function(sessionsTmp) {
                $scope.coDrafts = sessionsTmp.map(function(session) {
                    session.fullname = session.firstname;
                    session.keyDifficulty = (['beginner', 'confirmed', 'expert'])[session.difficulty - 1];
                    return session;
                });

                $scope.coDraftsLoaded = true;
            });
        }

        $scope.coTalks = [];
        $scope.coTalksLoaded = false;
        function queryCoTalks() {
            RestrictedCoSession.query(function(sessionsTmp) {
                $scope.coTalks = sessionsTmp.map(function(session) {
                    session.fullname = session.firstname;
                    session.keyDifficulty = (['beginner', 'confirmed', 'expert'])[session.difficulty - 1];
                    return session;
                });

                $scope.coTalksLoaded = true;
            });
        }

        function queryMeter() {
            RestrictedStats.me().then(function(statsTmp) {
                $scope.stats = statsTmp;
            });
        }

        $scope.delete = function(id) {
            Proposals.delete(id).then(function() {
                queryDraft();
            });
        };

        $scope.confirm = function(id) {
            console.log('confirm ' + id);
            Proposals.confirm(id).then(function() {
                queryDraft();
                querySession();
            });
        };


        queryDraft();
        queryCoDrafts();
        querySession();
        queryMeter();
        queryCoTalks();

        $scope.submission = AppConfig.open;
    });
