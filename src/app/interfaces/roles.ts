export interface rolesRequest {
    type: number;
    params: {
        name: string;        
        permissions: number[]
    }
}

export interface rolesUpdateRequest {
    type: number;
    params: {
        role_id: number;
        name: string;
        permissions: number[];
        status: number
    }
}

export interface rolesDeleteRequest {
    type: number;
    params: {
       role_id: number;
       status: number
    }
}

export interface rolesListRequest {
    type: number
}

export interface permissionsListRequest {
    type: number
}