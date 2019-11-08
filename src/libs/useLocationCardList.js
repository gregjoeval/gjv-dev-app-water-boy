import React, {Fragment, useState} from 'react';
import * as R from 'ramda';
import Location from '../models/location';
import {deleteLocationAsync, putLocationAsync, updateLocation} from '../actions/locations';
import LocationCard, {LocationCardPlaceholder} from '../components/location-card';
import {Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import LocationDialogEdit from '../components/location-dialog-edit';

function useLocationCardList(models, withActions = false) {
    const dispatch = useDispatch();

    const [openDialogId, setOpenDialogId] = useState(null);
    const dialogIdPrefix = 'location-dialog-';

    const values = R.values(models);
    const filteredData = R.sortWith([R.descend(R.prop('name'))], values);

    const placeholderList = R.repeat((
        <LocationCardPlaceholder
            key={'LocationCardPlaceholder'}
            withActions={withActions}
        />
    ), 12);

    const list = R.reduce((acc, item) => {
        const model = Location.create(item);
        debugger;

        const element = (
            <Fragment key={model.id}>
                {
                    withActions && (
                        <LocationDialogEdit
                            id={`${dialogIdPrefix}${model.id}`}
                            model={model}
                            onClose={() => setOpenDialogId(null)}
                            onSubmit={(value) => {
                                dispatch(updateLocation(Location.create({...value, edited: true})));
                                setOpenDialogId(null);
                            }}
                            open={Boolean(openDialogId === `${dialogIdPrefix}${model.id}`)}
                        />
                    )
                }
                <LocationCard
                    actions={(
                        withActions && [
                            (
                                model.edited
                                    ? (
                                        <Button
                                            key={`put-${model.id}`}
                                            onClick={() => dispatch(putLocationAsync(Location.create({...model, edited: false})))}
                                        >
                                            {'save'}
                                        </Button>
                                    )
                                    : (
                                        <Button
                                            key={`${dialogIdPrefix}${model.id}`}
                                            onClick={() => setOpenDialogId(`${dialogIdPrefix}${model.id}`)}
                                        >
                                            {'edit'}
                                        </Button>
                                    )
                            ),
                            (
                                <Button
                                    key={`delete-${model.id}`}
                                    onClick={() => dispatch(deleteLocationAsync(model.id))}
                                >
                                    {'delete'}
                                </Button>
                            )
                        ]
                    )}
                    address={model.address}
                    link={model.link}
                    name={model.name}
                />
            </Fragment>
        );

        return R.append(element, acc);
    }, [], filteredData);

    return [list, placeholderList];
}

export default useLocationCardList;
