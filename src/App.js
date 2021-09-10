import 'antd/dist/antd.css';
import CustomLayout from './containers/layout';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
function App(props) {
  props.onTryAutoSignup();
  return (
    <div>
      <Router>
          <CustomLayout {...props}>
            <BaseRouter />
          </CustomLayout>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
