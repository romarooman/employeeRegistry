import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees } from "../services/api";
import { Employee } from "../types/AppTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Pagination,
} from "@mui/material";

const HomePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees(page, 10, search).then((res) => {
      setEmployees(res.employees);
      setTotalPages(Math.ceil(res.total / 10));
    });
  }, [page, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleRowClick = (id: number) => {
    navigate(`/employees/${id}`);
  };

  return (
    <div>
      <h1>Реестр сотрудников</h1>
      <TextField
        label="Поиск по имени"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: "1rem" }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Полное имя</TableCell>
            <TableCell>Отдел</TableCell>
            <TableCell>Должность</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              onClick={() => handleRowClick(employee.id)}
              style={{ cursor: "pointer" }}
            >
              <TableCell>{`${employee.lastName} ${employee.firstName} ${
                employee.middleName ?? ""
              }`}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.post}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default HomePage;
