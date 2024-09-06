import instance from "@/api/instance";

export default async function login({ email, password }) {
    return await instance.post("/auth/login", { login: email, password }).then(res => res.data)
}

