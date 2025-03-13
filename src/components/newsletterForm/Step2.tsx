import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';

interface Step2Props {
  onNext: () => void;
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number')
    .required('Phone number is required'),
  company: yup.string().required('Company name is required'),
  referralSource: yup.string().required('Please select an option'),
  referralOther: yup.string().when('referralSource', {
    is: (val: string) => val === 'others',
    then: (schema) => schema.required('Please specify')
  }),
  interest: yup.string().required('Please select an interest')
});

const Step2: React.FC<Step2Props> = ({ onNext }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    referralSource: '',
    referralOther: '',
    interest: ''
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      // Send to webhook
      await fetch('https://your-webhook-url.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      onNext();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className='w-full'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div className='flex items-center justify-center md:justify-start'>
              <div className='space-y-6 px-4 md:pl-0 text-center md:text-left w-full max-w-2xl'>
                <div className='space-y-2'>
                  <h1 className='text-4xl md:text-5xl font-bold md:font-extrabold text-[#363430] leading-tight'>
                    Don't Miss Out
                  </h1>
                  <p className='text-base md:text-lg text-gray-800 md:pr-8'>
                    Get marketing tips and strategies delivered direct to you that are proven to 3x-6x your conversion!
                  </p>
                </div>

                <div className='space-y-4'>
                  {/* Name Fields */}
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <Field
                        name="firstName"
                        placeholder="First Name"
                        className="input-field"
                      />
                      <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <Field
                        name="lastName"
                        placeholder="Last Name"
                        className="input-field"
                      />
                      <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className="input-field"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <Field
                        name="phone"
                        placeholder="Phone Number"
                        className="input-field"
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <Field
                      name="company"
                      placeholder="Company Name"
                      className="input-field"
                    />
                    <ErrorMessage name="company" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Referral Source */}
                  <div>
                    <Field
                      as="select"
                      name="referralSource"
                      className="input-field"
                    >
                      <option value="" className='text-gray-600'>How did you hear about us?</option>
                      <option value="facebook">Facebook</option>
                      <option value="google">Google</option>
                      <option value="others">Others</option>
                    </Field>
                    <ErrorMessage name="referralSource" component="div" className="text-red-500 text-sm" />
                    
                    {values.referralSource === 'others' && (
                      <div className="mt-2">
                        <Field
                          name="referralOther"
                          placeholder="Please specify"
                          className="input-field"
                        />
                        <ErrorMessage name="referralOther" component="div" className="text-red-500 text-sm" />
                      </div>
                    )}
                  </div>

                  {/* Interests Radio Group */}
                  <div className='space-y-2'>
                    <label className='block text-left font-medium'>I'm interested in:</label>
                    <div className='ml-2 grid grid-cols-1 md:grid-cols-2 gap-2'>
                      {[1, 2, 3, 4].map((num) => (
                        <label key={num} className='flex items-center space-x-2'>
                          <Field
                            type="radio"
                            name="interest"
                            value={`option${num}`}
                            className="form-radio"
                          />
                          <span>Option {num}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage name="interest" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className='flex justify-center md:justify-start'>
                  <InteractiveHoverButton
                    type="submit"
                    disabled={isSubmitting}
                    className='bg-[#FFC710] border-transparent px-12 py-3 md:py-4 text-base font-normal tracking-wider text-[#4E3105] flex justify-center md:justify-start w-full md:w-auto'
                  >
                    {isSubmitting ? 'Submitting...' : 'Subscribe'}
                  </InteractiveHoverButton>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step2;