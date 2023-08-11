#! /usr/bin/env node

import getApp from '../index.js';

const port = process.env.PORT || 4000;
<<<<<<< HEAD
=======
console.log(port);
>>>>>>> 86caba5ac9091de35cbefb50a47d7731e772f3c9
const app = getApp();
app.listen(port, '127.0.0.1', () => {
  console.log(`Server has been started on ${port}`);
});
