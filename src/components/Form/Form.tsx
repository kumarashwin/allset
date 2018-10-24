import * as React from 'react';
import { SubmitButton } from 'src/components/SubmitButton/SubmitButton';

interface IOwnProps {
  name: string;
  disabled?: boolean;
  onSubmit: (e: any) => any;
}
type Props = IOwnProps;

export class Form extends React.PureComponent<Props> {
  /**
   * Makes it so that some code that should run
   * with each of the handler functions is run here.
   */
  public static handlerWrapper = (handler: (e: any) => any) => (event: any) => {
    handler(event);
    event.preventDefault();
  }

  public render() {
    const {
      children,
      disabled = false,
      onSubmit: handleSubmit,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        {children}
        <br />
        <br />
        <SubmitButton disabled={disabled}/>
      </form>
    );
  }
};