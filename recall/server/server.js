if (Meteor.isServer){

  Meteor.publish("conversations", function() {
    return Conversations.find({
      owner: this.userId
    });
  });

  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
     {fields: {'services': 1}});
  });

  Meteor.methods({
    addContact: function(input){
      Contacts.insert({
        name: input,
        owner: this.userId,
        time: new Date()
      });
    },
    addConversation: function(input){
      Conversations.insert({
        title: input.title,
        content: Session.set("markdown_data",input.content),
        time: new Date(),
        owner: this.userId
      });
    },
    updateConversation: function(conversationID, input){
      Conversations.update(conversationID, {
        $set: {text: input}
      });
    },
    addContactToConversation: function(conversationID, input){
      Conversations.update(conversationID, {
        $addToSet: { contacts: getContactID(input)}
      });
    },
    getContactID: function(contactName){
      var contact = Contacts.findOne({name: contactName}).id;
      if (contact) {
        return contact;
      } else {
        Contacts.insert({name: contactName});
      }
    }
  });
}