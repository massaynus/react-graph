import React from "react"
import { createPortal } from "react-dom"


const ModalResolver = () => {
    return createPortal(
        (<React.Fragment></React.Fragment>),
        document.querySelector('#modalPortal')!,
    )
}


export default ModalResolver