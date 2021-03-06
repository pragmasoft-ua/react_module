import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from "react-redux";

import { setToken } from "./actions/actionAuth";
import {jwtDecode} from "./_utils/checkExp";

import 'moment/locale/ru';

import PrivateRoute from "./privateRouter";

import HallPage from './containers/hallPage/HallPage.js'
import BuyTickets from './containers/BuyTickets.js'

import DetailsMoviePageContainer from './containers/detailsMoviePageContainer';
import MovieContainer from './containers/movieContainer';
import TrailerPage from './components/trailerPage';
import AuthUser from './containers/AuthUser';
import Soon from './containers/soonContainer';
import Header from './components/Header';
import PersonalContainer from './containers/PersonalContainer';

import AdminPanel from './containers/AdminPanel'
import AdminAuth from './containers/AdminAuth'

class Router extends Component {

	componentDidMount() {
		const token = localStorage.getItem("token");

		if ( token && jwtDecode(token) ) {
			const { setToken } = this.props;
			// console.log(' --- token ----', token);
			return setToken(token);
		}
	}

	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={MovieContainer} />
					<Route exact path="/movie/:id" component={DetailsMoviePageContainer}/>
					<Route exact path="/trailer/:url" component={TrailerPage} />
					<Route exact path="/auth" component={AuthUser} />
					<Route exact path="/soon" component={ Soon } />
					<Route exact path="/hall" component={HallPage} />
					<Route exact path="/buy" component={BuyTickets} />

                    <Route path="/admin-panel/auth" component={AdminAuth} />
					<PrivateRoute path="/admin-panel" auth={'/admin-panel/auth'} component={AdminPanel} />

					<PrivateRoute path="/personal/:id" auth={'/auth'} component={PersonalContainer} />
					{/*<Route path="/personal/:id" component={PersonalContainer} />*/}

					<Route
						render={() => (
							<React.Fragment>
								<Header />
								<div className="notFound">404 NOT FOUND</div>
							</React.Fragment>
						)}
					/>
				</Switch>
			</React.Fragment>
		)
	}
}

// const mapDispatchToProps = dispatch => bindActionCreators({ setToken }, dispatch);
Router = connect( null, { setToken })(Router);

export default Router
