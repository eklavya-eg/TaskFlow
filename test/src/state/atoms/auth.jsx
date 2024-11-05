import { atom } from "recoil"
export const auth = atom({
    key: "Auth",
    default: {
        username: "",
        token: ""
    }
})