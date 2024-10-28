import { createPortal } from 'react-dom';
import NodeActionModal from './NodeActionModal/NodeActionModal';
import { modalSelectors, ModalTypes } from '../../redux/modal/slice';
import { useAppSelector } from '../../redux/hooks';
import React from 'react';
import AddNodeModal from './AddNodeModal/AddNodeModal';
import AddTGNodeModal from './AddTGNodeModal/AddTGNodeModal';

const ModalPortal = () => {
  const isPortalOpen = useAppSelector(modalSelectors.selectIsPortalOpen);
  const chosenModal = useAppSelector(modalSelectors.selectChosenModal);

  if (!isPortalOpen || chosenModal === undefined) return <React.Fragment></React.Fragment>;

  const modals: Record<ModalTypes, React.ReactNode> = {
    [ModalTypes.AddNodeModal]: <AddNodeModal />,
    [ModalTypes.AddTGNodeModal]: <AddTGNodeModal />,
    [ModalTypes.NodeActionModal]: <NodeActionModal />,
  };

  return createPortal(
    <React.Fragment>{modals[chosenModal]}</React.Fragment>,
    document.querySelector('#modalPortal')!,
  );
};

export default ModalPortal;
