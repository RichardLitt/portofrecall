if (Meteor.isClient){
  /**
   * Get a larger image of the twitter image than is passed by the OAuth object.
   * @return {[type]} [description]
   */
  Template.sidebar.user_image = function() {
    return Meteor.users.findOne().services.twitter.profile_image_url.replace('normal', 'bigger');
  };

  Template.sidebar.contacts_count = function() {
    return _.size(Contacts.find().fetch());
  };

  Template.sidebar.conversations_count = function() {
    return _.size(Conversations.find().fetch());
  };

  Template.new_conversation.events = {
    /**
     * Save the conversation.
     * @return {[type]} [description]
     */
    'click input#save': function () {
      var new_conversation_title = document.getElementById("new_conversation_title").value;
      var new_conversation = document.getElementById("new_conversation").value;
      Meteor.call('addConversation', {
        title: new_conversation_title,
        content: new_conversation
      });
    },

    'keypress input#new_contact': function(e) {
      if (e.which == 13) {
        console.log('Enter being called');
        e.preventDefault();
        Meteor.call('addContactToConversation', document.getElementById("new_contact").value);
      }
    }
  };
}

