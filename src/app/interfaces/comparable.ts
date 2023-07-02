export interface createComparableRequest {
   type: number;
   params: {
      name: string;
      image: string;
      body: 
         {
         name: string;
         value: string;
         }
      
   }
}

export interface searchComparableRequest {
   type: number;
   params: {
     name: string
   }
}

export interface deleteComparableRequest {
   type: number;
   params: {
      comparable_id: number,
      status:number   
   }
}

export interface updateComparableRequest{
   type: number;
   params: {
      name: string;
      image: string;
      comparable_id:number;
      body: 
         {
         name: string;
         value: string;
         }
   }
}