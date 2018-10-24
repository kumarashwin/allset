import * as React from 'react';

interface IOption {
  text: string;
  value: string;
};

interface IOwnProps {
  name: string;
  onChange: (e: any) => any;
  options: IOption[];
  label?: string;
}
type Props = IOwnProps;

export const DropDownInput = ({
  onChange,
  options,
  label = '',
}: Props) => (
  <label>
    {label}
    <br />
    <select onChange={onChange}>
      {options.map(({ value, text }) => (
        <option key={value} value={value}>{text}</option>
      ))}
    </select>
  </label>
);