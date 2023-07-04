export interface createAnalysis {
   type: number;
   params: {
      name: string;
      column: [{
         col_name: string,
         col_value: string
      }],
      body: {
         analysis_1: [{
            var_name: string,
            var_value: string,
            body: []
         }],
         analysis_2: [{
            var_name: string,
            var_value: string,
            body: []
         }]
      }
   }
}

export interface IColumn {
   col_name: string;
   col_value: string;
 }
 
 export interface IAnalysis {
   var_name: string;
   var_value: string;
   body: string[];
 }

export interface ICreateAnalysis {
   type: number;
   params: {
     name: string;
     column: IColumn[];
   };
   body: {
     analysis_1: IAnalysis[];
     analysis_2: IAnalysis[];
   };
 }
 
