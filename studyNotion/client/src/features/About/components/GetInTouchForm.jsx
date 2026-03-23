import InputField from '@/components/custom/InputField';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CountryData from '@/data/countrycode';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GetInTouchFormSchema } from '../validation/GetInTouch.validation';
import { useGetInTouch } from '@/features/Auth/hooks/useAuth';

const underlineInputStyle =
  'bg-richBlack-800 border-b-2 border-richBlack-600 border-x-0 border-t-0   outline-none';

const GetInTouchForm = ({ heading, para }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(GetInTouchFormSchema),
    defaultValues: {
      countryCode: '+91',
    },
  });

  const { mutateAsync: getInTouch, isPending } = useGetInTouch();

  const onSubmit = async (data) => {
    await getInTouch(data);
    reset();
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-14 ">
      {/* Heading */}
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">{heading}</h2>
        <p className="text-richBlack-200 text-sm">{para}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First + Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            register={register}
            error={errors.firstName}
            loading={isPending}
          />

          <InputField
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            register={register}
            error={errors.lastName}
            loading={isPending}
          />
        </div>

        {/* Email */}
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter email address"
          register={register}
          error={errors.email}
          loading={isPending}
        />

        {/* Phone Number */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-richBlack-100">Phone Number</label>

          <div className="flex gap-3">
            <Controller
              name="countryCode"
              control={control}
              render={({ field }) => (
                <Select disabled={isPending} onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={`w-fit ${underlineInputStyle}`}>
                    <SelectValue placeholder="+91" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {CountryData.map(({ country, code }) => (
                        <SelectItem key={`${code}-${country}`} value={code}>
                          {code} ({country})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            <Input
              type="tel"
              {...register('contactNumber')}
              placeholder="12345 67890"
              className={`w-full ${underlineInputStyle}`}
              disabled={isPending}
            />
          </div>

          {errors.contactNumber && (
            <span className="text-red-400 text-xs">{errors.contactNumber.message}</span>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-richBlack-100">Message</label>
          <Textarea
            {...register('message')}
            rows={12}
            placeholder="Enter your message"
            className={`w-full ${underlineInputStyle} resize-none pt-2 h-30`}
            disabled={isPending}
          />

          {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-yellow-400 text-black font-medium py-3 rounded-md hover:bg-yellow-300 transition"
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default GetInTouchForm;
