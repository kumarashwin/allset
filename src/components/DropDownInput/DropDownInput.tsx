import * as React from 'react';

interface IOption {
  text: string;
  value?: string;
};

interface IOwnProps {
  name: string;
  onChange: (e: any) => any;
  options: IOption[];
  label?: string;
  labelClassname?: string;
}
type Props = IOwnProps;

export const DropDownInput = ({
  onChange,
  options,
  label = '',
  labelClassname,
}: Props) => (
  <label>
    <span className={labelClassname}>{label}</span>
    <select onChange={onChange}>
      {options.map(({ value, text }) => (
        <option key={value || text} value={value}>{text}</option>
      ))}
    </select>
  </label>
);