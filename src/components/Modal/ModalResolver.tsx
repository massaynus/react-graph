import React from "react"
import { createPortal } from "react-dom"


export interface ModalPortalProps {
    chidlren: React.ReactNode[]
}

const ModalPortal = ({ chidlren }: ModalPortalProps) => {
    return createPortal(
        (<React.Fragment>{chidlren}</React.Fragment>),
        document.querySelector('#modalPortal')!,
    )
}


export default ModalPortal