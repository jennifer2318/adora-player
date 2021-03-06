import Md5 from "crypto-js/md5";

export const getAuthStorage = () => {
    const adora_user = localStorage.adora_user;

    if (adora_user) {
        const adora = JSON.parse(adora_user);

        if (adora?.Session_id && adora?.sessguard && adora?.sessionid2) {
            return adora;
        }
    }
    return false;
};

export const getPlayerStateStorage = () => {
    const playerStateStr = localStorage.playerState;

    if (playerStateStr) {
        const playerState = JSON.parse(playerStateStr);

        if (playerState?.isPaused) {
            return playerState;
        }
    }

    return {
        isPaused: true,
        progress: 0,
        volume: 1,
        muted: false,
        track: {},
        playlist: [],
        currentTime: 0,
        repeat: false,
        next: {},
        prev: {},
    };
};


export const generateHash = audio => {
    if (audio && audio?.path && audio?.s) {
        const hash = Md5(`XGRlBW9FXlekgbPrRHuSiA${audio.path.substr(1, audio.path.length-1)}${audio.s}`).toString();
        return Object.assign(audio, {hash});
    }
};

export const generateDownloadUrl = audio => {
    if (audio && audio?.hash && audio?.host && audio?.codec && audio?.ts && audio?.path && audio?.trackid) {
        const downloadUrl = `http://${audio.host}/get-${audio.codec}/${audio.hash}/${audio.ts}${audio.path}?track-id=${audio.trackid}&region=225&from=service-search`;
        return Object.assign(audio, {downloadUrl});
    }
};

export const generateAudio = audio => {
    return generateDownloadUrl(generateHash(audio));
};

export const getAccountInfoStorage = () => {
    const accountInfo = localStorage.accountInfo;

    if (accountInfo) {
        const info = JSON.parse(accountInfo);

        if (info?.device_id && info?.uid) {
            return info;
        }
    }
    return false;
};

export const getAuthInfoStorage = () => {
    const authInfo = localStorage.authInfo;

    if (authInfo) {
        const info = JSON.parse(authInfo);

        if (info?.device_id && info?.login) {
            return info;
        }
    }
    return false;
};

export const getNewReleasesStorage = () => {
    const releasesData = localStorage.newReleases;

    if (releasesData) {
        const releases = JSON.parse(releasesData);

        if (releases.data.length > 0) {
            return releases;
        }
    }
    return false;
};

export const setCookie = (name, value, options = {}) => {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
};

export const setAdoraCookie = () => {
    const adora = getAuthStorage();

    if (adora !== false) {
        const {Session_id, sessguard, sessionid2, yandex_login} = adora;

        setCookie('Session_id', Session_id.value, {secure: true, 'expires': new Date(Session_id.expirationDate).toUTCString(), domain: Session_id.domain});
        setCookie('sessguard', sessguard.value, {secure: true, 'expires': new Date(sessguard.expirationDate).toUTCString(), domain: sessguard.domain});
        setCookie('sessionid2', sessionid2.value, {secure: true, 'expires': new Date(sessionid2.expirationDate).toUTCString(), domain: sessionid2.domain});
        setCookie('yandex_login', yandex_login.value, {secure: true, 'expires': new Date(yandex_login.expirationDate).toUTCString(), domain: yandex_login.domain});
    }
};