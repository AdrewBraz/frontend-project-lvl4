import * as Yup from 'yup';

const channelSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(25, 'Too Long!')
    .required(),
});

const messageSchema = Yup.object().shape({
  message: Yup.string()
    .max(500, 'Too Long!')
    .required(),
});

export { messageSchema, channelSchema };
