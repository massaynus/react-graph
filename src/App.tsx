import React from 'react';

import { graphActions, graphSelectors } from './redux/graph/slice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

import './App.css';
import { NodeType } from './lib/nodes/NodeTypes';
import { GraphNode } from './lib/nodes/GraphNode';


function App() {
  const dispatch = useAppDispatch();
  const rootNode = useAppSelector(graphSelectors.selectRootNode)
  const edges = useAppSelector(graphSelectors.selectEdges)


  function onClickHandler(): void {
    const purchaseNode = new GraphNode("purr1", NodeType.PurchaseNode, 98.8)
    const serializedPurchaseNode = GraphNode.serialize(purchaseNode)

    dispatch(graphActions.setRootNode(serializedPurchaseNode))

    dispatch(graphActions.addNode({
      parent: serializedPurchaseNode, child:
        GraphNode.serialize(new GraphNode("coup1", NodeType.CouponAssignmentNode, "AWESOME2024"))
    }))
    dispatch(graphActions.addNode({
      parent: serializedPurchaseNode, child:
        GraphNode.serialize(new GraphNode("coup2", NodeType.CouponAssignmentNode, "BLACKFRI00"))
    }))
    dispatch(graphActions.addNode({
      parent: serializedPurchaseNode, child:
        GraphNode.serialize(new GraphNode("coup2", NodeType.CommunicationNode, "example@email.com"))
    }))
    dispatch(graphActions.addNode({
      parent: serializedPurchaseNode, child:
        GraphNode.serialize(new GraphNode("NoPurchase", NodeType.NoPurchaseNode, "example@email.com"))
    }))
  }

  return (
    <React.Fragment>
      <button onClick={onClickHandler}>Add Sample Nodes</button>
      <pre>
        {JSON.stringify(edges, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(rootNode, null, 2)}
      </pre>
    </React.Fragment>
  );
}

export default App;
