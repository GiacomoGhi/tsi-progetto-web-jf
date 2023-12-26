import { FilterOperator } from './filter-operator.enum';
import { FilterType } from './filter-type.enum';

export interface FilterValue {
  field: string;
  type: FilterType;
  operator: FilterOperator;
  value: any[];
  bracketCode?: string; // AND (cond a OR cond b...)
  // notBracketCode?: string; // AND NOT(cond a OR cond b...)
}
