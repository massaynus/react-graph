import { TargetingAttribute } from '../../../lib/models/TargetingAttribute';

export const mockTargetingAttributes: TargetingAttribute[] = [
  {
    attribute_key: 'att_1',
    attribute_type: 2,
    display_name: 'Gender',
    pattern: '0|1',
    pattern_description: 'male|female',
    pattern_multiselect: false,
    spel_expression: '#utils.getGender(#user)',
  },
  {
    attribute_key: 'att_4',
    attribute_type: 2,
    display_name: 'Partners',
    pattern: '0|1|2|3|4',
    pattern_description: 'aral|otto|pt|payback|saturn',
    pattern_multiselect: true,
    spel_expression: '#utils.isForPartner(#event, {{selectedValues}})',
  },
  {
    attribute_key: 'att_2',
    attribute_type: 1,
    display_name: 'Age',
    pattern: '0|*',
    pattern_description: 'age',
    pattern_multiselect: false,
    spel_expression: '#utils.getAge(#user)',
  },
  {
    attribute_key: 'att_3',
    attribute_type: 0,
    display_name: 'MinimumPurchase',
    pattern: '0|*',
    pattern_multiselect: false,
    spel_expression: '#utils.getPuchaseValue(#event)',
  },
];
