import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TruckInfoBox } from './TruckInfoBox';
import { useState } from 'react';

export const RunningTrucks = () => {
  const socket = useSelector((state) => state.socket.connection);
  const activeTrucksList = useSelector((state) => state.trucks.activeTrucksList);
  const inActiveTrucksList = useSelector((state) => state.trucks.inActiveTrucksList);
  const [activeSearch, setActiveSearch] = useState('');
  const [inActiveSearch, setInActiveSearch] = useState('');

  useEffect(() => {
    if (socket) {
      socket?.send('OnCallActiveTrucks', 'test');
      socket?.send('OnCallInactiveTrucks', 'test');
    }
  }, [socket]);

  return (
    <div className="w-full">
      <Grid sx={{ my: 1 }} container spacing={3}>
        {/* ACtive Trucks */}
        <Grid item xs={12} sm={6} md={5}>
          <Typography sx={{ mb: 0 }} variant="h6">
            Ongoing Deliveries
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            value={activeSearch}
            onChange={(e) => setActiveSearch(e.target.value)}
            className="my-3 w-full"
            InputLabelProps={{ shrink: true }}
            placeholder="search by truck, driver, account, helper"
          />
          <div className="mt-2">
            {activeTrucksList?.length > 0 ? (
              <div>
                {activeTrucksList
                  .filter(
                    (item) =>
                      item.truck?.truckNumber?.toLowerCase()?.includes(activeSearch?.toLowerCase()) ||
                      item?.user?.name?.toLowerCase().includes(activeSearch?.toLowerCase()) ||
                      item?.accounts?.name?.toLowerCase().includes(activeSearch?.toLowerCase()) ||
                      item?.helperName?.toLowerCase().includes(activeSearch?.toLowerCase())
                  )
                  ?.map((item, i) => (
                    <TruckInfoBox
                      key={i}
                      truckNumber={item?.truck?.truckNumber}
                      driver={item?.user?.name}
                      accountName={item?.accounts?.name}
                      helperName={item?.helperName}
                      className={'mt-3'}
                    />
                  ))}
              </div>
            ) : (
              <p>There are no ongoing deliveries</p>
            )}
          </div>
        </Grid>
        {/* Idle grid */}
        <Grid xs={0} md={2} sm={0} />
        {/* All Truks */}
        <Grid item xs={12} sm={6} md={5}>
          <Typography sx={{ mb: 0 }} variant="h6">
            Inactive Trucks
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            value={inActiveSearch}
            onChange={(e) => setInActiveSearch(e.target.value)}
            className="my-3 w-full"
            InputLabelProps={{ shrink: true }}
            placeholder="search by truck"
          />
          <div className="mt-2">
            {inActiveTrucksList?.length > 0 ? (
              <div>
                {inActiveTrucksList
                  ?.filter((item) => item?.truckNumber?.toLowerCase()?.includes(inActiveSearch?.toLowerCase()))
                  ?.map((item, i) => (
                    <TruckInfoBox className={'mt-3'} onlyTruck key={i} truckNumber={item?.truckNumber} />
                  ))}
              </div>
            ) : (
              <p>No Inactive trucks</p>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
