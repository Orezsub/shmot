const ShmotModel = require("./shmotModel")

class Shmot {
    _id = 0;
    _shmot = [];

    _increaseID() {
        this._id++;
    }

    addSomeShmot() {
        this.newShmot(
            "Fashionable hoodie",
            "The coolest hoodie in the world",
            "hoodie",
            99.99,
            "0.jpg"
        )
        this.newShmot(
            "Cool socks",
            "The coolest socks in the galaxy",
            "socks",
            19.99,
            "1.jpg"
        )
    }

    _selectedShmotId = -1;

    getID() {
        return this._id
    }

    newShmot(name, description, type, price, file) {
        this._increaseID();
        let shmot = new ShmotModel(name, description, type, price, file)
        this._shmot.push(shmot);
    }

    getShmot() {
        return this._shmot;
    }

    selectShmotID(id) {
        this._selectedShmotId = this._shmot[id] ? id : -1;
    }

    getSelectedShmotID() {
        return this._selectedShmotId;
    }

    editSelectedShmot(name, description, type, price, file) {
        let selectedShmot = this._shmot[this._selectedShmotId];
        selectedShmot.name = name;
        selectedShmot.description = description;
        selectedShmot.type = type;
        selectedShmot.price = price;
        if (file) {
            selectedShmot.file = file;
        }
        this._shmot[this._selectedShmotId] = selectedShmot;
        this._increaseID();
    }

    deleteSelectedShmot() {
        this._shmot.splice(this._selectedShmotId, 1);
    }
}

module.exports = Shmot
