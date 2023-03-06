const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comments_email_worker');
const Like = require('../models/like');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// module.exports.create = async function(req, res){
//     try {
//         let post = await Post.findById(req.body.post);
//         if (!post) {
//             throw new Error('Post not found');
//         }
//         let comment = await Comment.create({
//             content: req.body.content,
//             post: req.body.post,
//             user: req.user._id
//         });
//         post.comments.push(comment);
//         await post.save();
//         comment = await comment.populate('user', 'name email').execPopulate();
//         // send email asynchronously using SendGrid
//         const msg = {
//             to: comment.user.email,
//             from: 'your_email@example.com',
//             subject: 'New Comment',
//             text: `Hi ${comment.user.name}, you have a new comment on your post.`,
//             html: `<p>Hi ${comment.user.name},</p><p>You have a new comment on your post.</p>`
//         };
//         sgMail.send(msg);
//         if (req.xhr){
//             return res.status(200).json({
//                 data: {
//                     comment: comment
//                 },
//                 message: "Post created!"
//             });
//         }
//         req.flash('success', 'Comment published!');
//         res.redirect('/');
//     } catch (err) {
//         console.error(err);
//         req.flash('error', err.message);
//         res.redirect('/');
//     }
// }




module.exports.create = async function(req, res){
    // Post.findById(req.body.post, function(err,post){
    //     if(post){
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, function(err,comment){
    //             // handle error
    //             if(err){
    //                 console.log('error while creating the comment');
    //                 return;
    //             }

    //             post.comments.push(comment);
    //             post.save();

    //             res.redirect('/');
    //         });
    //     }
    // });

    // Another method.

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user', 'name email').execPopulate();
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if (err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);

            })

            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}