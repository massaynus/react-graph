import { TargetingAttribute } from '../../../lib/models/TargetingAttribute';

export const mockTargetingAttributes: TargetingAttribute[] = [
  {
    attribute_key: 'att_1',
    attribute_type: 3,
    display_name: 'Gender',
    pattern: '0|1',
    pattern_description: 'male|female',
    pattern_multiselect: false,
    spel_expression: '#utils.getGender(#user)',
  },
  {
    attribute_key: 'att_4',
    attribute_type: 3,
    display_name: 'Partners',
    pattern: '0|1|2|3|4',
    pattern_description: 'aral|otto|pt|payback|saturn',
    pattern_multiselect: true,
    spel_expression: '#utils.isForPartner(#event, {{selectedValues}})',
  },
  {
    attribute_key: 'att_2',
    attribute_type: 2,
    display_name: 'Age',
    pattern: '0|*',
    pattern_description: 'age',
    pattern_multiselect: false,
    spel_expression: '#utils.getAge(#user)',
  },
  {
    attribute_key: 'att_3',
    attribute_type: 1,
    display_name: 'MinimumPurchase',
    pattern: '0|*',
    pattern_multiselect: false,
    spel_expression: '#utils.getPuchaseValue(#event)',
  },
  {
    attribute_key: 'G00660',
    display_name: 'NEWSLETTER_POTENZIAL',
    attribute_type: 1,
    pattern: '0|1',
    pattern_description: 'NEIN|JA',
    pattern_multiselect: null,
    spel_expression:
      '(#mUtils.getMemberAttributeAsNumeric({{ attribute_key }}) or #mUtils.getMemberAttributeAsNumeric({{ attribute_key }}))',
  },
  {
    attribute_key: 'MJ0001',
    display_name: 'value of Purchase',
    attribute_type: 2,
    pattern: '',
    pattern_description: null,
    pattern_multiselect: null,
    spel_expression: '#event.totalPurchaseValue()',
  },
  {
    attribute_key: 'MJ0002',
    display_name: 'ONLINE Transaction',
    attribute_type: 1,
    pattern: '0|1',
    pattern_description: 'NEIN|JA',
    pattern_multiselect: null,
    spel_expression: '#event.isOnlineTransaction()',
  },
  {
    attribute_key: 'MJ0003',
    display_name: 'POS transaction',
    attribute_type: 1,
    pattern: '0|1',
    pattern_description: 'NEIN|JA',
    pattern_multiselect: null,
    spel_expression: '#event.isPOSTransaction()',
  },
  {
    attribute_key: 'MJ0004',
    display_name: 'MarketingPermission',
    attribute_type: 2,
    pattern: '1|2|3|4',
    pattern_description: 'EWE00|EWE06|EWE09|EWE23',
    pattern_multiselect: null,
    spel_expression: '#mUtils.hasMarketingPermissionGreatThanOrEqual({{ selectedValues }})',
  },
  {
    attribute_key: 'MJ0005',
    display_name: 'IsPartOfSelection',
    attribute_type: 2,
    pattern: '1|2|3',
    pattern_description: 'Select1|Select2|Select3',
    pattern_multiselect: true,
    spel_expression: '#mUtils.IsPartOfSelection({{ selectedValues }})',
  },
];
