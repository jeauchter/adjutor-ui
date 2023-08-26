export interface Style {
    id: number;
    name: string;
    DepartmentID: number,
    Department: Department,
    createdAt: string;
  }
  
  interface Department {
    id: number,
    name: string
  }

  export interface AddStyleApi {
    name: string;
    departmentId?: number;
    audienceId?: number;
  }
  
  export default {};
  