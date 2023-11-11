
import axios from "axios";
import Cache from "@/util/cache";
import axiosApi from "./axiosApi";

type props = {
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

export default async function addVisitor(data: props) {

    const res = await axiosApi.post(`${process.env.NEXT_PUBLIC_ROOT_URL}/visitor`,
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
