import { formatQuery, RuleGroupTypeIC, RuleType, transformQuery } from 'react-querybuilder';
import { TargetingAttribute } from '../../../lib/models/TargetingAttribute';

export const transformAndFormatQuery = (
    query: RuleGroupTypeIC,
    attributes: TargetingAttribute[],
): string => {
    const attMap: Record<string, TargetingAttribute> = attributes.reduce((acc, curr) => ({ ...acc, [curr.attribute_key]: curr }), {})
    const attrTypeMap: Record<number, (value: any) => any> = {
        0: parseFloat,
        1: parseInt,
        2: (v) => v
    }

    const tarnsformedQuery = transformQuery(
        query,
        {
            combinatorMap: { and: '&&', or: '||', not: '!' },
            ruleProcessor: (rule: RuleType): RuleType => {
                const attr = attMap[rule.field]

                const newRule: RuleType = {
                    ...structuredClone(rule),
                    field: attr.spel_expression ?? rule.field,
                    value: attrTypeMap[attr.attribute_type].call(null, rule.value),
                }

                return newRule
            }
        }
    );
    return formatQuery(tarnsformedQuery, { format: 'spel' });
};
