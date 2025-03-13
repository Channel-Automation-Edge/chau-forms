import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Select from 'react-select';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { Dialog, DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogTitle
} from '@/components/ui/dialog2';
import { Player } from '@lottiefiles/react-lottie-player';
interface OptionType {
  value: string;
  label: string;
}

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
  referralSource: yup.object().nullable(), // Updated to object type
  referralOther: yup.string().when('referralSource', {
    is: (val: OptionType | null) => val?.value === 'others',
    then: (schema) => schema.required('Please specify')
  }),
  interest: yup.array()
    .min(1, 'Please select at least one interest')
    .required('Please select at least one interest')
});

const referralOptions: OptionType[] = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'google', label: 'Google' },
  { value: 'others', label: 'Others' }
];

const interestOptions: OptionType[] = [
  { value: '1', label: 'New in marketing technology' },
  { value: '2', label: 'AI in lead conversion' },
  { value: '3', label: 'New Channel Automation Features' },
  { value: '4', label: 'Custom/Dynamic Content in text' }
];

const Step2: React.FC<Step2Props> = ({ onNext }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    referralSource: null as OptionType | null, // Properly typed
    referralOther: '',
    interest: [] as OptionType[]
  };

  const handleSubmit = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        referralSource: values.referralSource?.value, 
        interest: values.interest.map((i: any) => i.value)
      };

      console.log('values:', formattedValues);

      await fetch('https://your-webhook-url.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedValues),
      });

    } catch (error) {
      console.error('Submission error:', error);
    }
    // Trigger the success dialog
    document.getElementById('dialog')?.click();
  };

  const style = {
    control: (base: any) => ({
      ...base,
      padding: '0.30rem',
      borderRadius: '0.5rem',
      borderColor: '#e5e7eb',
      boxShadow: 'none',
      '&:hover': {
          border: '1px solid #6e11b0',
      },
    }),
    option: (base: any, { isFocused }: { isFocused: boolean }) => {
      return {
        ...base,
        backgroundColor: isFocused ? "#FFEDD3" : "white",
        color: "black",
      };
    },
    menu: (base: any) => ({
      ...base,
      zIndex: 9999, // Add a high z-index to the dropdown menu
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999, // Ensure the menu portal also has a high z-index
    })
  };
  

  return (
    <div className='w-full'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }: { values: { referralSource: OptionType | null; [key: string]: any }, setFieldValue: any, isSubmitting: boolean }) => (
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
                      <div className='flex items-start'>
                        <input
                          className="py-3 px-4 block text-center w-14 bg-gray-100 border border-gray-200 border-r-transparent rounded-l-lg text-base focus:border-gray-200 focus:border-r-transparent focus:ring-transparent cursor-default focus:outline-none"
                          readOnly
                          placeholder='+1'
                        />
                        <Field
                          name="phone"
                          placeholder="Phone Number"
                          maxLength={10}
                          className="w-full p-3 border rounded-r-lg bg-white focus:outline-none hover:border-purple-800"
                        />
                      </div>
                      
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

                  {/* Referral Source Dropdown */}
                  <div>
                    <Select
                      name="referralSource"
                      options={referralOptions}
                      isClearable
                      isSearchable
                      placeholder="How did you hear about us?"
                      className="basic-single"
                      classNamePrefix="select"
                      onChange={(selected) => setFieldValue('referralSource', selected)}
                      value={values.referralSource}
                      styles={style}
                    />
                    <ErrorMessage name="referralSource" component="div" className="text-red-500 text-sm" />

                    {values.referralSource?.value === 'others' && (
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

                  {/* Interests Multi-Select */}
                  <div className='space-y-2'>
                    <label className='block text-left font-medium'>I'm interested in:</label>
                    <Select
                      name="interest"
                      options={interestOptions}
                      isMulti
                      closeMenuOnSelect={false}
                      placeholder="Select interests..."
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(selected) => setFieldValue('interest', selected)}
                      value={values.interest}
                      styles={style}
                    />
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

      {/* Success Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <button id='dialog' className='hidden'></button>
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className='items-center'>
            <Player
              src="/check.json"
              className='h-32 sm:h-40'
              autoplay
              loop
              speed={1}
            />
            <h4 className='text-lg sm:text-xl font-semibold text-center py-1'>Awesome!</h4>
            <DialogDescription className='text-center'>
              You're now subscribed to our newsletter. You'll receive the latest marketing tips and strategies delivered direct to you.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild className='items-center'>
              <button className='bg-purple-800 hover:bg-purple-900 text-white p-3 rounded-lg hover:bg-accentDark w-full' onClick={onNext}>OK</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Step2;