import QueryBuilder, { RuleGroupTypeIC } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import { mockTargetingAttributes } from '../../data/mockTargetingAttributes';
import { useEffect, useState } from 'react';
import { toFields } from './utils/toFields';
import { transformAndFormatQuery } from './utils/formatQuery';

const AttributesQueryBuilder = () => {
  const [query, setQuery] = useState<RuleGroupTypeIC>();
  const fields = toFields(mockTargetingAttributes);

  useEffect(() => {
    const queryCopie = structuredClone(query);
    if (typeof queryCopie === 'undefined') return;

    console.log(transformAndFormatQuery(queryCopie, mockTargetingAttributes));
  }, [query]);

  return (
    <QueryBuilder
      fields={fields}
      onQueryChange={(query: RuleGroupTypeIC) => {
        setQuery(query);
      }}
      showShiftActions
    />
  );
};

export default AttributesQueryBuilder;
