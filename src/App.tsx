import React from 'react';

import BaseNode from './lib/nodes/BaseNode';
import { CommunicationNode } from "./lib/nodes/BaseNode";
import { CouponAssignmentNode } from "./lib/nodes/BaseNode";
import { PurchaseNode } from "./lib/nodes/BaseNode";
import { graphActions, graphSelectors } from './redux/graph/slice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const rootNode = useAppSelector(graphSelectors.selectRootNode)
  const edges = useAppSelector(graphSelectors.selectEdges)


  function onClickHandler(): void {
    const purchaseNode = new PurchaseNode("purr1", 98.8)
    const serializedPurchaseNode = BaseNode.serialize(purchaseNode)
    dispatch(graphActions.setRootNode(serializedPurchaseNode))

    dispatch(graphActions.addNode({
      parent: serializedPurchaseNode, child:
        BaseNode.serialize(new CouponAssignmentNode("coup1", "AWESOME2024"))
    }))
    dispatch(graphActions.addNode({
      parent: serializedPurchaseNode, child:
        BaseNode.serialize(new CouponAssignmentNode("coup2", "BLACKFRI00"))
    }))
    dispatch(graphActions.addNode({
      parent: serializedPurchaseNode, child:
        BaseNode.serialize(new CommunicationNode("coup2", "example@email.com"))
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
