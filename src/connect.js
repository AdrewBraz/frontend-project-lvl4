// @ts-check

import { connect } from 'react-redux';
import * as actions from './actions';

const mapDispatch = { ...actions };
export default mapStateToProps => Component => connect(mapStateToProps, mapDispatch)(Component);
