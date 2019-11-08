import React, {Fragment, useEffect, useState} from 'react';
import {Button, DialogActions, TextField, DialogContent, DialogTitle, Dialog} from '@material-ui/core';
import Location from '../../models/location';
import * as R from 'ramda';
import ContentLayout from '../content-layout';

type LocationDialogEditProps = {
    open: boolean,
    id: string,
    model?: Location,
    onClose: Function,
    onSubmit: (Location) => void
};

const LocationDialogEdit = ({open, id, model, onClose, onSubmit}: LocationDialogEditProps) => {
    const [location, setLocation] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    const handleChange = R.curry((propPath, value) => {
        const path = [].concat(propPath);
        const newModel = R.assocPath(path, value, location);
        setLocation(newModel);
        setHasChanges(true);
    });

    useEffect(() => {
        if (model) {
            setLocation(Location.create(model));
        }
    }, [model]);

    return (
        <Fragment>
            <Dialog
                aria-labelledby={`${id}-title`}
                id={id}
                onClose={onClose}
                open={open}
            >
                <DialogTitle id={`${id}-title`}>
                    {'Edit'}
                </DialogTitle>
                <DialogContent>
                    <ContentLayout
                        direction={'row'}
                        spacing={1}
                    >
                        <TextField
                            label={'Name'}
                            onChange={event => handleChange('name', event.target.value)}
                            value={location.name || ''}
                        />
                    </ContentLayout>
                    <ContentLayout
                        direction={'row'}
                        spacing={1}
                    >
                        <TextField
                            label={'Address'}
                            onChange={event => handleChange('address', event.target.value)}
                            value={location.address || ''}
                        />
                    </ContentLayout>
                    <ContentLayout
                        direction={'row'}
                        spacing={1}
                    >
                        <TextField
                            label={'Link'}
                            onChange={event => handleChange('link', event.target.value)}
                            value={location.link || ''}
                        />
                    </ContentLayout>
                </DialogContent>
                <DialogActions>
                    <Button
                        color='primary'
                        onClick={onClose}
                    >
                        {'Cancel'}
                    </Button>
                    <Button
                        color={'primary'}
                        disabled={!hasChanges}
                        onClick={() => onSubmit(location)}
                    >
                        {'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default LocationDialogEdit;
