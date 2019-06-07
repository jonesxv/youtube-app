function addUser(uid, email) {
  db.collection('users')
    .doc(uid)
    .set({
      email: email,
      recipes: [],
    });
}

module.exports = {
  addUser: addUser
}