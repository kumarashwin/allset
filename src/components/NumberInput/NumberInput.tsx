import * as React from 'react';

interface IOwnProps {
  name: string;
  onChange: (e: any) => any;
  label?: string;
  value?: string;
}
type Props = IOwnProps;

export const NumberInput = ({ name, label = '', value = '', onChange }: Props) => (
  <label>
    {label}
    <input type="number" {...{ name, value, onChange }} />
  </label>
);