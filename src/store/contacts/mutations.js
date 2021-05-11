export default {
  addContact(state, payload) {
    state.contacts.push(payload);
  },
  deleteContact(state, payload) {
    // const item = state.contacts.find(contact => contact.id === payload);
    // state.contacts.splice(state.contacts.indexOf(item), 1);

    state.contacts = state.contacts.filter(contact => contact.id !== payload);
  },
  setContacts(state, payload) {
    state.contacts = payload;
  },
  setContact(state, payload) {
    state.contact = payload;
  }
};
