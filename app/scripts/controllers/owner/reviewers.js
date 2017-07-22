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
    .controller('OwnerReviewersCtrl', ['$scope', 'Reviewers', 'translateFilter', 'Notification',
        function($scope, Reviewers, translateFilter, Notification) {

    		$scope.emails = [];
    		$scope.reviewers = [];

    		Reviewers.getAll().then(function(emails) {
    			$scope.emails = emails;
    			$scope.reviewers = emails.map(function(email) { return {text: email}; });
    		});

            $scope.saveReviewers = function() {
            	var emails = $scope.reviewers.map(function(reviewer) { return reviewer.text; });

            	// added emails
            	angular.forEach($(emails).not($scope.emails), function(email) {
            		Reviewers.add(email);
            	});

            	// removed emails
            	angular.forEach($($scope.emails).not(emails), function(email) {
            		Reviewers.delete(email);
            	});

            	Notification.success(translateFilter('owner.reviewersSuccess'));

            	$scope.emails = emails;
            };
        }
    ]);
