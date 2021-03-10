const Router = require("express");
const router = new Router();
const ejs = require("ejs")
const ShmotModel = require("../models/shmot")
const shmot = new ShmotModel();
shmot.addSomeShmot();
const multer = require('multer');
const workingDir = __dirname.slice(0, __dirname.lastIndexOf('/'))

let loadedFileName;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, workingDir + "/uploads");
    },
    filename: function (req, file, cb) {
        loadedFileName = `${shmot.getID()}.jpg`;
        cb(null, loadedFileName);
    }
})

const upload = multer({ storage: storage });

router.get(('/view'), (req, res) => {
    loadedFileName = undefined;
    shmot.selectShmotID(Number(req.query.id))
    ejs.renderFile(workingDir + '/templates/main.ejs',
        {
            shmots: shmot.getShmot(),
            selectedID: shmot.getSelectedShmotID(),
        },
        {},
        (err, template) => {
            res.send(template);
        })
})

router.get(('/add'), (req, res) => {
    ejs.renderFile(workingDir + '/templates/add.ejs',
        {},
        {},
        (err, template) => {
            res.send(template);
        })
})

router.get(('/edit'), (req, res) => {
    ejs.renderFile(workingDir + '/templates/edit.ejs',
        {
            shmot: shmot.getShmot()[shmot.getSelectedShmotID()]
        },
        {},
        (err, template) => {
            res.send(template);
        })
})

router.get(('/del'), (req, res) => {
    ejs.renderFile(workingDir + '/templates/del.ejs',
        {
            shmot: shmot.getShmot()[shmot.getSelectedShmotID()]
        },
        {},
        (err, template) => {
            res.send(template);
        })
})

router.post('/add', upload.single('photo'),
    (req, res) => {
    if (!req.body) {
        console.log("bad request");
        return res.sendStatus(400);
    }

    shmot.newShmot(req.body.name, req.body.description, req.body.type, req.body.price, loadedFileName);
    console.log(shmot.getShmot());

    res.redirect(303, "view");
});

router.post('/edit', upload.single('photo'),
    (req, res) => {
        if (!req.body) {
            console.log("bad request");
            return res.sendStatus(400);
        }

        shmot.editSelectedShmot(req.body.name, req.body.description, req.body.type, req.body.price, loadedFileName)

        console.log(shmot.getShmot());
        res.redirect(303, "view");
    });

router.post('/del',
    (req, res) => {
        shmot.deleteSelectedShmot();
        res.redirect(303, "view");
    });

module.exports = router;