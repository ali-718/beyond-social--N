//
import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import Table from './Table';
import Button from './Button';
import Tooltip from './Tooltip';
import Backdrop from './Backdrop';
import Autocomplete from './Autocomplete';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    Table(theme),
    Input(theme),
    Paper(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Autocomplete(theme)
  );
}
