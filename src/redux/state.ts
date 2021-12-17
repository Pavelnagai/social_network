import {v1} from "uuid";
import {addPostAC, profileReducer, updatePostTextAC} from "./profile-reducer";
import {dialogReducer, sendMessageCreate, updateMessageTextAC} from "./dialog-reducer";

export type StoreType = {
    _state: RootStateType,
    _rerenderEntireTree: () => void,
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}
export type RootStateType = {
    profilePage: ProfilePagePropsType
    dialogPage: DialogPagePropsType
    sidebarPage: SidebarPagePropsType
}
export type AddPropsType = {
    newPost: (postMessage: string) => void
}
export type DialogPropsType = {
    id: string
    name: string
}
export type PostPropsType = {
    id: string
    message: string
    likeCheck: number
}
export type MessagePropsType = {
    id: string
    message: string
}
export type ProfilePagePropsType = {
    post: Array<PostPropsType>
    newPost: string

}
export type DialogPagePropsType = {
    dialog: Array<DialogPropsType>
    message: Array<MessagePropsType>
    newMessageBody: string
}
export type SidebarPagePropsType = {}
export type ActionsTypes =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof updatePostTextAC> |
    ReturnType<typeof sendMessageCreate> |
    ReturnType<typeof updateMessageTextAC>


let store: StoreType = {
    _state: {
        profilePage: {
            post: [
                {id: v1(), message: "Post 1", likeCheck: 12},
                {id: v1(), message: "Post 2", likeCheck: 18},
                {id: v1(), message: "Post 3", likeCheck: 11},
                {id: v1(), message: "Post 4", likeCheck: 19},
            ],
            newPost: ''
        },
        dialogPage: {
            dialog: [
                {id: v1(), name: "Pavel"},
                {id: v1(), name: "Andrei"},
                {id: v1(), name: "Alina"},
                {id: v1(), name: "Anna"},
                {id: v1(), name: "Make"},
                {id: v1(), name: "David"}
            ],
            message: [
                {id: v1(), message: "Hy"},
                {id: v1(), message: "Hello dad"},
                {id: v1(), message: "Your good friends"},
                {id: v1(), message: "Anna good girl"},
                {id: v1(), message: "Meat year"},
                {id: v1(), message: "David boy"}
            ],
            newMessageBody: ''
        },
        sidebarPage: {},
    },
    _rerenderEntireTree() {
        console.log('state changed')
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer
    },
    getState() {
        return this._state
    },
    dispatch(action: any) {
        profileReducer(this._state.profilePage, action)
        dialogReducer(this._state.dialogPage, action)
        // sidebarReducer(this._state.sidebarPage, action)
        this._rerenderEntireTree()
    }
}


export default store

// export const addPostAC = () => {
//     return {
//         type: ADD_POST
//     } as const
// };
// export const updatePostTextAC = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     return {
//         type: UPDATE_POST_TEXT,
//         newText: e.currentTarget.value
//     } as const
// };
// export const sendMessageCreate = () => {
//     return {
//         type: SEND_MESSAGE,
//     } as const
// };
// export const updateMessageTextAC = (body: string) => {
//     return {
//         type: NEW_MESSAGE_BODY,
//         body: body
//     } as const
// };