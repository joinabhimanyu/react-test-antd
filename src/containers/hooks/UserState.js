import { useState } from "react"
import { useGetUserList } from "../../api/useUserList"

const UserState=()=>{
    
    const [userEntryMode, setUserEntryMode]=useState('view')
    const [firstname, firstname]=useState('')
    const [lastname, setlastname]=useState('')
    const [age, setage]=useState('')
    const [address, setaddress]=useState('')
    const [sex, setsex]=useState('')
    const [dob, setdob]=useState(null)
    const [qualification, setqualification]=useState('')
    const [occupation, setoccupation]=useState('')
    const [organization, setorganization]=useState('')
    const [nationality, setnationality]=useState('')

    const {userlist, status, isError, error, isLoading}=useGetUserList()

    return {
        userlist,
        status,
        isError,
        error,
        isLoading,

        userEntryMode,
        firstname,
        lastname,
        age,
        address,
        sex,
        dob,
        qualification,
        occupation,
        organization,
        nationality
    }

}