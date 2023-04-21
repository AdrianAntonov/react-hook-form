import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

export const YouTubeForm = () => {
  const reg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      channel: '',
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumbers: ['', ''],
      phNumbers: [{ number: '' }],
      age: 0,
      dob: new Date(),
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  // React.useEffect(() => {
  //   const subscribtion = watch((value) => console.log(value));
  //   return () => subscribtion.unsubscribe();
  // }, [watch]);

  const handleGetValues = () => {
    console.log(getValues());
  };
  const handleSetValues = () => {
    console.log(
      setValue('username', 'Ziuzia', {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    );
  };

  const onSubmit = (data: FormValues) => {
    console.log('Form Submited', data);
    // form.reset();
  };

  // console.log(fields);

  renderCount++;

  return (
    <div>
      <h1>YouTubeForm: ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: { value: true, message: 'Username is required' },
            })}
          />
          <p className="errors">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register('email', {
              pattern: {
                value: reg,
                message: 'Invalid email format',
              },
              validate: {
                noAdmin: (fieldValue) => {
                  return (
                    fieldValue !== 'admin@example.com' ||
                    'Enter a different email address'
                  );
                },
                noBadDomain: (fieldValue) => {
                  return (
                    !fieldValue.endsWith('baddomain.com') ||
                    'This domain is not supported'
                  );
                },
              },
            })}
          />
          <p className="errors">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register('channel', { required: 'Channel is required' })}
          />
          <p className="errors">{errors.channel?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register('social.twitter', {
              required: 'Twitter username is required',
            })}
          />
          <p className="errors">{errors.social?.twitter?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register('social.facebook', {
              required: 'Facebook username is required',
            })}
          />
          <p className="errors">{errors.social?.facebook?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone">First phone</label>
          <input
            type="text"
            id="primary-phone"
            {...register('phoneNumbers.0', {
              required: 'Primary phone is required',
            })}
          />
          <p className="errors">
            {errors.phoneNumbers && errors?.phoneNumbers[0]?.message}
          </p>
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">Second phone</label>
          <input
            type="text"
            id="secondary-phone"
            {...register('phoneNumbers.1', {
              required: 'Secondary phone is required',
            })}
          />
          <p className="errors">
            {errors.phoneNumbers && errors?.phoneNumbers[1]?.message}
          </p>
        </div>
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields?.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    id="phNumbers"
                    {...register(`phNumbers.${index}.number`, {
                      required: 'Secondary phone is required',
                    })}
                  />
                  <p className="errors">
                    {errors.phoneNumbers && errors?.phoneNumbers[1]?.message}
                  </p>
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: '' })}>
              Add phone number
            </button>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register('age', {
              valueAsNumber: true,
              required: 'Age is required',
            })}
          />
          <p className="errors">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register('dob', {
              valueAsDate: true,
              required: 'Date of birth is required',
            })}
          />
          <p className="errors">{errors.dob?.message}</p>
        </div>

        <button>Submit</button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValues}>
          Set Values
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
