import CircularProgress from "@mui/material/CircularProgress";
import type { GridColDef } from "@mui/x-data-grid/models";
import { useEffect, useState } from "react";
import { fetchUsers } from "../api/usersApi";
import type { User } from "../types/usersTypes";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import {
  DataGridContainer,
  DataGridHeading,
  StatusBox,
} from "../styled/pages/DataGridPage.styled";

export default function DataGridPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "website", headerName: "Website", width: 130 },
    {
      field: "city",
      headerName: "City",
      width: 130,
      valueGetter: (_value, row) => row.address.city || "",
    },
    {
      field: "company",
      headerName: "Company",
      width: 130,
      valueGetter: (_value, row) => row.company.name || "",
    },
  ];

  if (loading || error) {
    return (
      <StatusBox>
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography color="error">{error}</Typography>
        )}
      </StatusBox>
    );
  }

  return (
    <DataGridContainer>
      <DataGridHeading variant="h4">Users List</DataGridHeading>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </DataGridContainer>
  );
}
