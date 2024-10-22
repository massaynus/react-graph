import { graphReducer } from './graph/slice';
import { modalReducer } from './modal/slice';

const rootReducer = {
  graph: graphReducer,
  modal: modalReducer
};

export default rootReducer;
