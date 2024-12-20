import { Field } from 'react-querybuilder';
import { TargetingAttribute } from '../../../lib/models/TargetingAttribute';
import { toOptionsList } from './toOptions';

export const toFields = (attributes: TargetingAttribute[]): Field[] => {
  const fields: Field[] = attributes
    .filter(
      (att) => att.pattern === '0|*' || (att.pattern.trim() === '' && att.attribute_type === 2),
    )
    .map((att) => ({
      id: att.attribute_key,
      label: att.display_name,
      name: att.attribute_key,
      inputType: 'number',
    }));

  const moreFields: Field[] = attributes
    .filter((att) => !fields.some((f) => att.attribute_key === f.id))
    .map((att) => ({
      id: att.attribute_key,
      label: att.display_name,
      name: att.attribute_key,
      valueEditorType: att.pattern_multiselect ? 'multiselect' : 'select',
      values: toOptionsList(att),
    }));

  return [...fields, ...moreFields];
};
