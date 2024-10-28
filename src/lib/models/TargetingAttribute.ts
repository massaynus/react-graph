export interface TargetingAttribute {
  attribute_key: string;
  display_name: string;
  attribute_type: number;
  pattern: string;
  pattern_description?: string | null;
  pattern_multiselect?: boolean | null;
  spel_expression?: string | null;
}
