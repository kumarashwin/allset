import * as React from 'react';

interface IOwnProps {
  value?: string;
  disabled?: boolean;
}
type Props = IOwnProps;

export const SubmitButton = ({ value = 'Submit', disabled = false }: Props) => (
  <input disabled={disabled} type="submit" {...{ value }} />
);