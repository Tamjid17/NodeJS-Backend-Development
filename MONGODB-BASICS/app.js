const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://towhidulislam24:${process.env.DB_PASS}@meals.kceb8.mongodb.net/<dbname>?retryWrites=true&w=majority`
  )
  .then(() => console.log("Database connnected successfully"))
  .catch((e) => console.log("Error: ", e));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {type : Date, default: Date.now}
})

// create user model
const User = mongoose.model('User', userSchema);

async function runQueryExamples() {
    try{

        //create a new document
        // const newUser = await User.create({
        //     name: "Kevin Doe",
        //     email: "Kendoe@email.com",
        //     age: 34,
        //     isActive: true,
        //     tags: ['developer', 'designer', 'manager'],
        // });

        const newUser = new User({
          name: "Kevin Doe",
          email: "Kendoe@email.com",
          age: 34,
          isActive: true,
          tags: ["developer", "designer", "manager"],
        });

        await newUser.save()

        console.log("New user created successfully", newUser);

    } catch(e) {
        console.log("Error: ", e)
    } finally{
        await mongoose.connection.close();
        process.exit();
    }
}

runQueryExamples();