interface Classes {
    id: number,
    name: string,
    DepartmentID: number,
    Department: Department,
    createdAt: string
}

interface Department {
    id: number,
    name: string
}

interface AddClassApi {
    name: string;
    departmentName: string;
  }

export type {Classes, AddClassApi}
