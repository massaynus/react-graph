import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { modalActions, modalSelectors, ModalTypes } from "../../../redux/modal/slice";
import ModalLayout from "../ModalLayout/ModalLayout"
import { graphActions, UIGraphNode } from "../../../redux/graph/slice";
import useIsModalOpen from "../../../hooks/useIsModalOpen";
import styles from './AddNodeModal.module.scss'
import { GraphNode } from "../../../lib/nodes/GraphNode";
import { NodeType } from "../../../lib/nodes/NodeTypes";

const AddNodeModal = () => {
    const isModalOpen = useIsModalOpen(ModalTypes.AddNodeModal)
    const dispatch = useAppDispatch()
    const bag = useAppSelector(modalSelectors.selectBag)

    const [nodeId, setNodeId] = useState('')
    const [nodeType, setNodeType] = useState('')
    const [data, setData] = useState('')

    const handleDismiss = () => {
        dispatch(modalActions.dismissModal())
    }

    if (bag === undefined || !('node' in bag)) {
        console.error('Opened Node action modal without a node present in bag')
        handleDismiss()
        return <React.Fragment></React.Fragment>
    }

    const node: UIGraphNode = bag['node']

    const handleSave = () => {
        const newNode = new GraphNode(nodeId, nodeType as NodeType, data)
        dispatch(graphActions.addNode({
            parent: node,
            child: newNode.serialize()
        }))

        handleDismiss()
    }

    if (!isModalOpen) return <></>

    return <ModalLayout
        title="Choose the new node"
        footerContent={
            <>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleDismiss}>Dismiss</button>
            </>
        }
    >
        <div className={styles.form}>
            <input type="text" name="nodeId" id="nodeId" placeholder="node id" onChange={(e) => setNodeId(e.target.value)} value={nodeId} />
            <input type="text" name="data" id="data" placeholder="data" onChange={(e) => setData(e.target.value)} value={data} />
            <select name="nodeType" id="nodeType" onChange={(e) => {
                console.log(nodeType, e.target.value, e.currentTarget.value)
                setNodeType(e.target.value)
            }} value={nodeType}>
                <option disabled hidden selected value=""></option>
                {node.allowedChildrenTypes.map((child, idx) => (
                    <option key={`${child}-${idx}`} value={child}>{child}</option>
                ))}
            </select>
        </div>
    </ModalLayout>
}

export default AddNodeModal;