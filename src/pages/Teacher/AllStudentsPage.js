import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import Scrollbar from 'src/components/scrollbar';
import { FETCH_ALL_STUDENTS } from 'src/config/Apis';
import { useApiHook } from 'src/hooks/apiHook';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

const columns = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'phone',
    label: 'Phone',
    minWidth: 150,
    align: 'center',
  },
];

export const AllStudentsPage = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (val) => setSearch(val);

  const {
    apiCall: apiCallForFetchStudents,
    isLoading: loading,
    data,
  } = useApiHook({
    call: FETCH_ALL_STUDENTS,
    method: 'get',
  });

  useEffect(() => {
    apiCallForFetchStudents();
  }, []);

  if (loading) {
    return <FullLoading />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <div className="mt-0">
        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Grid sx={{ my: 1 }} container spacing={2}>
              <Grid item xs={9} alignItems={'flex-start'}>
                <TextField
                  value={search}
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                  className="max-w-[400px] w-full mb-2"
                  placeholder={'Search by Name'}
                  type="search"
                />
              </Grid>
            </Grid>

            <Table size="small">
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell
                      className="bg-black text-white"
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, width: column.maxWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.length > 0
                  ? data
                      ?.filter((d) => d.Name.toLowerCase().includes(search.toLowerCase()))
                      .map((item, i) => (
                        <>
                          <TableRow key={i} className={i % 2 === 0 ? `bg-white` : `bg-gray-200`}>
                            <TableCell key={i} align={'center'}>
                              {item?.Name}
                            </TableCell>
                            <TableCell key={i} align={'center'}>
                              <p
                                className="text-blue-600 underline cursor-pointer"
                                target="_blank"
                                onClick={() => {
                                  window.open(`mailto:${item.Email}`, '_blank');
                                }}
                              >
                                {item?.Email}
                              </p>
                            </TableCell>
                            <TableCell key={i} align={'center'}>
                              <p
                                className="text-blue-600 underline cursor-pointer"
                                target="_blank"
                                onClick={() => {
                                  window.open(`tel:${item.Phone}`, '_blank');
                                }}
                              >
                                {item?.Phone}
                              </p>
                            </TableCell>
                          </TableRow>
                        </>
                      ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </div>
    </DashboardLayout>
  );
};
