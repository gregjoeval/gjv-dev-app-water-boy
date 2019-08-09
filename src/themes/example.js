import primary from '@material-ui/core/colors/purple';
import secondary from '@material-ui/core/colors/green';
import error from '@material-ui/core/colors/orange';
import {THEME} from '../constants';

const options = {
    id: THEME.EXAMPLE_ID,
    name: 'example',
    primaryColor: primary['500'],
    secondaryColor: secondary['500'],
    errorColor: error['500']
};

export default options;