import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';
import {navigableScreens} from '../../screens';
import Screen from '../../models/screen';
import * as R from 'ramda';
import {GithubCircle as GithubIcon} from 'mdi-material-ui';

const getListItems = (screens, currentPath) => R.reduce((acc, item) => {
    const screenModel = Screen.create(item);
    const {Name, Path, Icon} = screenModel;
    const el = (
        <ListItem
            button={true}
            component={Link}
            key={Name}
            selected={currentPath === Path}
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
        width: theme.spacing(28)
    }
}));

type SideBarMenuProps = {
    onClose: Function,
    isOpen: boolean
}

const SideBarMenu = ({onClose, isOpen}: SideBarMenuProps) => {
    const location = useLocation();
    const {pathname} = location || {};
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
                {getListItems(navigableScreens, pathname)}
            </List>
            <Divider/>
            <List
                className={classes.list}
                component={'nav'}
            >
                <ListItem
                    button={true}
                    component={'a'}
                    href={'https://github.com/gregjoeval/gjv-dev-app-water-boy'}
                    target={'_blank'}
                >
                    <ListItemIcon>
                        <GithubIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'GitHub Repository'}/>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default SideBarMenu;