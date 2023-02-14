module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title : 'profile',
    });
};

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Sign Up',
    });
};


module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title : 'Sign In',
    });
}

module.exports.create = function(req,res){
    return res.render('user_profile');
}



// sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}