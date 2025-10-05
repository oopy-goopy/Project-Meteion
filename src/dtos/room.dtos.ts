export interface createRoom {
    room: string,
    username: string
}

export interface getMessage {
    user: string,
    text: string
}

export interface getMessages {
    messages: getMessage[]
}