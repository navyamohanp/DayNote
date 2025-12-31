const User = require("../models/user.model");

exports.createUser = async (data) => {
  return await User.create({
    name: data.name,
    age: data.age,
    place: data.place,
    email: data.email,
    password: data.password,
  });
};
