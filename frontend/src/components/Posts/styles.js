import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
}));

export const ValidationTextField = styled(TextField)({
  '& input:valid:placeholder-shown + fieldset': {
    borderColor: '#1976d2',
    borderWidth: '1.3px',
  },
  '& input:valid:not(:placeholder-shown) + fieldset': {
    borderColor: '#1976d2',
    borderWidth: '1.3px',
  },
  '& input:empty + fieldset': {
    borderColor: 'red',
    borderWidth: '1.3px',
  },
  '& input:invalid:hover + fieldset': {
    borderColor: 'red',
    borderWidth: '2.5px',
  },
  '& input:invalid:focus + fieldset': {
    borderColor: 'red',
    borderWidth: '2.5px',
  },
  '& input:valid:hover + fieldset': {
    borderWidth: '2.5px',
  },
});
