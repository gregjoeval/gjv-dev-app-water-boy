import React from 'react';
import {Button, IconButton, Snackbar, Typography} from '@material-ui/core';
import {Close as CloseIcon} from '@material-ui/icons';
import * as R from 'ramda';

type UndoUpdateSnackBarProps = {
    id: string,
    undoAction: Function,
    closeAction: Function,
    canceled: boolean,
    past: Array
};

const UndoUpdateSnackBar = ({id, undoAction, closeAction, canceled, past}: UndoUpdateSnackBarProps) => (
    <Snackbar
        action={[
            <Button
                color='secondary'
                key='undo'
                onClick={undoAction}
                size='small'
            >
                {'undo'}
            </Button>,
            <IconButton
                aria-label='close'
                color='inherit'
                key='close'
                onClick={closeAction}
            >
                <CloseIcon/>
            </IconButton>
        ]}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
        }}
        autoHideDuration={6000}
        ContentProps={{
            'aria-describedby': id
        }}
        message={(
            <Typography
                id={id}
                variant={'body1'}
            >
                {'Updated.'}
            </Typography>
        )}
        onClose={closeAction}
        open={!canceled && R.length(past) > 0}
    />
);

export default UndoUpdateSnackBar;
