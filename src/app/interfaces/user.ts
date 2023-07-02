export interface userRequest {
    type: number;
    params: {
        first_name: string;
        last_name: string;
        role_id: number;
        password: string
    }
}

export interface userUpdateRequest {
    type: number;
    params: {
        user: string;
        first_name: string;
        last_name: string;
        role_id: number
    }
}

export interface updatePasswordRequest {
    type: number;
    params: {
        user: string;
        password: string
    }
}

export interface userDeleteRequest {
    type: number;
    params: {
       user: string;
       status: number
    }
}

export interface userListRequest {
    type: number
}