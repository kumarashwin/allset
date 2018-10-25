import * as React from 'react';

interface IOwnProps {
  name: string;
  onChange: (e: any) => any;
  label?: string;
  value?: string;
}
type Props = IOwnProps;

export const TextInput = ({ name, label = '', value = '', onChange }: Props) => (
  <label>
    {label}
    <input type="text" {...{ name, value, onChange }} />
  </label>
);