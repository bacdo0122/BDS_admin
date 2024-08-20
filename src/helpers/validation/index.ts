import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid email').required('Email is a required field'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is a required field'),
});

export const CreateFilmSchema = yup.object().shape({
  userId: yup.number().required('userId is a required field'),
  // bdsId: yup.number().required('bdsId is a required field'),
  price: yup.number().required('price is a required field'),
  // status: yup.string().required('status is a required field'),
  // actor:yup.object().required('Actor is a required field'),
  // category:yup.object().required('Category is a required field')
});


export const createActorSchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
  description: yup.string().required('Description is a required field')
})

export const createCategorySchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
 
})

export const createUserSchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
  email: yup.string().email('Email must be a valid email').required('Email is a required field'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is a required field'),
})

export const createBannerSchema = yup.object().shape({
  // name: yup.string().required('name is a required field'),
 
})
