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

interface Column {
   col_name: string;
   col_value: string;
 }
 
 interface Analysis {
   var_name: string;
   var_value: string;
   body: string[];
 }

export interface ICreateAnalysis {
   type: number;
   params: {
     name: string;
     column: Column[];
   };
   body: {
     analysis_1: Analysis[];
     analysis_2: Analysis[];
   };
 }
 
