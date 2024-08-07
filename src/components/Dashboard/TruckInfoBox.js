import { Divider, Grid } from '@mui/material';
import React from 'react';
import truck from '../../assets/images/truck.png';

export const TruckInfoBox = ({ truckNumber, driver, accountName, helperName, className, onlyTruck }) => {
  if (onlyTruck) {
    return (
      <div
        style={{ boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.05)' }}
        className={`rounded-lg bg-white p-4 border ${className}`}
      >
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={6}>
            <div>
              <p className="text-[#B0B0B0] text-[14px] font-bold">Truck Number</p>
              <p className="text-black text-[18px]">{truckNumber}</p>
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={5}>
            <img src={truck} alt={'truck'} />
          </Grid>
        </Grid>
      </div>
    );
  }
  return (
    <div
      style={{ boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.05)' }}
      className={`rounded-lg bg-white p-4 border ${className}`}
    >
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6} md={6}>
          <div>
            <p className="text-[#B0B0B0] text-[14px] font-bold">Truck Number</p>
            <p className="text-black text-[18px]">{truckNumber}</p>
          </div>
          <div className="mt-1">
            <p className="text-[#B0B0B0] text-[14px] font-bold">Truck Driver</p>
            <p className="text-black text-[18px]">{driver}</p>
          </div>
        </Grid>
        <Grid item xs={6} sm={6} md={5}>
          <img src={truck} alt={'truck'} />
        </Grid>
      </Grid>
      <Divider className="my-2" />
      <div>
        <p className="text-[#B0B0B0] text-[14px] font-bold">Account Name</p>
        <p className="text-black text-[18px]">{accountName}</p>
      </div>
      {helperName && (
        <div>
          <p className="text-[#B0B0B0] text-[14px] font-bold">Offsider Name</p>
          <p className="text-black text-[18px]">{helperName}</p>
        </div>
      )}
    </div>
  );
};
