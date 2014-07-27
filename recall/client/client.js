if (Meteor.isClient){

  /**
   * Sidebar and global variables
   */

  Meteor.subscribe('conversations');
  Meteor.subscribe('contacts');
  Meteor.subscribe('userData');

  //Get a larger image of the twitter image than is passed by the OAuth object.
  Template.sidebar.user_image = function() {
    return Meteor.users.findOne().services.twitter.profile_image_url.replace('normal', 'bigger');
  };

  Template.sidebar.contacts_count = function() {
    return _.size(Contacts.find().fetch());
  };

  Template.sidebar.conversations_count = function() {
    return _.size(Conversations.find().fetch());
  };


  /**
   * Helpers
   */

  Template.conversation_content.helpers({
    toDateString: function(time) {
      return time && time.toDateString();
    }
  });

  Template.conversation_content.markdown_data = function() {
    return Session.get("markdown_data");
  };

  Template.dossier.convArray = function() {
    return Conversations.find().fetch();
  };

  Template.dossier.helpers({
    toDateString: function(time){
      return time && time.toLocaleDateString();
    }
  });

  Template.contacts.contactArray = function() {
    return Contacts.find().fetch();
  };

  // Template.contacts.contactUrl = function() {
  //   if (this.contact) {
  //     contact = Contacts.findOne({name: this.contact});
  //     return contact && contact.split(' ').join('-');
  //   }
  // };

  Template.contacts.helper =  {
    contactUrl: function(contact) {
      console.log('working');
      if (this.contact) {
        contact = Contacts.findOne({name: this.contact});
        return contact && contact.split(' ').join('-');
      }
    },
    conversationsCount: function(id) {
      if (id) {
        conversations = Conversations.find({contact: id});
        return _.size(conversations);
      }
    }
  };

  Template.contacts.events = {
    'click input#add_contact_submit': function() {
      console.log(document.getElementById("add_contact").value);
      Meteor.call('addContact', document.getElementById("add_contact").value);
    }
  };


  /** 
   * The Home Page functionality
   */

  Template.new_conversation.check_conversation = function() {
    var conversationId = location.pathname.split('/')[2];
    if (conversationId) {
      return conversationId;
    } else {
      var new_conversation_title = 
        document.getElementById("new_conversation_title").value ?
        document.getElementById("new_conversation_title").value : '',

        new_conversation =
        document.getElementById("new_conversation").value ?
        document.getElementById("new_conversation").value : '',

        new_contact = document.getElementById("new_contact").value;

      conversationId =  Conversations.insert({
        title: new_conversation_title,
        content: Session.set("markdown_data",new_conversation),
        contact: new_contact,
        time: new Date(),
        owner: Meteor.users.findOne()._id
      });
      Contacts.insert({
        name: new_contact,
        time: new Date(),
        owner: Meteor.users.findOne()._id
      });
      Router.go('conversation', {_id: conversationId});
    }
    // if (param.length() === 2)
    //   console.log
  };

  Template.new_conversation.events = {
    /**
     * Save the conversation.
     * @return {[type]} [description]
     */
    'keypress input#new_contact': function(e) {
      if (e.which == 13) {
        e.preventDefault();
        Template.new_conversation.check_conversation();
        Meteor.call('addContactToConversation', 
          document.getElementById("new_contact").value);
      }
    },

    'click input#save': function () {
      var new_conversation_title = 
        document.getElementById("new_conversation_title").value,
        new_conversation = document.getElementById("new_conversation").value,
        new_contact = document.getElementById("new_contact").value;
      conversationId =  Conversations.insert({
        title: new_conversation_title,
        content: Session.set("markdown_data",new_conversation),
        contact: new_contact,
        time: new Date(),
        owner: Meteor.users.findOne()._id
      });
      Router.go('conversation', {_id: conversationId});
    }
  };
}

