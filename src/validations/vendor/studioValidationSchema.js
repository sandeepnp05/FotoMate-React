import * as Yup from 'yup';

export const studioSchema = Yup.object().shape({
  studioName: Yup.string().required('Name is required'),
  location: Yup.string().required('City is required'),
  coverImage: Yup.mixed().required('Cover Image is required'),
  galleryImages: Yup.mixed().required('Gallery Images are required'),
  description: Yup.string().max(200, 'Description must be at most 200 characters'),
});
