import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';
import {navigableScreens} from '../../screens';
import createScreen from '../../models/screen';
import * as R from 'ramda';

const getListItems = (screens) => R.reduce((acc, item) => {
    const screenModel = createScreen(item);
    const {Name, Path, Icon} = screenModel;
    const el = (
        <ListItem
            button={true}
            component={Link}
            key={Name}
            to={Path}
        >
            {Boolean(Icon) && (
                <ListItemIcon>
                    <Icon/>
                </ListItemIcon>
            )}
            <ListItemText primary={Name}/>
        </ListItem>
    );
    return R.append(el, acc);
}, [], R.values(screens));

const useStyles = makeStyles((theme) => ({
    list: {
        width: theme.spacing(25)
    }
}));

type SideBarMenuProps = {
    onClose: Function,
    isOpen: boolean
}

const SideBarMenu = ({onClose, isOpen}: SideBarMenuProps) => {
    const classes = useStyles();
    return (
        <Drawer
            onClose={onClose}
            open={isOpen}
        >
            <List
                className={classes.list}
                component={'nav'}
            >
                {getListItems(navigableScreens)}
            </List>
        </Drawer>
    );
};

export default SideBarMenu;