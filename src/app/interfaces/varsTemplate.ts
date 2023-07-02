export interface varsRequest {
   type: number;
   params: {
      name: string;
      default_value: string;
      type_id: number;
   }
}

export interface varsListRequest {
   type: number;
}

export interface varsUpdateRequest {
   type: number;
   params: {      
      name: string;
      default_value: string;
      type_id: number;
      var_type_id: number;
   }
}

export interface varsDeleteRequest {
   type: number;
   params: {
      var_type_id: number;
      status: number;
   }
}


export interface varsTypesRequest{
   type: number;
}
