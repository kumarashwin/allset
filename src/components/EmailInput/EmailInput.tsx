import * as React from 'react';

interface IOwnProps {
  name: string;
  onChange: (e: any) => any;
  label?: string;
  value?: string;
}
type Props = IOwnProps;

export const EmailInput = ({ name, label = '', value = '', onChange }: Props) => (
  <label>
    {label}
    <br />
    <input type="email" {...{ name, value, onChange }} />
  </label>
);