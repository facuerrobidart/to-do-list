let db = require("./../database/models");
let Op = db.Sequelize.Op;


const controller = {
    foldersAPI: (req, res) => {
        db.folders.findAll({
            where: {
                users_id: req.session.user.id
            }
        }).then((folders)=>{
            let answer = {
                folders: folders,
            }
            res.json(answer);
        })
        .catch((e)=>{console.log(e)});
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
            res.send(answer);
        })
        .catch(e=>{console.log(e)});
    },
    createFolder: (req,res)=>{
        db.folders.create({
            name: req.body.name,
            users_id: req.session.user.id
        }).then(()=>{
            let answer = true
            res.send(answer);
        })
        .catch(e=>{console.log(e)});
    },
    createNote: (req,res)=>{
        db.notes.create({
            description: req.body.description,
            users_id: req.session.user.id,
            folders_id: req.params.folderId,
            checked:false
        }).then(()=>{
            let answer = true
            res.send(answer);
        })
        .catch((e)=>{console.log(e)});
    },
    changeStatus: (req,res)=>{
        let cambio = req.body.checked; let donde = req.body.id
        db.notes.update(
            {
                checked: cambio
            },
            {
                where: {id: donde}
            })
        .then(()=>{
            res.send(true);
        })
        .catch((e)=>{console.log(e)});
    },
    deleteNote: (req,res)=>{
        db.notes.destroy({
            where: {id: req.body.id}
        })
        .then(()=>{
            res.send(true);
        })
        .catch((e)=>{console.log(e)});
    }
};

module.exports = controller;