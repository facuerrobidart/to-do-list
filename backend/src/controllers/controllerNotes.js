let db = require("./../database/models");
let Op = db.Sequelize.Op;


const controller = {
    foldersAPI: (req, res) => {
        db.folders.findAll({
            where: {
                users_id: req.params.userId
            }
        }).then((folders)=>{
            let answer = {
                folders: folders,
            }
            res.json(answer);
        })
    },
    notesInFolderAPI: (req,res) => {
        let notesFolder = db.folders.findByPk(req.params.folderId);
        let notes = db.notes.findAll({
            where:{
                folders_id: req.params.folderId
            }
        });

        Promise.all([notesFolder,notes])
        .then(([folder,notes])=>{
            let answer = {
                folderName: folder.name,
                notes: notes
            }
            res.json(answer);
        })
    }
};

module.exports = controller;