if (Meteor.isClient){

  /**
   * Sidebar and global variables
   */

  Meteor.subscribe('conversations');
  Meteor.subscribe('contacts');
  Meteor.subscribe('userData');

  //Get a larger image of the twitter image than is passed by the OAuth object.
  Template.sidebar.user_image = function() {
    if (Meteor.user().services) {
      return Meteor.user().services.twitter.profile_image_url.replace('normal', 'bigger');
    } else {
      return "";
    }
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
    },
    findContactId: function(name) {
      return Contacts.findOne({name: name}) &&
      Contacts.findOne({name: name})._id;
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

  Template.connections.connections = function() {
    return Contacts.find().fetch();
  };

  // Template.contacts.contactUrl = function() {
  //   if (this.contact) {
  //     contact = Contacts.findOne({name: this.contact});
  //     return contact && contact.split(' ').join('-');
  //   }
  // };

  Template.contact.helpers({
    contractUrl: function(_id) {
      console.log('contactUrl', _id);
      contact = Contacts.findOne({_id: _id});
      return Session.get(contact.name && contact.name.split(' ').join('-'));
    },
    conversationsCount: function(_id) {
      author = Contacts.findOne({'_id': _id});
      conversations = Conversations.find({'contact': author.name}).fetch();
      return conversations.length;
    }
  });

  Template.connections.helpers({
    contactUrl: function(_id) {
      console.log('contactUrl', _id);
      contact = Contacts.findOne({_id: _id});
      return Session.get(contact.name && contact.name.split(' ').join('-'));
    },
    conversationsCount: function(_id) {
      console.log('conversationsCount', _id);
      author = Contacts.findOne({'_id': _id});
      return Conversations && Conversations.find({contact: author.name}).fetch().length;
    }
  });

  Template.connections.events = {
    'click input#add_contact_submit': function() {
      inputValue = document.getElementById("add_contact").value;
      console.log(inputValue);
      checkIfUserInDatabase = Contacts.find({name: inputValue}).fetch();
      console.log(checkIfUserInDatabase);
      if (checkIfUserInDatabase.length !== 0) {
        if (confirm('That user is already in the database! Are you sure?')) {
          Meteor.call('addContact', inputValue);
        }
      } else {
        Meteor.call('addContact', inputValue);
      }
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
        document.getElementById("new_conversation_title").value : '';
      var new_conversation =
        document.getElementById("new_conversation").value ?
        document.getElementById("new_conversation").value : '';
      var new_contact = document.getElementById("new_contact").value;

      console.log(new_conversation_title, new_conversation, new_contact);

      Contacts.insert({
        name: new_contact,
        time: new Date(),
        owner: Meteor.users.findOne()._id
      });

      console.log('Contacts:', Contacts);

      conversationId =  Conversations.insert({
        title: new_conversation_title,
        content: new_conversation,
        contact: new_contact,
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
        // Meteor.call('addContactToConversation',
        //   document.getElementById("new_contact").value);
      }
    },

    'click input#save': function () {
      var new_conversation_title = 
        document.getElementById("new_conversation_title").value,
        new_conversation = document.getElementById("new_conversation").value,
        new_contact = document.getElementById("new_contact").value;

      if (!new_contact) {
        alert('You have to add a contact!');
        return;
      }

      check_contact = Contacts.findOne({name: new_contact});

      if (!check_contact) {
        Contacts.insert({
          name: new_contact,
          time: new Date(),
          owner: Meteor.users.findOne()._id
        });
      }

      conversationId =  Conversations.insert({
        title: new_conversation_title,
        content: new_conversation,
        contact: new_contact,
        time: new Date(),
        owner: Meteor.users.findOne()._id
      });
      Router.go('conversation', {_id: conversationId});
    }
  };
}

