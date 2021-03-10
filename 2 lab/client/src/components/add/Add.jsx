import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {add} from "../../actions/user";
import "./add.css"
import {NavLink} from "react-router-dom";

const Add = () => {
    const [name, setName] = useState("q")
    const [description, setDescription] = useState("w")
    const [type, setType] = useState("other")
    const [price, setPrice] = useState("")
    const [filePath, setFilePath] = useState("")

    const SelectChangeHandler = (e) => {
        setType(e.target.value);
    }

    function fileUploadHandler(event) {
        setFilePath(event.target.files);
    }

    return (
        <div className="shmot-form">
            <form encType="multipart/form-data">
                <div className="shmot-form__title">
                    Add your shmot here
                </div>
                <div className="shmot-form__input">
                    <Input value={name} setValue={setName} type="text" placeholder="Name"/>
                </div>
                <div className="shmot-form__input">
                    <Input value={description} setValue={setDescription} type="text" placeholder="Description"/>
                </div>
                <div className="shmot-form__input">
                    <label>
                        <select name="type" onChange={SelectChangeHandler}>
                            <option value="other">Other</option>
                            <option value="hoodie">Hoodie</option>
                            <option value="socks">Socks</option>
                        </select>
                    </label>
                </div>
                <div className="shmot-form__input">
                    <Input value={price} setValue={setPrice} type="number" placeholder="Price"/>
                </div>
                <div className="shmot-form__input-file">
                    <input onChange={(event)=> fileUploadHandler(event)} type="file" placeholder="Add image"/>
                </div>
                {/*<NavLink to={"/view"}>*/}
                    <button type="submit" className="shmot-form__button" onClick={(event) => add(event, name, description, type, price, filePath)} >Add</button>
                {/*</NavLink>*/}
            </form>
        </div>
    );
};

export default Add;