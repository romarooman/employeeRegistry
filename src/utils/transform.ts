import { ServerEmployee } from "../types/ServerTypes";
import { Employee } from "../types/AppTypes";

export const transformServerEmployeeToEmployee = (
    data: ServerEmployee
  ): Employee => {
    const placeholderPhoto = ""; 
  
    return {
      id: data.id,
      firstName: data.firstName,  
      lastName: data.lastName,   
      fullName: `${data.lastName} ${data.firstName} ${data.middleName}`, 
      birthDate: new Date(data.birthDate).toISOString(),
      department: data.department,
      post: data.post,
      photo: data.photo
        ? `data:image/jpeg;base64,${data.photo}`
        : placeholderPhoto,
    };
  };

export const transformServerEmployeeList = (
  data: ServerEmployee[]
): Employee[] => {
  return data.map(transformServerEmployeeToEmployee);
};
