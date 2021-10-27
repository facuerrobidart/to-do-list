let db = require("./../database/models");
let Op = db.Sequelize.Op;


const controller = {
    logueo: (req,res) =>{
        console.log(req.body);
        db.users.findOne({
            where:{
                username: req.body.username,
            }
        }).then((user)=>{
            let answer=false;
            if (user!=null){
                if (req.body.password == user.password){
                    req.session.user={};
                    req.session.user.id = user.id;
                    answer=true;
                }
            }
            res.send(answer);
        })
        .catch((e)=>{
            console.log(e);
        });
    }
}

module.exports = controller;