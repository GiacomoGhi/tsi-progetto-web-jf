/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { FieldType } from './field-type.enum';
import { SelectItem } from './select-item';

export interface FieldConfig {
  // per export
  name: string;
  label: string;
  type: FieldType;
  elementValues?: SelectItem[];
  hidden?: boolean;
}
