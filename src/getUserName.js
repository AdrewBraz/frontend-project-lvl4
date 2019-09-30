import { name } from 'faker';
import Cookies from 'js-cookie';

export default () => {
  const currentName = Cookies.get('name');
  if (currentName) {
    return currentName;
  }
  const userName = name.findName();
  Cookies.set('name', userName);
  return userName;
};
