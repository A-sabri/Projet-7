const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.eioox1e.mongodb.net/project-mern",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



