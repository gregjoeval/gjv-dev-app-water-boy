import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/green';
import error from '@material-ui/core/colors/red';
import {THEME} from '../constants';

const options = {
    id: THEME.DEFAULT_ID,
    name: 'original',
    primaryColor: primary['500'],
    secondaryColor: secondary.A700,
    errorColor: error['500']
};

export default options;