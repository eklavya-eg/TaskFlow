import { atom, selector } from "recoil"
import { auth } from "../atoms/auth"
import { API_URL } from "../../config"
import axios from "axios"
export const tasksAtom = atom({
    key: "tasksAtom",
    default: selector({
        key: "tasksSelector",
        get: async ({ get }) => {
            const { token } = get(auth)
            if (token === null) return [];
            const headers = { authorization: token }
            try {
                const res = await axios.get(`${API_URL}/tasks/`, { headers: headers })
                const atasks = res.data.tasks
                var tasksCol = []
                atasks.map((atask)=>{
                    
                })
            } catch (err) {
                console.log(err)
                return [];
            }
        }
    })
})