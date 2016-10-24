import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App'
import HomeLayout from './containers/HomeLayout'
import HomeListPage from './containers/HomeList'
import HomeGuidePage from './containers/HomeGuidePage'
import HomeServerStatusPage from './containers/HomeStatus'
import EventsPage from './containers/Events'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route component={HomeLayout}>
        <IndexRoute component={HomeListPage} />
        <Route path="guide/:guideName" component={HomeGuidePage} />
        <Route path="server" component={HomeServerStatusPage} />
      </Route>
      <Route path="/events" component={EventsPage} />
    </Route>
  </Router>
)
