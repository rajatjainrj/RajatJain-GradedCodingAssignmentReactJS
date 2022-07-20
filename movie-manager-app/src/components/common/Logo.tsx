import React from "react";
import {faVideoCamera} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Logo = () => {
    return (
        <FontAwesomeIcon
            icon={faVideoCamera}
            className="me-2"
        />
    );
}

export default Logo;
