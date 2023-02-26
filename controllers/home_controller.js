const { populate } = require('../models/post');
const Post = require('../models/post');

module.exports.home = function(req,res){
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
    Post.find({}).populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title : 'Codeial | Home',
            posts : posts
        });
    });
}

// module.exports.showImage = function(req,res){
//     return res.end('<h1> Profile icon is here</h1>');
// }