const Router = require("express");
const config = require("config")
const ShmotModel = require("../models/shmot")
const shmot = new ShmotModel();
shmot.addSomeShmot();
const router = new Router()


const workingDir = __dirname.slice(0, __dirname.lastIndexOf('/'))

router.post('/add',
    async (req, res) => {
        try {
            const file = req.files?.file
            let loadedFileName = null;
            if (file) {
                loadedFileName = `${shmot.getID()}.jpg`;
                await file.mv(workingDir + `/uploads/${loadedFileName}`);
            }

            shmot.newShmot(req.body.name, req.body.description, req.body.type, req.body.price, loadedFileName);
            // console.log(shmot.getShmot());

            return res.status(200).json({message: `User ok`})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/view',
    async (req, res) => {
        try {
            return res.status(200).json({shmots: shmot.getShmot()})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/edit',
    async (req, res) => {
        try {
            const shmotId = req.headers.shmotid;

            const editedShmot = shmot.getShmotByID(shmotId)

            return res.status(200).json({shmot: editedShmot})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post('/edit',
    async (req, res) => {
        try {
            const file = req.files?.file
            let loadedFileName = null;
            if (file) {
                loadedFileName = `${shmot.getID()}.jpg`;
                await file.mv(workingDir + `/uploads/${loadedFileName}`);
            }
            console.log(req.body);

            shmot.editShmotByID(req.body.shmotId, req.body.name, req.body.description, req.body.type, req.body.price, loadedFileName);

            return res.status(200).json({message: `User ok`})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post('/del',
    async (req, res) => {
        try {
            const shmotId = req.body.shmotId;

            shmot.deleteShmotByID(req.body.shmotId)

            return res.status(200).json({message: `User ok`})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })



module.exports = router
