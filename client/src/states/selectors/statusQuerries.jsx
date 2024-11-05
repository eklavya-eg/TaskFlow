// import { selector, useRecoilValue } from "recoil";
// import { initiated, inProgress, completed } from "../atoms/statusQuerries";
// import { auth } from "../atoms/auth";
// import axios from "axios";
// import debounce from 'lodash.debounce'

// export const initiatedSelector = selector({
//     key: "Initiated",
//     get: async ({get})=>{
//         const i = get(initiated)
//         const status = "initiated"
//         if(i.length===0) return
//         const {token} = useRecoilValue(auth)
//         const res = queryInitiated(i,token,status)
//         if(res.status===200){
//             const ids = res.data.ids
//             const set = useSetRecoilState(initiated)
//             set((i)=>{
//                 i.filter(id=> !ids.includes(id))
//             })
//         }
//         return res
//     }
// })

// export const inProgressSelector = selector({
//     key: "InProgress",
//     get: async ({get})=>{
//         const i = get(inProgress)
//         const status = "in progress"
//         if(i.length===0) return
//         const {token} = useRecoilValue(auth)
//         const res = queryInProgress(i,token,status)
//         if(res.status===200){
//             const ids = res.data.ids
//             const set = useSetRecoilState(inProgress)
//             set((i)=>{
//                 i.filter(id=> !ids.includes(id))
//             })
//         }
//         return res
//     }
// })

// export const completedSelector = selector({
//     key: "Completed",
//     get: async ({get})=>{
//         const i = get(completed)
//         const status = "completed"
//         if(i.length===0) return
//         const {token} = useRecoilValue(auth)
//         const res = queryCompleted(i,token,status)
//         if(res.status===200){
//             const ids = res.data.ids
//             const set = useSetRecoilState(completed)
//             set((i)=>{
//                 i.filter(id=> !ids.includes(id))
//             })
//         }
//         return res
//     }
// })

// const queryInitiated = debounce(async (i,token,status)=>{
//     try{
//         const res = await axios.put(`${API_URL}/service/updateStatus`, {
//             ids: i,
//             status: status
//         }, {
//             headers:{authorization: token},
//         })
//         return res;
//     } catch (err){
//         console.log(err)
//         return {status:500}
//     }
// }, 3000)

// const queryInProgress = debounce(async (i,token,status)=>{
//     try{
//         const res = await axios.put(`${API_URL}/service/updateStatus`, {
//             ids: i,
//             status: status
//         }, {
//             headers:{authorization: token},
//         })
//         return res;
//     } catch (err){
//         console.log(err)
//         return {status:500}
//     }
// }, 3000)

// const queryCompleted = debounce(async (i,token,status)=>{
//     try{
//         const res = await axios.put(`${API_URL}/service/updateStatus`, {
//             ids: i,
//             status: status
//         }, {
//             headers:{authorization: token},
//         })
//         return res;
//     } catch (err){
//         console.log(err)
//         return {status:500}
//     }
// }, 3000)