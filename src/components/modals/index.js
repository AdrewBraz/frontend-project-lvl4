// @ts-check
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';
import AllChats from './AllChats'
import Profile from './Profile'

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
  subscribing: AllChats,
  updating: Profile
};

export default (modalName) => modals[modalName];
