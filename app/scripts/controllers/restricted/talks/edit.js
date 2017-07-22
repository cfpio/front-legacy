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

angular.module('CallForPaper').controller('AppTalksEditCtrl', function (tracks, talkformats, $scope, talk, Proposals, $state, $q, dialogs, translateFilter, Notification) {

    $scope.talk = talk;
    $scope.tracks = tracks;
    $scope.talkFormats = _.indexBy(talkformats, 'id');
    $scope.cospeakers = [];

    if (talk) {
        $scope.cospeakers = talk.cospeakers.map(function (speaker) {
            return speaker.email;
        });
        var length = tracks.length;
        for (var i = 0; i < length; i++) {
            if (tracks[i].id === talk.trackId) {
                $scope.selectedTrack = tracks[i];
                break;
            }
        }
    }


    $scope.sending = false;

    $scope.updateTrack = function () {
        $scope.talk.trackId = $scope.selectedTrack.id;
        $scope.talk.trackLabel = $scope.selectedTrack.libelle;
    };

    function validate(talk) {
        // Validation is only about some required fields
        return _.every(['format', 'name', 'description', 'difficulty', 'trackId'], function (field) {
            return Boolean(talk[field]);
        });
    }

    function processError(error) {
        $scope.sending = false;
        if (error.status === 400) {
            if (error.data.errorCode === 1) {
                Notification.error(translateFilter('step2.cospeakerNotFound', {value: error.data.errorCodeBody.email}));
            } else {
                Notification.error(translateFilter('verify.notVerified'));
            }

            return;
        }
        $scope.sendError = true;
    }

    function save(talk) {
        if (validate(talk)) {
            $scope.sending = true;
            talk.cospeakers = $scope.cospeakers.map(function (email) {
                return {email: email.text};
            });
            return Proposals.save(talk).then(function (savedTalk) {
                $scope.talk = savedTalk;
                $scope.sending = false;
                var notifMessage = translateFilter('talk.edit.saveDraft');
                Notification.success(notifMessage);
                $state.go('app.dashboard');
            }, processError);
        } else {
            $scope.talkInvalid = true;
            return $q.reject();
        }
    }

    $scope.save = save;

    $scope.submit = function submit(talk) {
        dialogs.confirm(translateFilter('confirmModal.title'), translateFilter('confirmModal.text'), {
            size: 'md'
        }).result.then(function () {
            save(talk);
        }, processError);
    };

});
