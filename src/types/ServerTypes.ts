export interface ServerEmployee {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    birthDate: string; 
    department: string;
    post: string;
    photo?: string; 
  }
  
  export interface ServerEmployeeListResponse {
    total: number;
    data: ServerEmployee[];
  }
  