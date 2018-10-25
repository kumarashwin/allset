import * as React from 'react';
import { AgeGenderForm } from 'src/components/AgeGenderForm/AgeGenderForm';

import './AgeGenderPage.css';

interface IOwnProps {
  someProps?: any;
}
type Props = IOwnProps;

export const AgeGenderPage: React.StatelessComponent<Props> = ({ }: Props) => (
  <div className="page">
    <div className="container">
      <AgeGenderForm />
    </div>
  </div >
);
