import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Input from "../../utils/input/Input";
import {deleteShmot, editGet} from "../../actions/user";

const Del = () => {
    const [contentLoaded, setContentLoaded] = useState(false);
    let [shmot, setShmot] = useState({name: "", description: "", type: "other", price: 0, file: ""})

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

    if (!contentLoaded) {
        setContentLoaded(true);
        editGet(shmotId).then(shmot => {
            setShmot(shmot);
        })
    }
    return (
        <div className="shmot-form">
            <form encType="multipart/form-data">
                <div className="shmot-form__title">
                    Delete your shmot here
                </div>
                <div className="shmot-form__input">
                    <Input value={shmot.name} type="text" placeholder="Name" disabled={true}/>
                </div>
                <div className="shmot-form__input">
                    <Input value={shmot.description} type="text" placeholder="Description" disabled={true}/>
                </div>
                <div className="shmot-form__input">
                        <select name="type" value={shmot.type} disabled={true}>
                            <option value="other">Other</option>
                            <option value="hoodie">Hoodie</option>
                            <option value="socks">Socks</option>
                        </select>
                </div>
                <div className="shmot-form__input">
                    <Input value={shmot.price} type="number" placeholder="Price" disabled={true}/>
                </div>
                <NavLink to={`/view`}>
                    <button type="submit" className="shmot-form__button" onClick={(event) => deleteShmot(event, shmotId)} >Delete</button>
                </NavLink>
            </form>
        </div>
    );
};

export default Del;
