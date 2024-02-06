const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const uri = 'mongodb://localhost:27017/mydb';

// Sample fake user data
const fakeUser = {
    username: 'fakeuser',
    password: 'fakepassword',
};

async function createFakeUser() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        const user = new User(fakeUser);

        await user.save();

        console.log(`Fake user inserted with _id: ${user._id}`);
    } catch (error) {
        console.error('Error creating fake user:', error);
    } finally {
        mongoose.connection.close();
    }
}

createFakeUser();