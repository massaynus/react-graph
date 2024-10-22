import { createPortal } from "react-dom"
import NodeActionModal from "./NodeActionModal/NodeActionModal"
import { modalSelectors, ModalTypes } from "../../redux/modal/slice"
import { useAppSelector } from "../../redux/hooks"
import React from "react"

const ModalPortal = () => {

    const isPortalOpen = useAppSelector(modalSelectors.selectIsPortalOpen)
    const chosenModal = useAppSelector(modalSelectors.selectChosenModal)

    const ModalConfig = {
        [ModalTypes.NodeActionModal]: <NodeActionModal />
    }

    if (!isPortalOpen || chosenModal === undefined) return <React.Fragment></React.Fragment>

    return createPortal(
        (ModalConfig[chosenModal]),
        document.querySelector('#modalPortal')!,
    )
}


export default ModalPortal