import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { modalActions, modalSelectors } from "../../../redux/modal/slice";
import ModalLayout from "../ModalLayout/ModalLayout"
import { UIGraphNode } from "../../../redux/graph/slice";

const NodeActionModal = () => {
    const dispatch = useAppDispatch()
    const bag = useAppSelector(modalSelectors.selectBag)

    const handleDismiss = useCallback(() => {
        dispatch(modalActions.dismissModal())
    }, [dispatch])

    if (bag === undefined || !('node' in bag)) {
        console.error('Opened Node action modal without a node present in bag')
        handleDismiss()
        return <React.Fragment></React.Fragment>
    }

    const node: UIGraphNode = bag['node']

    return <ModalLayout
        title="What do you want to do with this node?"
        footerContent={
            <>
                <button>Add a Node</button>
                <button>Edit</button>
                <button onClick={handleDismiss}>Dismiss</button>
            </>
        }
    >
        <pre>{JSON.stringify(node, null, 2)}</pre>
    </ModalLayout>
}

export default NodeActionModal;