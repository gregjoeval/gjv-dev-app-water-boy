import moment from 'moment';

export const getCurrentSeason = () => {
    const now = moment();
    const quarter = now.quarter();
    switch (quarter) {
        case 1:
            return 'Spring';
        case 2:
            return 'Summer';
        case 3:
            return 'Fall';
        case 4:
            return 'Winter';
        default:
            return 'Unknown';
    }
};