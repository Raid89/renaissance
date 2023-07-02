export interface pdfRequest {
   type: number;
   params:{
    html_code:string;
    template_name: string;
    tab_id:number;
   }
}