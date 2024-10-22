import { createPortal } from "react-dom"
import NodeActionModal from "./NodeActionModal/NodeActionModal"
import { modalSelectors } from "../../redux/modal/slice"
import { useAppSelector } from "../../redux/hooks"
import React from "react"
import AddNodeModal from "./AddNodeModal/AddNodeModal"

const ModalPortal = () => {

    const isPortalOpen = useAppSelector(modalSelectors.selectIsPortalOpen)
    const chosenModal = useAppSelector(modalSelectors.selectChosenModal)

    if (!isPortalOpen || chosenModal === undefined) return <React.Fragment></React.Fragment>

    return createPortal(
        (
            <React.Fragment>
                <NodeActionModal />
                <AddNodeModal />
            </React.Fragment>
        ),
        document.querySelector('#modalPortal')!,
    )
}


export default ModalPortal