import {Menu, MenuItem} from '@material-ui/core';
import Themes from '../../themes';
import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {useSelector} from 'react-redux';

const useStyles = makeStyles({
    menuItem: {
        textTransform: 'capitalize'
    }
});

type ThemeMenuProps = {
    anchorElement: any,
    id: string,
    onClose: Function,
    onClick: Function
};

const ThemeMenu = ({anchorElement, id, onClose, onClick}: ThemeMenuProps) => {
    const currentThemeId = useSelector(state => state.theme.id);
    const classes = useStyles();
    return (
        <Menu
            anchorEl={anchorElement}
            id={id}
            keepMounted={true}
            onClose={onClose}
            open={Boolean(anchorElement)}
        >
            {(Themes || []).map((theme, index) => (
                <MenuItem
                    button={true}
                    className={classes.menuItem}
                    component={'li'}
                    key={index}
                    onClick={onClick(theme.id)}
                    selected={currentThemeId === theme.id}
                >
                    {theme.name}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default ThemeMenu;