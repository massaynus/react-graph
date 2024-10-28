import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { modalActions, modalSelectors, ModalTypes } from '../../../redux/modal/slice';
import ModalLayout from '../ModalLayout/ModalLayout';
import { graphActions, UIGraphNode } from '../../../redux/graph/slice';
import useIsModalOpen from '../../../hooks/useIsModalOpen';
import styles from './AddTGNodeModal.module.scss';
import { GraphNode } from '../../../lib/nodes/GraphNode';
import { NodeType } from '../../../lib/nodes/NodeTypes';
import { QueryBuilder } from 'react-querybuilder';
import AttributesQueryBuilder from '../../AttributesQueryBuilder/AttributesQueryBuilder';

const AddTGNodeModal = () => {
  const isModalOpen = useIsModalOpen(ModalTypes.AddTGNodeModal);
  const dispatch = useAppDispatch();
  const bag = useAppSelector(modalSelectors.selectBag);

  if (bag === undefined || !('node' in bag)) {
    console.error('Opened Node action modal without a node present in bag');
    handleDismiss();
    return <React.Fragment></React.Fragment>;
  }

  const node: UIGraphNode = bag['node'];

  const handleSave = () => {
    //TODO: Implement

    dispatch(modalActions.dismissModal());
  };

  if (!isModalOpen) return <></>;

  return (
    <ModalLayout
      title="Please populate the TG Attributes"
      footerContent={
        <>
          <button onClick={handleSave}>Save</button>
        </>
      }
    >
      <AttributesQueryBuilder />
    </ModalLayout>
  );
};

export default AddTGNodeModal;
