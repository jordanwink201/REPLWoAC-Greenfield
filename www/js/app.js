// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('crash', [
  'ionic',
  'crash.eventService',
  'crash.userService',
  'crash.S3',
  'crash.crashEventObj',
  'crash.event',
  'crash.eventPhoto',
  'crash.eventPerson',
  'crash.eventPersonManual',
  'crash.eventFinal',
  'crash.history',
  'crash.profile',
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  // Event Tab
  .state('tab.event', {
    url: '/event',
    views: {
      'tab-event': {
        templateUrl: 'templates/tab-event.html',
        controller: 'EventController as eventCl'
      }
    }
  })
    .state('tab.eventPhoto', {
      url: '/event/eventPhoto',
      views: {
        'tab-event': {
          templateUrl: 'templates/event-photo.html',
          controller: 'EventPhotoController as photoCl'
        }
      }
    })
    .state('tab.eventPerson', {
      url: '/event/eventPerson',
      views: {
        'tab-event': {
          templateUrl: 'templates/event-person.html',
          controller: 'EventPersonController as personCl'
        }
      }
    })
    .state('tab.eventPersonManual', {
      url: '/event/eventPersonManual',
      views: {
        'tab-event': {
          templateUrl: 'templates/event-person-manual.html',
          controller: 'EventPersonManualController as personMCl'
        }
      }
    })
    .state('tab.eventFinal', {
      url: '/event/eventFinal',
      views: {
        'tab-event': {
          templateUrl: 'templates/event-final.html',
          controller: 'EventFinalController as eventFCl'
        }
      }
    })

  // Profile Tab
  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileController as profileCl'
      }
    }
  })

  // History Tab
  .state('tab.history', {
    url: '/history',
    views: {
      'tab-history': {
        templateUrl: 'templates/tab-history.html',
        controller: 'HistoryController as historyCl',
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/event');

});
