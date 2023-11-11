import axios from "axios";
import axiosApi from "./axiosApi";
import Cache from "@/util/cache";

type props = {
    email: string;
    name: string;
    timeIn: string;
    timeOut: string;
    page?: number;
    pageSize?: number;
}

function constructQueryString(email: string, name: string, timeIn: string, timeOut: string | undefined): string {
    const filteredParams: Record<string, string | undefined> = {
        email: email || undefined,
        name: name || undefined,
        timeIn: timeIn || undefined,
        timeOut: timeOut || undefined,
    };

    const queryParams: string[] = [];
    for (const key in filteredParams) {
        if (filteredParams[key] !== undefined) {
            queryParams.push(`${key}=${encodeURIComponent(filteredParams[key] as string)}`);
        }
    }

    return queryParams.join('&');
}


export default async function getAllUsers(data: props) {
    const { email, name, timeIn, timeOut, page, pageSize } = data
    const query: string = constructQueryString(email, name, timeIn, timeOut);

    const res = await axiosApi.get(`${process.env.NEXT_PUBLIC_ROOT_URL}/visitor?${query}&page=${page}&size=${pageSize}`, {
        headers: {
            Authorization: `Bearer ${Cache.getCookie("token")}`
        }
    })


    return res.data
}
