import React, { Component, Fragment } from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
// import FeedPage from './posts/FeedPage'
// import DraftsPage from './posts/DraftsPage'
// import CreatePage from './posts/CreatePage'
// import DetailPage from './posts/DetailPage'
import LoginPage from './users/LoginPage'
import SignupPage from './users/SignupPage'
import PageNotFound from './PageNotFound'
import LogoutPage from './users/LogoutPage'
import { AUTH_TOKEN } from '../constant'
import { isTokenExpired } from '../helper/jwtHelper'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

import GlobalEvent from './events/GlobalEvent'
import CourseEvent from './events/CourseEvent'
import EventList from './events/EventList'
import SingleEvent from './events/SingleEvent'
// import UpdateEvent from "./events/UpdateEvent";

import TemplateSelect from './courses/TemplateSelect'
import Courses from './courses/Courses'
import CourseDetails from "./courses/CourseDetails";
// import LimitedCourse from './courses/LimitedCourse'

import TemplateList from './templates/TemplateList'
import CreateTemplate from './templates/CreateTemplate'
import TemplateDetail from './templates/TemplateDetail'
import UpdateEvent from "./events/UpdateEvent";


const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return token ? (
    <Route {...rest} render={matchProps => <Component {...matchProps} />} />
  ) : (
    <Redirect to="/login" />
  )
}

class RootContainer extends Component {
  constructor(props) {
    super(props)
    this.refreshTokenFn = this.refreshTokenFn.bind(this)

    this.state = {
      token: props.token,
    }
  }

  // dont touch below here
  refreshTokenFn(data = {}) {
    const token = data.AUTH_TOKEN

    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
    } else {
      localStorage.removeItem(AUTH_TOKEN)
    }

    this.setState({
      token: data.AUTH_TOKEN,
    })
  }

  bootStrapData() {
    try {
      const token = localStorage.getItem(AUTH_TOKEN)
      if (token !== null && token !== undefined) {
        const expired = isTokenExpired(token)
        if (!expired) {
          this.setState({ token: token })
        } else {
          localStorage.removeItem(AUTH_TOKEN)
          this.setState({ token: null })
        }
      }
    } catch (e) {
      console.log('')
    }
  }
// dont touch above here
  //verify localStorage check
  componentDidMount() {
    this.bootStrapData()
  }

  render() {
    return (
      <Router>
        <Fragment>
          {this.renderNavBar()}
          {this.renderRoute()}
        </Fragment>
      </Router>
    )
  }

  renderNavBar() {
    return (
      <nav className="pa3 pa4-ns">
        <Link className="link dim black b f6 f5-ns dib mr3" to="/" title="Feed">
          <h1 class="course">Welcome to the Helio Training Calendar</h1>
        </Link><br/>
        {/*<NavLink*/}
        {/*className="link dim f6 f5-ns dib mr3 black"*/}
        {/*activeClassName="gray"*/}
        {/*exact={true}*/}
        {/*to="/"*/}
        {/*title="Feed">Feed</NavLink>*/}

        {/*{this.props.data &&*/}
        {/*// this.props.data.me &&*/}
        {/*// this.props.data.me.email &&*/}
        {/*this.state.token && (*/}
        {/*<NavLink*/}
        {/*className="link dim f6 f5-ns dib mr3 black"*/}
        {/*activeClassName="gray"*/}
        {/*exact={true}*/}
        {/*to="/drafts"*/}
        {/*title="Drafts">Drafts</NavLink>*/}
        {/*)}*/}

        {this.props.data &&
        // this.props.data.me &&
        // this.props.data.me.email &&
        this.state.token && (
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact={true}
            to="/courses"
            title="Courses"
          >
            Courses
          </NavLink>
        )}

        {this.props.data &&
        // this.props.data.me &&
        // this.props.data.me.email &&
        this.state.token && (
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact={true}
            to="/events"
            title="Events"
          >
            Events
          </NavLink>
        )}

        {this.props.data &&
        // this.props.data.me &&
        // this.props.data.me.email &&
        this.state.token && (
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact={true}
            to="/templates"
            title="Templates"
          >
            Templates
          </NavLink>
        )}

        {this.state.token ? (
          <div
            onClick={() => {
              this.refreshTokenFn &&
              this.refreshTokenFn({
                [AUTH_TOKEN]: null,
              })
              window.location.href = '/'
            }}
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black">Logout</div>
        ) : (
          <Link
            to="/login"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black">Login</Link>
        )}

        {this.props.data &&
        // this.props.data.me &&
        // this.props.data.me.email &&
        this.state.token && (
          <Link
            to="/globalEvent"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black">+ Create Global Event</Link>
        )}

        {this.props.data &&
        // this.props.data.me &&
        // this.props.data.me.email &&
        this.state.token && (
          <Link
            to="/courseEvent"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black">+ Create Course Event</Link>
        )}

        {this.props.data &&
        // this.props.data.me &&
        // this.props.data.me.email &&
        this.state.token && (
          <Link
            to="/createTemplate"
            className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black">+ Create a Template</Link>
        )}
        {/*{this.props.data &&*/}
        {/*// this.props.data.me &&*/}
        {/*// this.props.data.me.email &&*/}
        {/*this.state.token && (*/}
        {/*<Link*/}
        {/*to="/createCourse"*/}
        {/*className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black">+ Create Course</Link>*/}
        {/*)}*/}
      </nav>
    )
  }

  renderRoute() {
    return (
      <div className="fl w-100 pl4 pr4">
        <Switch>
          <Route exact path="/" component={Courses} />
          <ProtectedRoute
            token={this.state.token}
            path="/globalEvent"
            component={GlobalEvent}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/courseEvent"
            component={CourseEvent}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/updateEvent"
            component={UpdateEvent}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/courses"
            component={Courses}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/events"
            component={EventList}
          />
          {/*<ProtectedRoute*/}
          {/*token={this.state.token}*/}
          {/*path="/drafts"*/}
          {/*component={DraftsPage}*/}
          {/*/>*/}
          <ProtectedRoute
            token={this.state.token}
            path="/createCourse"
            component={TemplateSelect}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/createTemplate"
            component={CreateTemplate}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/templates"
            component={TemplateList}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/updateTemplate"
            component={CreateTemplate}
          />
          {/*<Route path="/post/:id" component={DetailPage} />*/}
          <Route path="/event/:id" component={SingleEvent} />
          <Route path="/course/:id" component={CourseDetails} />
          <Route path="/template/:id" component={TemplateDetail} />
          <Route
            token={this.state.token}
            path="/login"
            render={props => <LoginPage refreshTokenFn={this.refreshTokenFn} />}
          />
          <Route
            token={this.state.token}
            path="/signup"
            render={props => (
              <SignupPage refreshTokenFn={this.refreshTokenFn} />
            )}
          />
          <Route path="/logout" component={LogoutPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}


const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      name
    }
  }
`

export default graphql(ME_QUERY, {
  options: {
    errorPolicy: 'all',
  },
})(RootContainer)
