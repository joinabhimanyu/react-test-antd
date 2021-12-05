import { useState } from "react";

const getDummyuserListData=()=>new Promise((resolve,reject)=>{
    try {
        const data=[{
            key:1,
            firstname:'abhi',
            lastname:'chak',
            age:'33',
            address:'ranchi',
            sex:'M',
            dob:'01/09/1987',
            qualification:'MCA',
            occupation:'Lead Developer',
            organization:'Wipro',
            nationality:'Indian'
        },{
            key:2,
            firstname:'ertert',
            lastname:'dgfg',
            age:'34',
            address:'ytjryj',
            sex:'M',
            dob:'10/23/1982',
            qualification:'BCA',
            occupation:'Developer',
            organization:'Wipro',
            nationality:'Indian'
        }]
        setTimeout(() => {
            resolve({data, status:200, isError:false, error:null})
        }, 1000);
    } catch (error) {
        console.log(error)
        reject({data:null, status:400, isError:true, error})
    }
})

export const useGetUserList=async()=>{
    const [userlist, setuserlist]=useState([])
    const [status, setstatus]=useState(null)
    const [isLoading, setisLoading]=useState(false)
    const [isError, setisError]=useState(false)
    const [error, seterror]=useState(null);

    const SortUser=(sortfield, sortdirection, list)=>{
        let l=[]
        if (list) {
            l=JSON.parse(JSON.stringify(list))
        } else{
            l=JSON.parse(JSON.stringify(userlist))
        }
        if (l) {
            let sorted=[]
            if (sortdirection==="Desc") {
                sorted=l.sort((a,b)=>b[sorted]-a[sortfield])
            } else if(sortdirection==='Asc'){
                sorted=l.sort((a,b)=>a[sortfield]-b[sortfield])
            }
            setuserlist(JSON.parse(JSON.stringify(sorted)))
        }
    }
    const AddUser=(user)=>{
        const list=[...userlist, user]
        SortUser('key','Desc',list)
    }
    const RemoveUser=(key)=>{
        const list=userlist.filter(x=>x.key!==key)
        SortUser('key', 'Desc', list)
    }
    const UpdateUser=(user)=>{
        const {key}=user;
        const list=JSON.parse(JSON.stringify(userlist))
        const f=list.filter(x=>x.key===key)
        if (f) {
            f={...user}
        }
        SortUser('key', 'Desc', list)
    }

    setisLoading(true)
    try {
        const {data, status, isError, error}=await getDummyuserListData()
        setuserlist(JSON.parse(JSON.stringify(data)))
        setstatus(status)
        setisError(isError)
        seterror(error)
        setisLoading(false)
    } catch (e) {
        const { status, isError, error}=e;
        setuserlist(null)
        setstatus(status)
        setisError(isError)
        seterror(error)
        setisLoading(false)
    }
    return {
        userlist, 
        status, 
        isError, 
        error, 
        isLoading, 
        
        SortUser,
        AddUser,
        RemoveUser,
        UpdateUser
    };
}