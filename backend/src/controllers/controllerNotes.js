let db = require("./../database/models");
let Op = db.Sequelize.Op;


const controller = {
    foldersAPI: (req, res) => {
        db.Folder.findAll({
            where: {
                users_id: req.params.userId
            }
        }).then((folders)=>{
            res.json(folders);
        })
    },
    notesInFolderAPI: (req,res) => {
        res.send("work in progress");
    }
};

module.exports = controller;