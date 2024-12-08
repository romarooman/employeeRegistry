import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEmployee } from '../services/api';
import { Employee } from '../types/AppTypes';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

const EmployeePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (id) {
      fetchEmployee(Number(id)).then(setEmployee);
    }
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Avatar
            src={employee.photo ? `${employee.photo}` : undefined}
            alt="Employee Photo"
            style={{ width: 100, height: 100, marginRight: '1rem' }}
          >
            {!employee.photo && 'без фото'}
          </Avatar>
          <div>
            <Typography variant="h5">{`${employee.lastName} ${employee.firstName} ${employee.middleName ?? ''}`}</Typography>
            <Typography variant="subtitle1">{employee.department}</Typography>
            <Typography variant="subtitle2">{employee.post}</Typography>
          </div>
        </div>
        <Typography variant="body1">
          <strong>Дата рождения:</strong> {new Date(employee.birthDate).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmployeePage;
