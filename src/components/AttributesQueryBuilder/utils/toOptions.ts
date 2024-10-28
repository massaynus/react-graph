import { TargetingAttribute } from '../../../lib/models/TargetingAttribute';

export const toOptionsList = (att: TargetingAttribute): { label: string; value: string }[] => {
  const values = att.pattern.split('|');
  const fields = att.pattern_description?.split('|')!;

  const options = fields.map((field, idx) => ({ field, value: values[idx] }));

  return options.map(({ field, value }) => ({ label: field, value }));
};
