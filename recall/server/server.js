if (Meteor.isServer){
  Meteor.methods({
    addContact: function(input){
      Contacts.insert({
        name: input
      });
    },
    addConversation: function(input){
      Conversations.insert({
        title: input.title,
        content: input.content
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
      })
    },
    getContactID: function(contactName){
      var contact = Contacts.findOne({name: contactName}).id
      if(contact){
        return contact
      }
      else{
        Contacts.insert({name: contactName})
      }
    }
  });
}