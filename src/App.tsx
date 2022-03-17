import Navbar from "./components/Navbar/Navbar";
import "./App.css"
import {Route, withRouter} from "react-router-dom";
import News from "./components/Navbar/News/News";
import Settings from "./components/Navbar/Settings/Settings";
import Music from "./components/Navbar/Music/Music";
import React, {ComponentType} from "react";
import DialogsContainer from "./components/Navbar/Dialogs/DialogsContainer";
import UserContainer from "./components/Users/Users-Container";
import ProfileContainer from "./components/Navbar/Profile/ProfileContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {AppStateType} from "./redux/store-redux";
import {initializedApp} from "./redux/app.reducer";
import {compose} from "redux";
import PrimarySearchAppBar from "./Bar";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";


export type AppPropsType = {}

class App extends React.Component<any, any> {
    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) {
            return <div
                style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        }
        return (
            <div className={"app-wrapper"}>
                <div className={'header'}>
                    <PrimarySearchAppBar/>
                </div>
                <div className={'content'}>
                    <div className={'navBar'}>
                        <Navbar/>
                    </div>
                    <div className={"app-wrapper-content"}>
                        <Route path='/profile/:userId?' component={ProfileContainer}/>
                        <Route path='/dialogs' component={DialogsContainer}/>
                        <Route path='/news' component={News}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/users' component={UserContainer}/>
                        <Route path='/login' component={Login}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializedApp}))(App);

