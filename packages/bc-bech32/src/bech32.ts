import { Bech32Version } from './index';

const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

function polymod(values: number[]): number {
    let chk = 1;
    for (let p = 0; p < values.length; ++p) {
        const top = chk >> 25;
        chk = ((chk & 0x1ffffff) << 5) ^ values[p];
        for (let i = 0; i < 6; ++i) {
            if ((top >> i) & 1) {
                chk ^= GENERATOR[i];
            }
        }
    }
    return chk;
}

function hrpExpand(hrp: string) {
    const ret: number[] = [];
    let p: number;
    for (p = 0; p < hrp.length; ++p) {
        ret.push(hrp.charCodeAt(p) >> 5);
    }
    ret.push(0);
    for (p = 0; p < hrp.length; ++p) {
        ret.push(hrp.charCodeAt(p) & 31);
    }
    return ret;
}

function verifyChecksum(hrp: string | undefined, data: number[], version: Bech32Version) {
    let header: number[];
    if (hrp) {
        header = hrpExpand(hrp);
    } else {
        header = [0];
    }
    const check = version === Bech32Version.Origin ? 1 : 0x3fffffff;
    return polymod(header.concat(data)) === check;
}

function createChecksum(hrp: string | undefined, data: number[], bech32Version: Bech32Version): number[] {
    let values: number[];
    if (hrp) {
        values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
    } else {
        values = [0].concat(data).concat([0, 0, 0, 0, 0, 0]);
    }

    const chk = bech32Version === Bech32Version.Origin ? 1 : 0x3fffffff;

    const mod = polymod(values) ^ chk;
    const ret = [];
    for (let p = 0; p < 6; ++p) {
        ret.push((mod >> (5 * (5 - p))) & 31);
    }
    return ret;
}

const encode = (hrp: string | undefined, data: number[], version: Bech32Version): string => {
    const combined = data.concat(createChecksum(hrp, data, version));
    let ret: string;
    if (hrp) {
        ret = hrp + '1';
    } else {
        ret = '';
    }
    for (let p = 0; p < combined.length; ++p) {
        ret += CHARSET.charAt(combined[p]);
    }
    return ret;
};

const decodeBc32 = (bechString: string): { hrp: null; data: number[] } => {
    const data: number[] = [];
    for (let p = 0; p < bechString.length; ++p) {
        const d = CHARSET.indexOf(bechString.charAt(p));
        if (d === -1) {
            return null;
        }
        data.push(d);
    }
    if (!verifyChecksum(null, data, Bech32Version.bis)) {
        return null;
    }
    return { hrp: null, data: data.slice(0, data.length - 6) };
};

const decode = (bechString: string) => {
    let p: number;
    let hasLower = false;
    let hasUpper = false;
    for (p = 0; p < bechString.length; ++p) {
        if (bechString.charCodeAt(p) < 33 || bechString.charCodeAt(p) > 126) {
            return null;
        }
        if (bechString.charCodeAt(p) >= 97 && bechString.charCodeAt(p) <= 122) {
            hasLower = true;
        }
        if (bechString.charCodeAt(p) >= 65 && bechString.charCodeAt(p) <= 90) {
            hasUpper = true;
        }
    }
    if (hasLower && hasUpper) {
        return null;
    }
    bechString = bechString.toLowerCase();
    const pos = bechString.lastIndexOf('1');
    if (pos === -1) {
        return decodeBc32(bechString);
    }
    if (pos < 1 || pos + 7 > bechString.length || bechString.length > 90) {
        return null;
    }
    const hrp = bechString.substring(0, pos);
    const data: number[] = [];
    for (p = pos + 1; p < bechString.length; ++p) {
        const d = CHARSET.indexOf(bechString.charAt(p));
        if (d === -1) {
            return null;
        }
        data.push(d);
    }
    if (!verifyChecksum(hrp, data, Bech32Version.Origin)) {
        return null;
    }
    return { hrp: hrp, data: data.slice(0, data.length - 6) };
};

export default {
    encode,
    decode,
};
