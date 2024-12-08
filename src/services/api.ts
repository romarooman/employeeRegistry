import axios from 'axios';
import { ServerEmployeeListResponse, ServerEmployee } from '../types/ServerTypes';
import { Employee } from '../types/AppTypes';
import { transformServerEmployeeList, transformServerEmployeeToEmployee } from '../utils/transform';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchEmployees = async (page: number, size: number, search: string): Promise<{ total: number; employees: Employee[] }> => {
  const response = await API.get<ServerEmployeeListResponse>('/employees', {
    params: { page, size, search },
  });

  const employees = transformServerEmployeeList(response.data.data);

  return { total: response.data.total, employees };
};

export const fetchEmployee = async (id: number): Promise<Employee> => {
  const response = await API.get<ServerEmployee>(`/employees/${id}`);
  return transformServerEmployeeToEmployee(response.data);
};
