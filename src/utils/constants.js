import { useSelector } from 'react-redux';

export const ownerPassword = 'owner@mae';
export const adminPassword = 'admin@mae';
export const driverPassword = 'driver@mae';
export const imageSize = 5242880;
export const shiftFormat = 'YYYY-MM-DD h:mm a';
export const timeFormat = 'h:mm a';
export const dateFormat = 'YYYY-MM-DD';
export const licenseClass = ['LR', 'MR', 'HR', 'HC', 'CAR/MOTOR BIKE'];
export const LoadingShiftTypes = ['Container Work', 'Labour Work'];
export const invoiceStatus = ['Pending', 'Paid'];
export const expenseCardList = [{ name: 'Company card' }, { name: 'Private card' }];
export const imageUploadBlobStorageUrl = 'https://maeserver.azurewebsites.net/api/ImageUpload/uploadImage';
export const taskType = ['Labour Hire', 'Truck', 'Van', 'Container Work', 'Service Reminder', 'Other'];
export const taskTypeClient = [
  { name: 'Labour Hire', value: 'Labour Hire' },
  { name: 'Truck Hire', value: 'Truck' },
  { name: 'Van Hire', value: 'Van' },
  { name: 'Container crew ', value: 'Container Work' },
  { name: 'Other', value: 'Other' },
];
export const toolsRadioGroup = ['Yes', 'Needs Replacement'];
export const toolsRadioGroupTrolley = ['Yes', 'N/A', 'Needs Replacement'];
export const radioGroups = [
  { name: 'allenKeys', label: 'Allen Keys' },
  { name: 'blankets', label: 'Blankets' },
  { name: 'dollie', label: 'Dollie' },
  { name: 'drillBatteryCharger', label: 'Drill Battery & Charger' },
  { name: 'drillBits', label: 'Drill Bits' },
  { name: 'holesawSet', label: 'Holesaw Set' },
  { name: 'knives', label: 'Knives' },
  { name: 'mallet', label: 'Mallet' },
  { name: 'multiGrips', label: 'Multi Grips' },
  { name: 'ratchetSet', label: 'Ratchet Set' },
  { name: 'screwdrivers', label: 'Screwdrivers (Flat & Crossed)' },
  { name: 'shifter', label: 'Shifter' },
  { name: 'straps', label: 'Straps & Ratchets' },
  { name: 'tape', label: 'Tape' },
  { name: 'tapeMeasure', label: 'Tape Measure' },
];

export const CocoSpecifyRun = ['Coco1', 'Coco2', 'Coco3', 'Coco4', 'Coco5', 'DT-Van'];
export const DesignerTransportSpecifyRun = ['DT-1', 'DT-2', 'DT-3', 'DT-4', 'DT-5', 'DT-6', 'DT-VAN'];
export const DTShuttleSpecifyRun = ['NSW-ACR SHUTTLE'];
export const Winnings_Run = ['Local Run', 'CBD Run', 'Country Run'];
export const B2C_Container_Work = [
  'Standard Load/Unload (Trailer)',
  'Flat Packs / Load/Unload (<700)',
  'Flat Packs / Load/Unload (>700)',
];
export const B2C_Container_Size = ['20ft', '40ft'];
export const ExtraWorkTypeForContainerWork = ['Extra Cartons', 'Extra Hours'];
export const monthsListByIndex = [
  { index: '1', endDay: '31' },
  { index: '2', endDay: '29' }, // Assuming non-leap year
  { index: '3', endDay: '31' },
  { index: '4', endDay: '30' },
  { index: '5', endDay: '31' },
  { index: '6', endDay: '30' },
  { index: '7', endDay: '31' },
  { index: '8', endDay: '31' },
  { index: '9', endDay: '30' },
  { index: '10', endDay: '31' },
  { index: '11', endDay: '30' },
  { index: '12', endDay: '31' },
];
export const useOnlyBossOrAdmin = () => {
  const user = useSelector((state) => state.user.user);

  return user?.id === 82 || user?.id === 86;
};
