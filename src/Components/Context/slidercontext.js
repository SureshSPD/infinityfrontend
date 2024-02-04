import React, {createContext, useState} from "react";

export const Slidecontext = createContext("");

export const SlidecontextProvider = (props) =>{
    const [inputDataSliderOpen, setInputDataSliderOpen] = useState(false)
    const [inputUseraSliderOpen, setinputUseraSliderOpen] = useState(false)
    const [EmailId, setEmailId] = useState("");
    const [userRole, setUserRole] = useState("");

return(
    <Slidecontext.Provider value={ {EmailId, setEmailId,userRole, setUserRole, inputDataSliderOpen, setInputDataSliderOpen, inputUseraSliderOpen, setinputUseraSliderOpen}}>{props.children}</Slidecontext.Provider>
);
};