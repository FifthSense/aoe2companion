import { makeQueryString } from '../helper/util';
import {ILeaderboard, ILeaderboardRaw} from "../helper/data";
import {fromUnixTime} from "date-fns";
import { getHost } from './host';


function convertTimestampsToDates(leaderboardRaw: ILeaderboardRaw): ILeaderboard {
    return {
        ...leaderboardRaw,
        updated: leaderboardRaw.updated ? fromUnixTime(leaderboardRaw.updated) : undefined,
        leaderboard: leaderboardRaw.leaderboard.map(playerRaw => ({
            ...playerRaw,
            last_match: fromUnixTime(playerRaw.last_match),
        })),
    };
}

export interface IFetchLeaderboardParams {
    start?: number;
    count: number;
    search?: string;
    steam_id?: string;
    profile_id?: number;
    country?: string;
}

async function fetchLeaderboardInternal(baseUrl: string, game: string, leaderboard_id: number, params: IFetchLeaderboardParams) {
    const queryString = makeQueryString({
        game,
        leaderboard_id,
        ...params,
    });

    const url = baseUrl + `api/leaderboard?${queryString}`;
    const response = await fetch(url);
    console.log(url);
    try {
        const json = await response.json();
        return convertTimestampsToDates(json);
    } catch (e) {
        console.log("FAILED", e);
        throw e;
    }
}

export async function fetchLeaderboard(game: string, leaderboard_id: number, params: IFetchLeaderboardParams) {
    try {
        return await fetchLeaderboardInternal(getHost('aoe2companion'), game, leaderboard_id, params);
    } catch (e) {
        if (params.country == null) {
            return await fetchLeaderboardInternal(getHost('aoe2net'), game, leaderboard_id, params);
        }
        throw e;
    }
}

export async function fetchLeaderboardLegacy(game: string, leaderboard_id: number, params: IFetchLeaderboardParams) {
    return await fetchLeaderboardInternal(getHost('aoe2net'), game, leaderboard_id, params);
}
