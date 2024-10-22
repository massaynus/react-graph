import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { modalActions, modalSelectors, ModalTypes } from "../../../redux/modal/slice";
import ModalLayout from "../ModalLayout/ModalLayout"
import { UIGraphNode } from "../../../redux/graph/slice";
import useIsModalOpen from "../../../hooks/useIsModalOpen";

const AddNodeModal = () => {
    const isModalOpen = useIsModalOpen(ModalTypes.AddNodeModal)
    const dispatch = useAppDispatch()
    const bag = useAppSelector(modalSelectors.selectBag)

    const handleDismiss = () => {
        dispatch(modalActions.dismissModal())
    }

    if (bag === undefined || !('node' in bag)) {
        console.error('Opened Node action modal without a node present in bag')
        handleDismiss()
        return <React.Fragment></React.Fragment>
    }

    const node: UIGraphNode = bag['node']

    if (!isModalOpen) return <></>

    return <ModalLayout
        title="Choose the new node"
        footerContent={
            <>
                <button>Save</button>
                <button onClick={handleDismiss}>Dismiss</button>
            </>
        }
    >
        <pre>{JSON.stringify(node, null, 2)}</pre>
    </ModalLayout>
}

export default AddNodeModal;