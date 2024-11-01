import {
  formatQuery,
  isRuleGroup,
  RuleGroup,
  RuleGroupICArray,
  RuleGroupTypeIC,
  RuleType,
  transformQuery,
} from 'react-querybuilder';
import { TargetingAttribute } from '../../../lib/models/TargetingAttribute';

const attrTypeMap: Record<number, (value: string) => any> = {
  1: parseFloat,
  2: parseInt,
  3: (v) => v,
};

const listAttrTypeMap: Record<number, (value: string) => any> = {
  1: (value: string) =>
    `new double[]{${value
      .split(',')
      .map((v) => parseFloat(v))
      .join(',')}}`,
  2: (value: string) =>
    `new int[]{${value
      .split(',')
      .map((v) => parseInt(v))
      .join(',')}}`,
  3: (value: string) =>
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

      if (newRule.field.match(/\{\{\s*selectedValues\s*\}\}/)) {
        newRule.field = newRule.field.replace(/\{\{\s*selectedValues\s*\}\}/g, newRule.value);
        newRule.value = true;
        newRule.operator = '==';
      }

      newRule.field = newRule.field.replace(
        /\{\{\s*attribute_key\s*\}\}/g,
        `"${attr.attribute_key}"`,
      );
      newRule.field = newRule.field.replace(/\{\{\s*value\s*\}\}/g, newRule.value);

      return newRule;
    },
  });

  // Because ruleGroupProcessor runs before the ruleProcessor
  // and we want to sort base on the resolved values
  const tarnsformedRG = transformQuery(tarnsformedQuery, {
    ruleGroupProcessor: (ruleGroup: RuleGroupTypeIC): any => {
      const rg = structuredClone(ruleGroup) as RuleGroupTypeIC;
      console.log(Object.getOwnPropertyDescriptor(rg, 'rules'));

      // Event though the rules are sorted it seems like assigning them to the rules field doesn't change the order
      const newRules = rg.rules
        .map((r1) => r1)
        .sort((r1, r2) => {
          if (typeof r1 !== 'string' && 'field' in r1 && r1.field.includes('event')) return -1;
          if (typeof r2 !== 'string' && 'field' in r2 && r2.field.includes('event')) return 1;
          else return 0;
        });

      return { ...rg, rules: newRules } as RuleGroupTypeIC;

      /**
      rg.rules = rg.rules
        .map((rg) => rg)
        .sort((r1, r2) => {
          // Handeling the other types a ruleGroup can have
          // just keep them in the same order
          if (typeof r1 === 'string' || isRuleGroup(r1)) return 1;
          if (typeof r2 === 'string' || isRuleGroup(r2)) return -1;

          // At this point we know this is a rule, I don't even know why this API behaves this way
          // since looking at this piece of source code does the same tests i do before calling the ruleGroupProcessor
          // https://github.com/react-querybuilder/react-querybuilder/blob/990cc3ebb1fb641f4eb68c27a73bb0cdb41f729f/packages/react-querybuilder/src/utils/formatQuery/formatQuery.ts#L489

          if ((r1.value as string)?.includes('event')) return -1;
          else if ((r2.value as string).includes('event')) return 1;
          else return 0;
        });

      return rg;
      **/
    },
  });

  console.log('Result: ', tarnsformedRG);

  return formatQuery(tarnsformedRG, { format: 'spel' });
};
