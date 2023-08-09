const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://scriptsherlock007:root@cluster0.6rzbg59.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

module.exports = mongoose;
