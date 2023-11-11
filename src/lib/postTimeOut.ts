import Cache from "@/util/cache";
import axios from "axios";
import axiosApi from "./axiosApi";

type props = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    purpose: string,
    whoToVisit: string,
    timeIn: string | null,
    timeOut: string | null,
    dateVisited: string,
}

export default async function postTimeOut(data: props) {

    const res = await axiosApi.put(`${process.env.NEXT_PUBLIC_ROOT_URL}/visitor/${data.id}`,
        {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            purpose: data.purpose,
            whoToVisit: data.whoToVisit,
            timeIn: data.timeIn,
            timeOut: data.timeOut,
            dateVisited: data.dateVisited
        },
        {
            headers: {
                Authorization: `Bearer ${Cache.getCookie("token")}`
            }
        })


    return res.data
}
