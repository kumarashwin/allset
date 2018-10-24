import config from 'src/config/default.config';

const baseAPIUrl = config.api.url;

interface ISubmitFormArgs {
  name: string,
  payload: {}
};

type SubmitForm = (args: ISubmitFormArgs) => Promise<{ id: string } | undefined>;
export const SubmitForm: SubmitForm = async ({ name, payload }) => {
  switch (name) {
    case 'form-name-1':
      return Promise.resolve(undefined);
    case 'form-name-2':
      return Promise.resolve(undefined);
    case 'form-name-3':
      return Promise.resolve(undefined);
    case 'age-gender-form':
      const response = await fetch(`${baseAPIUrl}/posts`, {
        body: JSON.stringify({ ...payload }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
        method: 'POST',
      });

      if(response.status !== 201){
        // This is where I'd alert a notification
        // system to throw the appropriate error
        // to advice the user of the failure.
      }

      return response.json();
    default:
      return Promise.resolve(undefined);
  }
};