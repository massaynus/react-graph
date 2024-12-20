import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { modalActions, modalSelectors, ModalTypes } from '../../../redux/modal/slice';
import ModalLayout from '../ModalLayout/ModalLayout';
import { UIGraphNode } from '../../../redux/graph/slice';
import useIsModalOpen from '../../../hooks/useIsModalOpen';

const NodeActionModal = () => {
  const isModalOpen = useIsModalOpen(ModalTypes.NodeActionModal);
  const dispatch = useAppDispatch();
  const bag = useAppSelector(modalSelectors.selectBag);

  const isNodeAbsent = useMemo(() => bag === undefined || !('node' in bag), [bag]);

  const handleDismiss = () => {
    dispatch(modalActions.dismissModal());
  };

  const handleAddNode = () => {
    if (isNodeAbsent) {
      console.error('Opened Node action modal without a node present in bag');
      return;
    }

    dispatch(modalActions.openAddNodeModal(bag!['node'] as UIGraphNode));
  };

  if (isNodeAbsent) {
    console.error('Opened Node action modal without a node present in bag');
    handleDismiss();
    return <React.Fragment></React.Fragment>;
  }

  const node: UIGraphNode = bag!['node'];

  if (!isModalOpen) return <></>;

  return (
    <ModalLayout
      title="What do you want to do with this node?"
      footerContent={
        <>
          <button onClick={handleAddNode}>Add a Node</button>
          <button disabled>Edit</button>
          <button disabled>Delete</button>
          <button onClick={handleDismiss}>Dismiss</button>
        </>
      }
    >
      <pre>
        {JSON.stringify(
          node,
          (key, value) => {
            if (key === 'children') return undefined;
            else return value;
          },
          2,
        )}
      </pre>
    </ModalLayout>
  );
};

export default NodeActionModal;
