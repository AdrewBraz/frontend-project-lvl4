// @ts-check
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';
import AllChats from './AllChats'

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
  subscribing: AllChats
};

export default (modalName) => modals[modalName];
