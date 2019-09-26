import {Button, IconButton, Menu, MenuItem} from '@material-ui/core';
import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/styles';
import {useAuth0} from '../auth-provider';
import {Link as RouterLink} from 'react-router-dom';
import {AccountName, AccountPath} from '../../screens/account';
import {AccountCircle as AccountCircleIcon} from '@material-ui/icons';

const useStyles = makeStyles({
    menuItem: {
        textTransform: 'capitalize'
    }
});

type AccountMenuProps = {
    anchorElement: any,
    id: string,
    onClose: Function,
    onOpen: Function,
};

const AccountMenu = ({anchorElement, id, onClose, onOpen}: AccountMenuProps) => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();
    const classes = useStyles();

    const menu = (
        <Menu
            anchorEl={anchorElement}
            id={id}
            keepMounted={true}
            onClose={onClose}
            open={Boolean(anchorElement)}
        >
            <MenuItem
                button={true}
                className={classes.menuItem}
                component={RouterLink}
                to={AccountPath}
            >
                {AccountName}
            </MenuItem>
            <MenuItem
                button={true}
                className={classes.menuItem}
                onClick={() => logout({})}
            >
                {'logout'}
            </MenuItem>
        </Menu>
    );
    return isAuthenticated
        ? (
            <Fragment>
                <IconButton
                    aria-controls={id}
                    aria-haspopup={'true'}
                    color={'inherit'}
                    href={null}
                    onClick={onOpen}
                >
                    <AccountCircleIcon/>
                </IconButton>
                {menu}
            </Fragment>
        )
        : (
            <Button
                color={'inherit'}
                onClick={() => loginWithRedirect({})}
            >
                {'login'}
            </Button>
        );
};

export default AccountMenu;