// Call these methods in the client, and pass in the relevant user input as arguments.

// This keeps the user from manipulating our db (for example, in the browser console), while still allowing the kinds of inputs we want through.
// Because we have these, you can disable insecure.

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
    updateConversation: function(id, input){
      Conversations.update(id, {
        $set: {text: input}
      });
    }
  });
}