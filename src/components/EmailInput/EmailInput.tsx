import * as React from 'react';

interface IOwnProps {
  name: string;
  onChange: (e: any) => any;
  value?: string;
  label?: string;
  labelClassname?: string;
}
type Props = IOwnProps;

export const EmailInput = ({
  name,
  onChange,
  value = '',
  label = '',
  labelClassname,
}: Props) => (
  <label>
    <span className={labelClassname}>{label}</span>
    <input type="email" {...{ name, value, onChange }} />
  </label>
);