const db = require('../config/connection');
const { User, Product, Bonsai } = require('../models');
const userData = require('./userData.json');
const productData = require('./productData.json');
const bonsaiData = require('./bonsaiData.json');

//// -----------------------------------------------------------////
//// ------ Function to Seed all of placeholder site data ------////
//// -----------------------------------------------------------////
db.once('open', async () => {
  try {
    //--- Initially delete all of the following schemas if they exist: Users, Product and Bonsai --->>
    await User.deleteMany({});
    await Product.deleteMany({});
    await Bonsai.deleteMany({});


    //--- Create users with userData --->>
    let userInfo = await User.create(userData);
    console.log(userInfo);

    //--- create products with productData --->>
    let productInfo = await Product.create(productData);

    //--- Function to loop through bonsai seed data, create bonsai in DB and randomly assign to a user --->>
    for (let i = 0; i < bonsaiData.length; i++) {
        const { _id, userId } = await Bonsai.create({...bonsaiData[i], userId: userInfo[Math.floor(Math.random() * userInfo.length)]});

        //--- Log each created Bonsai to console to check data is correct --->>
        console.log(bonsaiData[i])

        //--- Function to update each User with their randomly assigned Bonsai's data and BonsaiId --->>
        const user = await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              userBonsai: _id,
            },
          }
        );

        //--- Finally Log User to check which users are assigned which bonsais --->>
        console.log(user);
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  
  console.log('Bonsai has seeded!');
  process.exit(0);
});
