import React, {useState} from 'react';
import {editGet, editPost} from "../../actions/user";
import Input from "../../utils/input/Input";

const Edit = () => {
    const [contentLoaded, setContentLoaded] = useState(false);
    let [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [filePath, setFilePath] = useState("")

    function getParam( name ) {
        let regexS = "[\\?&]"+name+"=([^&#]*)";
        let regex = new RegExp( regexS );
        let results = regex.exec( window.location.href );
        if( results == null )
            return "";
        else
            return results[1];
    }
    let shmotId = getParam( 'id' );

    const SelectChangeHandler = (e) => {
        setType(e.target.value);
    }

    function fileUploadHandler(event) {
        setFilePath(event.target.files);
    }
    if (!contentLoaded) {
        setContentLoaded(true);
        editGet(shmotId).then(shmot => {
            setName(shmot.name);
            setDescription(shmot.description);
            setType(shmot.type);
            setPrice(shmot.price);
            setFilePath(shmot.filePath);
        })
    }

    return (
        <div className="shmot-form">
            <form encType="multipart/form-data">
                <div className="shmot-form__title">
                    Edit your shmot here
                </div>
                <div className="shmot-form__input">
                    <Input value={name} setValue={setName} type="text" placeholder="Name"/>
                </div>
                <div className="shmot-form__input">
                    <Input value={description} setValue={setDescription} type="text" placeholder="Description"/>
                </div>
                <div className="shmot-form__input">
                    <label>
                        <select name="type" value={type} onChange={SelectChangeHandler}>
                            <option value="other">Other</option>
                            <option value="hoodie">Hoodie</option>
                            <option value="socks">Socks</option>
                        </select>
                    </label>
                </div>
                <div className="shmot-form__input">
                    <Input value={price} setValue={setPrice} type="number" placeholder="Price"/>
                </div>
                <div className="shmot-form__input">
                    <input onChange={(event)=> fileUploadHandler(event)} type="file" placeholder="Add image"/>
                </div>
                <button type="submit" className="shmot-form__button" onClick={(event) => editPost(event, shmotId, name, description, type, price, filePath)} >Edit</button>
            </form>
        </div>
    );
};

export default Edit;
