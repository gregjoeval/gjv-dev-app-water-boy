// @flow
import createMuiTheme, {Theme, ThemeOptions} from '@material-ui/core/styles/createMuiTheme';
import * as R from 'ramda';
import defaultThemeOptions from '../../themes/default';
import exampleThemeOptions from '../../themes/example';
import {THEME} from '../../constants';

interface IAppTheme {
    id: string,
    name: string,
    type: string,
    primaryColor: string,
    secondaryColor: string,
    errorColor: string,
}

export default class AppTheme implements IAppTheme {
  static toMuiThemeOptions = (theme: AppTheme): ThemeOptions => ({
      id: theme.id,
      name: theme.name,
      palette: {
          type: theme.type,
          primary: {
              main: theme.primaryColor
          },
          secondary: {
              main: theme.secondaryColor
          },
          error: {
              main: theme.errorColor
          }
      }
  });

  static toMuiTheme = (theme: AppTheme): Theme => {
      const muiThemeOptions = AppTheme.toMuiThemeOptions(theme);
      return createMuiTheme(muiThemeOptions);
  };

  static getThemeOptionsFromId = (themeId: string): AppTheme => {
      switch (themeId) {
          case exampleThemeOptions.id:
              return R.mergeDeepRight(defaultThemeOptions, exampleThemeOptions);
          case defaultThemeOptions.id:
          default:
              return defaultThemeOptions;
      }
  };

  static create = (args) => new AppTheme(args || {});

  constructor(args) {
      this.id = args.id || THEME.DEFAULT_ID;
      this.type = args.type || THEME.LIGHT;
      this.name = args.name || this.id || null;
      const themeDefaults = AppTheme.getThemeOptionsFromId(this.id);
      this.primaryColor = args.primaryColor || themeDefaults.primaryColor;
      this.secondaryColor = args.secondaryColor || themeDefaults.secondaryColor;
      this.errorColor = args.errorColor || themeDefaults.errorColor;
  }
}
