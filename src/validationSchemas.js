import * as Yup from 'yup';

const channelSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(25, 'Too Long!')
    .required(),
});

const messageSchema = Yup.object().shape({
  message: Yup.string().test('required-if-file-empty', 'Message is required when file is empty', function(value) {
    const { file } = this.parent;
    return !file || file.length === 0 ? !!value : true;
  }),
  file: Yup.mixed()
});


const fileSchema = Yup.object().shape({
  file: Yup.mixed().required("Required"),
});

const userSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'UserName is too short!')
    .max(25, 'UserName is too Long!')
    .required(),
  password: Yup.string()
  .min(4, 'Your password should have more than 4 symblols!')
  .required(),
});

export { messageSchema, channelSchema, userSchema, fileSchema };
