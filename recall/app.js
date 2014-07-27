Router.map(function(){
  this.route('login', {
    path: '/',
    redirectOnLogin: true
  });
  this.route('home', {
    path: '/home',
    loginRequired: 'login'
  });
  this.route('write', {
    loginRequired: 'login'
  });
  this.route('contactsShow', {
    path: '/contacts/:_id',
    data: function() { return Contacts.findOne(this.params._id); },
    loginRequired: 'login'
  });
  this.route('conversation', {
    path: '/contacts/:name/:id',
    data: function() {
      /*
      This won't work at the moment. you need to find the specific ID for that
      message.
       */
      return Contacts.findOne(this.params._id),
        Conversation.findOne(this.params._id); 
    },
    loginRequired: 'login'
  });
});

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('login');
    pause();
  }
};

var goToDashboard = function(pause) {
  if (Meteor.user()) {
    Router.go('home');
    pause();
  }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['login']});
Router.onBeforeAction(goToDashboard, {only: ['login']});