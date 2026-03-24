import InputField from '@/components/custom/InputField';
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCourseValidator } from '../validation/courseInformation.validation';
import TextareaField from '@/components/custom/TextareaField';
import SelectField from '@/components/custom/SelectField';
import FileUploadField from '@/components/custom/FileUploadField';
import ChipInputField from '@/components/custom/ChipInputField';
import { Button } from '@/components/ui/button';
import { courseStatus } from '@/data/constants';
import imageCompression from 'browser-image-compression';
import { useCreateCourse, useGetSingleCourse, useUpdateCourse } from '../hooks/useCourse';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setLoading } from '../courseSlice';
import { useGetAllCategory } from '@/features/Category/hooks/useCategory';

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateCourseValidator),
    defaultValues: {
      category: '',
      tag: [],
      instructions: [],
      whatYouWillLearn: [],
      file: null,
    },
  });

  const dispatch = useDispatch();
  const { courseId, isEditCourse, isLoading } = useSelector((state) => state.course);

  const { mutateAsync: CreateCourse } = useCreateCourse();
  const { mutateAsync: UpdateCourse, isPending: isUpdatingCourse } = useUpdateCourse();
  const { data: categories, isPending: categoryLoading } = useGetAllCategory();
  const { data: SingleCourse } = useGetSingleCourse(courseId);

  const isSubmitting = isLoading || isUpdatingCourse;

  const existingThumbnail = isEditCourse ? (SingleCourse?.data?.thumbnail ?? null) : null;

  const categoryOptions = useMemo(() => {
    if (!categories?.data?.category) return [];
    return categories.data.category.map((category) => ({
      label: category.name,
      value: category._id,
    }));
  }, [categories]);

  useEffect(() => {
    if (isEditCourse && SingleCourse?.data) {
      const course = SingleCourse.data;
      reset({
        title: course.title,
        description: course.description,
        price: course.price,
        category: course.category?._id,
        tag: course.tag || [],
        instructions: course.instructions || [],
        whatYouWillLearn: course.whatYouWillLearn || [],
        file: null,
      });
    }
  }, [SingleCourse, isEditCourse, reset]);

  const onSubmit = async (data) => {
    if (!isEditCourse && !data.file) {
      setError('file', { message: 'Please select a thumbnail image' });
      return;
    }

    dispatch(setLoading(true));

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('category', data.category);
      data.tag.forEach((t) => formData.append('tag', t));
      data.instructions.forEach((i) => formData.append('instructions', i));
      data.whatYouWillLearn.forEach((w) => formData.append('whatYouWillLearn', w));

      if (data.file) {
        const compressedFile = await imageCompression(data.file, {
          maxSizeMB: 0.8,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
          fileType: 'image/webp',
        });
        formData.append('file', compressedFile);
      }

      if (isEditCourse) {
        formData.append('courseId', courseId);
        // ✅ Save changes only — does NOT advance step.
        // Step navigation in edit mode uses the "Next" button (type=button) below.
        await UpdateCourse(formData);
      } else {
        formData.append('status', courseStatus.DRAFT);
        // ✅ On success, useCreateCourse hook dispatches nextStep() → moves to Step 2
        await CreateCourse(formData);
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-richBlack-800 p-4 border border-gray-700 rounded space-y-4"
    >
      <InputField
        label="Course Title"
        type="text"
        name="title"
        placeholder="Enter Course Title"
        register={register}
        error={errors.title}
        loading={isSubmitting}
      />

      <TextareaField
        label="Course Description"
        name="description"
        placeholder="Enter Description"
        register={register}
        error={errors.description}
        loading={isSubmitting}
        rows={8}
      />

      <InputField
        label="Price"
        type="number"
        name="price"
        placeholder="Enter Price"
        register={register}
        error={errors.price}
        loading={isSubmitting}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <SelectField
            label="Category"
            placeholder="Choose a Category"
            options={categoryOptions}
            error={errors.category}
            value={field.value}
            onChange={field.onChange}
            loading={categoryLoading}
            disabled={isSubmitting}
          />
        )}
      />

      <Controller
        name="tag"
        control={control}
        render={({ field }) => (
          <ChipInputField
            label="Tags"
            value={field.value}
            onChange={field.onChange}
            placeholder="Enter tag and press Enter"
            max={3}
            error={errors.tag}
          />
        )}
      />

      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <FileUploadField
            label="Course Thumbnail"
            value={field.value}
            onChange={field.onChange}
            error={errors.file}
            existingImage={existingThumbnail}
          />
        )}
      />

      <Controller
        name="instructions"
        control={control}
        render={({ field }) => (
          <ChipInputField
            label="Instructions"
            value={field.value}
            placeholder="Enter instruction and press Enter"
            onChange={field.onChange}
            max={7}
            error={errors.instructions}
          />
        )}
      />

      <Controller
        name="whatYouWillLearn"
        control={control}
        render={({ field }) => (
          <ChipInputField
            label="What You Will Learn"
            value={field.value}
            placeholder="Enter learning outcome and press Enter"
            onChange={field.onChange}
            max={10}
            error={errors.whatYouWillLearn}
          />
        )}
      />

      <div className="flex items-center justify-between pt-2">
        {/* Submit button — always present */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? isEditCourse
              ? 'Saving…'
              : 'Creating…'
            : isEditCourse
              ? 'Save Changes'
              : 'Create Course'}
        </Button>

        {/*
          EDIT mode only: "Next" button
          - type="button" so it never triggers form submit
          - Lets instructor jump to Step 2 without re-saving if nothing changed
          - If they want to save + go next: hit "Save Changes" first, then "Next"
        */}
        {isEditCourse && (
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => dispatch(nextStep())}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        )}
      </div>
    </form>
  );
};

export default CourseInformationForm;
