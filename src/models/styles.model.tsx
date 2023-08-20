export interface Style {
    id: number;
    name: string;
    createdAt: string;
  }
  
  export interface AddStyleApi {
    name: string;
    departmentId?: number;
    audienceId?: number;
  }
  
  export default {};
  