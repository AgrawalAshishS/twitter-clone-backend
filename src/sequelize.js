const { Sequelize } = require("sequelize");
const UserModel = require("./models/User");
const FollowerModel = require("./models/Follower");
const TweetModel = require("./models/Tweet");
const RetweetModel = require("./models/Retweet");
const LikeModel = require("./models/Like");
const CommentModel = require("./models/Comment");

// Connect to database
const { DB, USERNAME, PASSWORD } = process.env;
const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});
(async () => await sequelize.sync())();

const User = UserModel(sequelize);
const Follower = FollowerModel(sequelize);
const Tweet = TweetModel(sequelize);
const Retweet = RetweetModel(sequelize);
const Like = LikeModel(sequelize);
const Comment = CommentModel(sequelize);

// User -> Follower association
User.hasMany(Follower, { as: "Followers", foreignKey: "follower" });
User.hasMany(Follower, { as: "Following", foreignKey: "followed" });

// User -> Tweet association
User.hasMany(Tweet, { foreignKey: "userId" });
// User -> Like association
User.hasMany(Like, { foreignKey: "userId" });
// User -> Retweet association
User.hasMany(Retweet, { foreignKey: "userId" });
// Tweet -> Like association
Tweet.hasMany(Like, { foreignKey: "tweetId" });
// Tweet -> Retweet association
Tweet.hasMany(Retweet, { foreignKey: "tweetId" });

module.exports = {
  User,
  Follower,
  Tweet,
  Retweet,
  Like,
  Comment,
  sequelize,
};
