import React, {Fragment, useState} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IconButton, Link, Tooltip} from '@material-ui/core';
import {Brightness2 as DarkThemeIcon, Brightness6 as LightThemeIcon, Palette as PaletteIcon, Menu as MenuIcon} from '@material-ui/icons';
import {THEME} from '../../constants';
import Header from '../../components/header';
import ContentLayout from '../../components/content-layout';
import {ThemeActions} from '../../actions';
import ThemeMenu from '../theme-menu';
import SideBarMenu from '../side-bar-menu';
import {Link as RouterLink} from 'react-router-dom';
import {HomePath} from '../../screens/home';
import AccountMenu from '../account-menu';

const mapStateToProps = state => ({
    id: state.theme.id,
    type: state.theme.type,
    websiteTitle: state.config.websiteTitle
});

const mapDispatchToProps = dispatch => ({
    themeActions: bindActionCreators(ThemeActions, dispatch)
});

type Props = {
    themeActions: {setThemeId: any => void, setLightTheme: any => void, setDarkTheme: any => void},
    id: string,
    type: string,
    websiteTitle: string
};

const AppHeader = ({themeActions, id, type, websiteTitle}: Props) => {
    const {setThemeId, setLightTheme, setDarkTheme} = themeActions;

    const isLightTheme = type === THEME.LIGHT;
    const toggleThemeType = isLightTheme ? setDarkTheme : setLightTheme;

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);
    const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);

    const openSideBar = () => setIsSideBarOpen(true);
    const closeSideBar = () => setIsSideBarOpen(false);

    const accountMenuId = 'theme-menu-id';
    const openAccountMenu = (e) => setAccountMenuAnchorEl(e.currentTarget);
    const closeAccountMenu = () => setAccountMenuAnchorEl(null);

    const themeMenuId = 'theme-menu-id';
    const openThemeMenu = (e) => setThemeMenuAnchorEl(e.currentTarget);
    const closeThemeMenu = () => setThemeMenuAnchorEl(null);
    const handleThemeMenuClick = (themeId) => () => {
        if (id !== themeId) {
            setThemeId(themeId);
        }

        closeThemeMenu();
    };

    const SideBar = () => (
        <Fragment>
            <IconButton
                color={'inherit'}
                href={null}
                onClick={openSideBar}
            >
                <MenuIcon/>
            </IconButton>
            <SideBarMenu
                isOpen={isSideBarOpen}
                onClose={closeSideBar}
            />
        </Fragment>
    );

    return (
        <Header
            alignItems={'center'}
            justify={'space-between'}
        >
            <ContentLayout
                alignItems={'center'}
                direction={'row'}
            >
                <SideBar/>
                <Link
                    color={'inherit'}
                    component={RouterLink}
                    to={HomePath}
                    variant={'h5'}
                >
                    {websiteTitle || ''}
                </Link>
            </ContentLayout>
            <ContentLayout
                alignItems={'center'}
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
                <ThemeMenu
                    anchorElement={themeMenuAnchorEl}
                    id={themeMenuId}
                    onClick={handleThemeMenuClick}
                    onClose={closeThemeMenu}
                />
                <AccountMenu
                    anchorElement={accountMenuAnchorEl}
                    id={accountMenuId}
                    onClose={closeAccountMenu}
                    onOpen={openAccountMenu}
                />
            </ContentLayout>
        </Header>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);