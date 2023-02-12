module.exports.home = function(req,res){
    return res.end('<h1>Express is up for Codeial</h1>');
}

module.exports.showImage = function(req,res){
    return res.end('<h1> Profile icon is here</h1>');
}