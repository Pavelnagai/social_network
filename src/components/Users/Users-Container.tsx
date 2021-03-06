import React, {ComponentType} from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store-redux";
import {
    follow,
    getUser,
    InitialStateUsersType,
    setCurrentPage,
    setFollowingProgress,
    unFollow
} from "../../redux/users-reducer";
import Users from "./Users";
import {withAuthRedirect} from "../common/hoc/WithAuthRedirect";
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUserCount,
    getUsers
} from '../../redux/users-selectors';
import {LinearProgress} from "@mui/material";


class UsersContainer extends React.PureComponent<UsersPropsType, any> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUser(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUser(pageNumber, pageSize)

    }

    render() {
        return <>
            {this.props.userPage.isFetching
                ? <LinearProgress/>
                : null}
            <Users
                users={this.props.userPage.users}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                pageSize={this.props.pageSize}
                totalUserCount={this.props.totalUserCount}
                setFollowingProgress={this.props.setFollowingProgress}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

type MapStateType = {
    userPage: InitialStateUsersType
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: string[]
}
type MapDispatchType = {
    follow: (userID: string) => void,
    unFollow: (userID: string) => void,
    setCurrentPage: (pageNumber: number) => void
    setFollowingProgress: (isFetching: boolean, id: string) => void
    getUser: any

}
export type UsersPropsType = MapStateType & MapDispatchType
let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        userPage: getUsers(state),
        pageSize: getPageSize(state),
        totalUserCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }

}

export default compose<ComponentType>(
    connect(mapStateToProps, {
        follow,
        unFollow,
        setCurrentPage,
        setFollowingProgress,
        getUser,
    }),
    withAuthRedirect
)(UsersContainer)