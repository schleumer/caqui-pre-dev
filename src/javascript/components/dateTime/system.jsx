import memoize from 'memoizee';
import moment from 'moment';

export const range = (from, to) =>
    Array.apply(null, new Array(to)).map((_, i) => from + i)

export const today = moment();

export const last = (array) => array[array.length - 1];
export const first = (array) => array[0];

export const newWeek = () => range(0, 7);

export const plug = (condition, def, overwrite) => {
    if (condition) {
        return {...def, ...overwrite};
    } else {
        return def;
    }
};

// TODO: beautify
export const buildCalendar = memoize((base) => {
    const anchor = base.clone();
    const [ year, month ] = [anchor.year(), anchor.month()];

    const daysInMonth = anchor.daysInMonth();

    const days = range(1, daysInMonth).map(x => {
        return anchor.clone().date(x);
    });

    const firstDay = first(days)
        , lastDay = last(days);

    // TODO: verify
    // added 1 plus week that may be removed after calendar build
    // to avoid weird calculations and quantic formulaes
    const weeksInMonth = Math.ceil((lastDay.date() - firstDay.date()) / 7) + 1;

    // TODO: WHAT I'M DOING???
    // the filter is because of the possible last empty week.
    return range(0, weeksInMonth).map(x => newWeek()).map(week =>
        week.map(n => {
            const nextDay = first(days);

            if (!nextDay) {
                return null;
            }

            if (n === nextDay.day()) {
                return days.shift();
            } else {
                return null;
            }

        })
    ).filter(w => w.reduce((r, x) => r || !!x, false));
});
