import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  LOGIN, REGISTER, FORGOT_PASSWORD, DASHBOARD, RESET_PASSWORD, VERIFY_TOKEN,
  ADD_BOOKING, LIST_BOOKINGS, LIST_CONTACTS, ADD_CONTACT, VIEW_CONTACT, EDIT_CONTACT,
  ADD_LEAD, LIST_LEADS, VIEW_LEAD, EDIT_LEAD, LIST_CLOSE_LEADS, CUSTOMIZE_STAGE,
  VIEW_BOOKING, EDIT_BOOKING, VIEW_PROFILE, LIST_INVOICES, LIST_QUOTES, ADD_QUOTE,
  VIEW_QUOTE, SENT_QUOTE, QUOTE_CUSTOMER_VIEW, VIEW_QUOTE_DETAIL, LIST_ACCEPTED_QUOTE,
  ACCEPT_QUOTE, ADD_BASIC_QUOTE, CONNECT_WITH_PAYPAL, ADD_BASIC_INVOICE, ADD_INVOICE,
  VIEW_INVOICE, SENT_INVOICE, INVOICE_CUSTOMER_VIEW, VIEW_INVOICE_DETAIL, LIST_PAID_INVOICE,
  ACCEPT_INVOICE, CALENDER_VIEW, EMAIL_AUTH, EMAIL_LIST, EMAIL_VIEW, COMPOSE_EMAIL, REPLY_TO_EMAIL, EMAIL_EDIT_DRAFT, EMAIL_DRAFT_VIEW,
} from './routeContants';
import { Login } from '../view/screen/frontend/auth/login';
import { Register } from '../view/screen/frontend/auth/register';
import { ForgotPassword } from '../view/screen/frontend/auth/forgotPassword';
import { Dashboard } from '../view/screen/frontend/dashboard/dashboard';
import { ResetPassword } from '../view/screen/frontend/auth/resetPassword';
import { VerifyToken } from '../view/screen/frontend/auth/verifyToken';
import { isLoggedIn } from './authService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: LOGIN,
            state: { from: props.location },
          }}
          />
        )
    )}
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !isLoggedIn() || isLoggedIn() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: DASHBOARD,
            state: { from: props.location },
          }}
          />
        )
    )}
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !isLoggedIn() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: DASHBOARD,
            state: { from: props.location },
          }}
          />
        )
    )}
  />
);

class AllRoutes extends React.Component {
  render() {
    return <Switch>
      <LoginRoute exact key="login" path={LOGIN} component={Login} />
      <PublicRoute exact path={REGISTER} component={Register} />
      <PublicRoute exact path={FORGOT_PASSWORD} component={ForgotPassword} />
      <PublicRoute exact path={RESET_PASSWORD} component={ResetPassword} />
      <PublicRoute exact path={VERIFY_TOKEN} component={VerifyToken} />
      <PrivateRoute exact key="dashboard" path={DASHBOARD} component={Dashboard} />
      <Redirect from="/*" to={LOGIN} />
    </Switch>
  }
}

export default AllRoutes;