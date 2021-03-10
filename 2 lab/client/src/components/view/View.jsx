import React, {useState} from 'react';
import {view} from "../../actions/user";
import "./view.css"
import {NavLink} from "react-router-dom";

const View = () => {
    const [contentLoaded, setContentLoaded] = useState(false);
    const [shmots, setShmots] = useState([]);
    let index = 0;

    if (!contentLoaded) {
        setContentLoaded(true);
        view().then(shmot => {
            setShmots(shmot);
        })
    }

    const IncreaseIndex = () => index++;

    return (
        <div className="">
            {shmots.map((shmot) => (
                <div className={"content"} key={index}>
                    <div className="button">
                        <NavLink to={`/edit?id=${index}`}>
                            <button className="edit-delete-button edit" name={IncreaseIndex()}>EDIT</button>
                        </NavLink>
                    </div>

                    <div className="clothes-view">
                        <div className="clothes-view__title">
                            {shmot.name}
                        </div>
                        <div className="clothes-view__description">
                            {shmot.description}
                        </div>
                        <div className="clothes-view__type">
                            {shmot.type}
                        </div>
                        <div className="clothes-view__photo">
                            {shmot.file && <img src={`http://localhost:5000/${shmot.file}`} alt={""}/>}
                        </div>
                        <div className="clothes-view__price">
                            {shmot.price}$
                        </div>
                    </div>

                    <div className="button">
                        <NavLink to={`/del?id=${index-1}`}>
                            <button className="edit-delete-button delete" name={index-1}>DELETE</button>
                        </NavLink>
                    </div>
                </div>
                )
            )}
        </div>
    );
};

export default View;
