import React, {useState} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IconButton, Typography, Menu, MenuItem, Tooltip} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import {Brightness2 as DarkThemeIcon, Brightness6 as LightThemeIcon, Palette as PaletteIcon} from '@material-ui/icons';
import {GithubCircle as GithubIcon} from 'mdi-material-ui';
import {THEME} from '../../constants';
import Themes from '../../themes';
import Header from '../../components/header';
import ContentLayout from '../../components/content-layout';
import {ThemeActions} from '../../actions';

const mapStateToProps = state => ({
    id: state.theme.id,
    type: state.theme.type
});

const mapDispatchToProps = dispatch => ({
    themeActions: bindActionCreators(ThemeActions, dispatch)
});

type Props = {
    classes: Object,
    themeActions: {setThemeId: any => void, setLightTheme: any => void, setDarkTheme: any => void},
    id: string,
    type: string
};

const AppHeader = ({classes, themeActions, id, type}: Props) => {
    const {setThemeId, setLightTheme, setDarkTheme} = themeActions;

    const isLightTheme = type === THEME.LIGHT;
    const toggleThemeType = isLightTheme ? setDarkTheme : setLightTheme;

    const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);

    const themeMenuId = 'theme-menu-id';
    const openThemeMenu = (e) => setThemeMenuAnchorEl(e.currentTarget);
    const closeThemeMenu = () => setThemeMenuAnchorEl(null);
    const handleThemeMenuClick = (themeId) => () => {
        if (id !== themeId) {
            setThemeId(themeId);
        }

        closeThemeMenu();
    };

    const ThemeMenu = () => (
        <Menu
            anchorEl={themeMenuAnchorEl}
            id={themeMenuId}
            keepMounted={true}
            onClose={closeThemeMenu}
            open={Boolean(themeMenuAnchorEl)}
        >
            {
                (Themes || []).map((theme, index) => (
                    <MenuItem
                        button={true}
                        className={classes.menuItem}
                        component={'li'}
                        key={index}
                        onClick={handleThemeMenuClick(theme.id)}
                    >
                        {theme.name}
                    </MenuItem>
                ))
            }
        </Menu>
    );

    return (
        <Header
            alignItems={'center'}
            justify={'space-between'}
        >
            <Typography
                variant={'h5'}
            >
                {process.env.REACT_APP_WEBSITE_TITLE}
            </Typography>
            <ContentLayout
                direction={'row'}
            >
                <Tooltip title={'Toggle light/dark theme'}>
                    <IconButton
                        color={'inherit'}
                        href={null}
                        onClick={toggleThemeType}
                    >
                        {
                            isLightTheme
                                ? <LightThemeIcon/>
                                : <DarkThemeIcon/>
                        }
                    </IconButton>
                </Tooltip>
                <Tooltip title={'Select theme'}>
                    <IconButton
                        aria-controls={themeMenuId}
                        aria-haspopup={'true'}
                        color={'inherit'}
                        href={null}
                        onClick={openThemeMenu}
                    >
                        <PaletteIcon/>
                    </IconButton>
                </Tooltip>
                <ThemeMenu/>
                <Tooltip title={'Github Repository'}>
                    <IconButton
                        color={'inherit'}
                        href={'https://github.com/gregjoeval/example-cra-app'}
                        target={'_blank'}
                    >
                        <GithubIcon/>
                    </IconButton>
                </Tooltip>
            </ContentLayout>
        </Header>
    );
};

const styles = () => ({
    menuItem: {
        textTransform: 'capitalize'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppHeader));