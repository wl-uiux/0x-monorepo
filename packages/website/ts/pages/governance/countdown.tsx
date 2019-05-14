import * as _ from 'lodash';
import * as moment from 'moment';
import * as React from 'react';

import { Paragraph } from 'ts/components/text';

interface Props {
    deadline: number;
    begin: number;
}

interface TimeStructure {
    year?: number;
    month?: number;
    week?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    [key: string]: number;
}

const now = moment();

export const Countdown: React.StatelessComponent<Props> = ({ deadline, begin }) => {
    const deadlineTime = moment(deadline, 'X');
    const beginTime = moment(begin, 'X');
    const hasBegun = beginTime.isBefore(now);
    const isPassed = deadlineTime.isBefore(now);
    let voteTextPrefix = isPassed ? `Voting ended: ` : `Vote ends: `;
    voteTextPrefix = !hasBegun ? `Voting begins: ` : voteTextPrefix;
    const displayTime = hasBegun ? deadlineTime : beginTime;
    const timeText = !isPassed ? ` • ${getRelativeTime(displayTime)}` : '';
    const voteText = `${voteTextPrefix} ${displayTime.local().format('L LT z')} ${timeText}`;

    // TODO convert to container component
    return (
        <div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <Paragraph>{voteText} </Paragraph>
            </div>
        </div>
    );
};

function getRelativeTime(deadline: moment.Moment): string {
    const diff = moment().diff(deadline);
    const duration = moment.duration(diff);

    return millisToDaysHoursMinutes(duration.asMilliseconds());
}

function millisToDaysHoursMinutes(futureDateMs: number): string {
    let delta = Math.abs(futureDateMs - now.milliseconds()) / 1000;
    const result: TimeStructure = {};
    const structure: TimeStructure = {
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    _.keys(structure).forEach((key: string) => {
        result[key] = Math.floor(delta / structure[key]);
        delta -= result[key] * structure[key];
    });

    return `${result.day} days ${result.hour} hours ${result.minute} mins`;
}
