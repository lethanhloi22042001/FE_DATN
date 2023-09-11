import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import CustomScrollbars from "../components/CustomScrollbars";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./Auth/Login";
// import Header from "./Header/Header";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage"

import { CustomToastCloseButton } from "../components/CustomToast";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import Doctor from "../routes/Doctor";


class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          {" "}
          <div className="main-container">
            <div className="content-container">
                <CustomScrollbars style = {{height : '100vh',with :'100%', border: '1px solid red'}} >
                  <Switch>
                    {/* Home là thanh home trên cùng --- HomePage là cả trang */}
                      <Route path={path.HOME} exact component={Home} />
                      <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} /> {/*userIsNotAuthenticated : nó như 1 middle ware => check quyền có được vào Login hay là không*/}
                      <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                      <Route path={'/doctor'} component={userIsAuthenticated(Doctor)} />
                      <Route path={path.HOMEPAGE} exact component={HomePage} />
                      {/* <Route path="/detail-doctor/:id" component={DetailDoctor} /> */}
                      <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                    </Switch>
                  </CustomScrollbars>
            </div>
                {/* Toast là cái hiển thị thông báo như Alert */}
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

 

export default connect(mapStateToProps, mapDispatchToProps)(App);
