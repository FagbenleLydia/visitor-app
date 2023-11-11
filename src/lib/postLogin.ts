
import axios from "axios";
import axiosApi from "./axiosApi";
import Cache from "@/util/cache";

type props = {
    email: string,
    password: string,
}

export default async function postLogin(data: props) {

    const res = await axiosApi.post(`${process.env.NEXT_PUBLIC_ROOT_URL}/auth/login`,
        {
            email: data.email,
            password: data.password
        })


    return res.data
}
