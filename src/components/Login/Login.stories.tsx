import { Login } from './Login';

const meta = {
  title: 'Components/Login',
  component: Login,
  tags: ['autodocs'],
};

export default meta;

export const Default= {
  args: {
    onSubmit: (values) => {
      console.log('Login submitted:', values);
      alert(`Login: ${values.username} / ${values.password}`);
    },
  },
};

export const WithError= {
  args: {
    error: 'Invalid username or password',
    onSubmit: (values) => {
      console.log('Login submitted:', values);
    },
  },
};

export const Loading= {
  args: {
    loading: true,
    onSubmit: (values) => {
      console.log('Login submitted:', values);
    },
  },
};

