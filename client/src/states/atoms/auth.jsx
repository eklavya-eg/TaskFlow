import { atom } from "recoil"
export const auth = atom({
    key: "Auth",
    default: {
        username: null,
        name: null,
        _id: null,
        token: null
    }
})