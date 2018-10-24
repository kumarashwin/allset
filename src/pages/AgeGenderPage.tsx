import * as React from 'react';
import { AgeGenderForm } from 'src/components/AgeGenderForm/AgeGenderForm';

interface IOwnProps { 
  someProps?: any;
}
type Props = IOwnProps;

export const AgeGenderPage: React.StatelessComponent<Props> = ({ }: Props) => (
  <div>
    Let's begin! Here are some simple questions to get you started.
    <br />
    <br />
    <AgeGenderForm />
  </div>
);
