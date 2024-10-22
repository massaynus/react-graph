import React from 'react';

import { graphActions, graphSelectors } from './redux/graph/slice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

import './App.css';
import { NodeType } from './lib/nodes/NodeTypes';
import { GraphNode } from './lib/nodes/GraphNode';
import { Graph } from './components/Graph';
import ModalPortal from './components/Modal/ModalPortal';

function App() {
  const dispatch = useAppDispatch();
  const rootNode = useAppSelector(graphSelectors.selectRootNode);

  function onClickHandler(): void {
    const targetGroupNode = GraphNode.serialize(
      new GraphNode("TG1", NodeType.TargetGroupNode, "TG1")
    )


    const targetGroupNode2 = GraphNode.serialize(
      new GraphNode("TG2", NodeType.TargetGroupNode, "TG2")
    )

    const purchaseNode = new GraphNode('purr1', NodeType.PurchaseNode, 98.8);
    const serializedPurchaseNode = GraphNode.serialize(purchaseNode);

    const serializedCouponNode = GraphNode.serialize(
      new GraphNode('coup1', NodeType.CouponAssignmentNode, 'AWESOME2024'),
    )

    const serializedNoPurchaseNode = GraphNode.serialize(
      new GraphNode('NoPurchase', NodeType.NoPurchaseNode, 'example@email.com'),
    )

    dispatch(
      graphActions.addNode({
        parent: rootNode,
        child: targetGroupNode
      }),
    );
    dispatch(
      graphActions.addNode({
        parent: rootNode,
        child: targetGroupNode2
      }),
    );
    dispatch(
      graphActions.addNode({
        parent: targetGroupNode,
        child: serializedPurchaseNode
      }),
    );
    dispatch(
      graphActions.addNode({
        parent: serializedPurchaseNode,
        child: serializedCouponNode,
      }),
    );
    dispatch(
      graphActions.addNode({
        parent: serializedPurchaseNode,
        child: GraphNode.serialize(
          new GraphNode('coup2', NodeType.CouponAssignmentNode, 'BLACKFRI00'),
        ),
      }),
    );
    dispatch(
      graphActions.addNode({
        parent: targetGroupNode,
        child: serializedNoPurchaseNode,
      }),
    );
    dispatch(
      graphActions.addNode({
        parent: serializedNoPurchaseNode,
        child: serializedCouponNode
      })
    )
  }

  return (
    <React.Fragment>
      <button onClick={onClickHandler}>Add Sample Nodes</button>
      <Graph />
      <ModalPortal />
    </React.Fragment>
  );
}

export default App;
