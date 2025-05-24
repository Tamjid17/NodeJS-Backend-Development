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
      const newUser = await User.create({
          name: "Updated User",
          email: "updateduser@email.com",
          age: 75,
          isActive: true,
          tags: ['developer'],
      });

      console.log("New user created successfully", newUser);

      // const allUsers = await User.find({});
      // console.log(allUsers);

      // const getUserofActiveFalse = await User.find({isActive: true})
      // console.log(getUserofActiveFalse)

      // const getJohnDoeUser = await User.findOne({name: 'John Doe'})
      // console.log(getJohnDoeUser)

      // const getLastCreatedUserByUserId = await User.findById(newUser._id)
      // console.log("Latest User", getLastCreatedUserByUserId)

      // const getUserById = await User.findById('6831343c63229f42aa5ff095')
      // console.log(getUserById)

      // const selectedFields = await User.find().select('name email -_id ')
      // console.log(selectedFields);

      // const limitedUsers = await User.find().limit(5).skip(1);
      // console.log(limitedUsers);

      // sort users in descending order
      // const sortedUserDescending = await User.find().sort({ age: -1 });
      // console.log(sortedUserDescending);

      // sort users in ascending order
      // const sortedUserAscending = await User.find().sort({ age: 1 });
      // console.log(sortedUserAscending);

      // const countDocumentsByActivity = await User.countDocuments({ isActive: true })
      // console.log(countDocumentsByActivity);

      // const deletedUser = await User.findByIdAndDelete(newUser._id);
      // console.log("This user is deleted from the database",deletedUser);

      const updatedUser = await User.findByIdAndUpdate(newUser._id, {
        $set : {age: 100}, $push: {tags : 'updated'}
      }, {new: true})
      console.log('Updated user', updatedUser)

    } catch(e) {
        console.log("Error: ", e)
    } finally{
        await mongoose.connection.close();
        process.exit();
    }
}

runQueryExamples();