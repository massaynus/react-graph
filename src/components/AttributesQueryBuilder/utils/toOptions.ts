import { TargetingAttribute } from '../../../lib/models/TargetingAttribute';

export const toOptionsList = (att: TargetingAttribute): { label: string; name: string }[] => {
  const values = att.pattern.split('|');
  const fields = att.pattern_description?.split('|')!;

  const options = fields.map((field, idx) => ({
    field,
    value: att.attribute_type === 1 || att.attribute_type === 2 ? values[idx] : field,
  }));

  return [{ label: 'N/A', name: '' }].concat(
    options.map(({ field, value }) => ({ label: field, name: value })),
  );
};
