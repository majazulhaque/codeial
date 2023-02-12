module.exports.home = function(req,res){
    return res.render('home',{
        title: "Home"
    });
}

// module.exports.showImage = function(req,res){
//     return res.end('<h1> Profile icon is here</h1>');
// }