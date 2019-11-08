import React, {Component} from 'react';
import {Card, CardActions, CardContent, Typography, CardHeader, Avatar, IconButton} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/styles';
import ContentLayout from '../content-layout';
import {Skeleton} from '@material-ui/lab';
import * as R from 'ramda';
import toMaterialStyle from 'material-color-hash';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: theme.spacing(30)
    },
    avatar: (props) => ({
        backgroundColor: props.backgroundColor,
        color: props.color
    })
}));

type LocationCardPlaceholderProps = {
    withActions?: boolean
}

export const LocationCardPlaceholder = ({withActions = false}: LocationCardPlaceholderProps) => {
    const theme = useTheme();
    const heightCoefficient = withActions ? 19.5 : 14;
    return (
        <Skeleton
            height={theme.spacing(heightCoefficient)}
            variant={'rect'}
        />
    );
};

type EventCardProps = {
    children?: Array<Node> | Node,
    name: string,
    link?: string,
    address: string,
    actions?: Node,
    headerAction?: Node,
};

const LocationCard = ({children, name, link, address, actions}: EventCardProps): Component => {
    const initials = R.toUpper(R.join('')(R.compose(R.map(R.head), R.take(2), R.filter(x => Boolean(x)), R.split(/[^\w\d]/))(name)));
    debugger;
    const {backgroundColor, color} = toMaterialStyle(name);
    const classes = useStyles({backgroundColor, color});

    return (
        <Card className={classes.card}>
            <CardHeader
                action={link && (
                    <IconButton
                        component={'a'}
                        href={link}
                        target={'_blank'}
                    >
                        <OpenInNewIcon/>
                    </IconButton>
                )}
                avatar={(
                    <Avatar className={classes.avatar}>
                        {initials}
                    </Avatar>
                )}
                title={(
                    <Typography>
                        {name}
                    </Typography>
                )}
            />
            <CardContent>
                <ContentLayout
                    direction={'row'}
                    justify={'space-between'}
                    wrap={'wrap'}
                >
                    <Typography variant={'body2'}>
                        {address}
                    </Typography>
                </ContentLayout>
                {children}
            </CardContent>
            {
                actions && actions.length
                    ? (
                        <CardActions>
                            {actions}
                        </CardActions>
                    )
                    : null
            }
        </Card>
    );
};

export default LocationCard;
