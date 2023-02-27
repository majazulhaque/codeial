const { populate } = require("../models/post");
const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id',50);
  // return res.render('home',{
  //     title: "Home"
  // });

  // Post.find({}, function(err, posts){
  //     return res.render('home', {
  //         title : 'Codeial | Home',
  //         posts : posts
  //     });
  // });

  // Populate the user of each post
  // Post.find({}).populate('user')
  // .populate({
  //     path: 'comments',
  //     populate: {
  //         path: 'user'
  //     }
  // })
  // .exec(function(err, posts){

  //     User.find({}, function(err, users){
  //         return res.render('home', {
  //             title : 'Codeial | Home',
  //             posts : posts,
  //             all_users: users
  //         });
  //     });

  //     // return res.render('home', {
  //     //     title : 'Codeial | Home',
  //     //     posts : posts
  //     // });
  // });

  // Another method using async await.
  try {
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    let users = await User.find({});

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

// module.exports.showImage = function(req,res){
//     return res.end('<h1> Profile icon is here</h1>');
// }
