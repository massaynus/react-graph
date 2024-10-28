import QueryBuilder, { RuleGroupTypeIC } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';
import { mockTargetingAttributes } from '../../data/mockTargetingAttributes';
import { useEffect, useState } from 'react';
import { toFields } from './utils/toFields';
import { transformAndFormatQuery } from './utils/formatQuery';

const AttributesQueryBuilder = () => {
  const [query, setQuery] = useState<RuleGroupTypeIC>();
  const [tq, setTq] = useState<string>('')
  const fields = toFields(mockTargetingAttributes);

  useEffect(() => {
    const queryCopie = structuredClone(query);
    if (typeof queryCopie === 'undefined') return;

    const tQuery = transformAndFormatQuery(queryCopie, mockTargetingAttributes)
    console.log(tQuery);

    setTq(tQuery);
  }, [query]);

  return (
    <>
      <QueryBuilder
        fields={fields}
        onQueryChange={(query: RuleGroupTypeIC) => {
          setQuery(query);
        }}
        showShiftActions
      />
      <h1>Generated SpEL:</h1>
      <h3 style={{ padding: '1rem' }}>{tq}</h3>
    </>
  );
};

export default AttributesQueryBuilder;
