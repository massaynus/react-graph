import { formatQuery, RuleGroupTypeIC, RuleType, transformQuery } from 'react-querybuilder';
import { TargetingAttribute } from '../../../lib/models/TargetingAttribute';

const attrTypeMap: Record<number, (value: string) => any> = {
  0: parseFloat,
  1: parseInt,
  2: (v) => v,
};

const listAttrTypeMap: Record<number, (value: string) => any> = {
  0: (value: string) =>
    `new double[]{${value
      .split(',')
      .map((v) => parseFloat(v))
      .join(',')}}`,
  1: (value: string) =>
    `new int[]{${value
      .split(',')
      .map((v) => parseInt(v))
      .join(',')}}`,
  2: (value: string) =>
    `new String[]{${value
      .split(',')
      .map((v) => `"${v}"`)
      .join(',')}}`,
};

export const transformAndFormatQuerytoSpEL = (
  query: RuleGroupTypeIC,
  attributes: TargetingAttribute[],
): string => {
  const attMap: Record<string, TargetingAttribute> = attributes.reduce(
    (acc, curr) => ({ ...acc, [curr.attribute_key]: curr }),
    {},
  );

  const tarnsformedQuery = transformQuery(query, {
    combinatorMap: { and: '&&', or: '||', not: '!' },

    ruleProcessor: (rule: RuleType): RuleType => {
      const attr = attMap[rule.field];

      const newRule: RuleType = {
        ...structuredClone(rule),
        field: attr.spel_expression ?? rule.field,
        value: (attr.pattern_multiselect ? listAttrTypeMap : attrTypeMap)[attr.attribute_type].call(
          null,
          rule.value,
        ),
      };

      if (newRule.field.match('{{selectedValues}}')) {
        newRule.field = newRule.field.replace(/\{\{selectedValues\}\}/g, newRule.value);
        newRule.value = true;
        newRule.operator = '==';
      }

      return newRule;
    },
  });

  return formatQuery(tarnsformedQuery, { format: 'spel' });
};
