import { formatQuery, RuleGroupTypeAny, RuleGroupTypeIC, transformQuery } from 'react-querybuilder';
import { TargetingAttribute } from '../../../lib/models/TargetingAttribute';

export const transformAndFormatQuery = (
  query: RuleGroupTypeIC,
  attributes: TargetingAttribute[],
): string => {
  const tarnsformedQuery = transformQuery(query);
  return formatQuery(tarnsformedQuery, { format: 'spel' });
};
