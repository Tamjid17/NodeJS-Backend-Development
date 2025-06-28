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

      // Find all users in the collection
      // const allUsers = await User.find({});
      // console.log(allUsers);

      // Find all users where isActive is true
      // const getUserofActiveFalse = await User.find({isActive: true})
      // console.log(getUserofActiveFalse)

      // Find a single user by name
      // const getJohnDoeUser = await User.findOne({name: 'John Doe'})
      // console.log(getJohnDoeUser)

      // Find a user by their unique _id (the one just created)
      // const getLastCreatedUserByUserId = await User.findById(newUser._id)
      // console.log("Latest User", getLastCreatedUserByUserId)

      // Find a user by a specific _id
      // const getUserById = await User.findById('6831343c63229f42aa5ff095')
      // console.log(getUserById)

      // Find all users and select only name and email fields, excluding _id
      // const selectedFields = await User.find().select('name email -_id ')
      // console.log(selectedFields);

      // Find users with pagination: skip 1st result and limit to 5 results
      const limitedUsers = await User.find().limit(5).skip(1);
      console.log(limitedUsers);

      // Sort users by age in descending order
      // const sortedUserDescending = await User.find().sort({ age: -1 });
      // console.log(sortedUserDescending);

      // Sort users by age in ascending order
      // const sortedUserAscending = await User.find().sort({ age: 1 });
      // console.log(sortedUserAscending);

      // Count number of users where isActive is true
      // const countDocumentsByActivity = await User.countDocuments({ isActive: true })
      // console.log(countDocumentsByActivity);

      // Delete a user by their _id (the one just created)
      // const deletedUser = await User.findByIdAndDelete(newUser._id);
      // console.log("This user is deleted from the database",deletedUser);

      // Update a user by their _id: set age to 100 and add 'updated' to tags
      // const updatedUser = await User.findByIdAndUpdate(newUser._id, {
      //   $set : {age: 100}, $push: {tags : 'updated'}
      // }, {new: true})
      // console.log('Updated user', updatedUser)

    } catch(e) {
        console.log("Error: ", e)
    } finally{
        await mongoose.connection.close();
        process.exit();
    }
}

runQueryExamples();