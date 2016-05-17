import R from 'ramda';

const classTemplate = "col-$1-$2";
const devicesSizes = {
    "x-small": "xs",
    "small": "sm",
    "medium": "md",
    "large": "lg"
};

const sizesObjToString = R.pipe(
    R.toPairs,
    R.map(s => classTemplate
        .replace('$1', (devicesSizes.hasOwnProperty(s[0]) ? devicesSizes[s[0]] : s[0]))
        .replace('$2', s[1])
    ));


class ColumnBreakpoints {
    constructor(large = 12, medium = 12, small = 12, extraSmall = 12) {
        this.breakPoints = {
            "large": large,
            "medium": medium,
            "small": small,
            "x-small": extraSmall
        };
    }

    toArray() {
        return sizesObjToString(this.breakPoints);
    }

    large(size = 12) {
        return this.put("large", size);
    }

    medium(size = 12) {
        return this.put("medium", size);
    }

    small(size = 12) {
        return this.put("small", size);
    }

    extraSmall(size = 12) {
        return this.put("x-small", size);
    }

    put(deviceSize, size) {
        this.breakPoints[deviceSize] = size;
        return this;
    }
}

export default ColumnBreakpoints;