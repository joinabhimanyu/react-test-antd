import { functionExpression } from "@babel/types"
import moment from "moment"
import { useState } from "react"
import { useGetUserList } from "../../api/useUserList"

const UserState=()=>{
    
    const [userEntryMode, setUserEntryMode]=useState('View')
    const [firstname, setfirstname]=useState('')
    const [lastname, setlastname]=useState('')
    const [age, setage]=useState(0)
    const [address, setaddress]=useState('')
    const [sex, setsex]=useState('')
    const [dob, setdob]=useState(null)
    const [qualification, setqualification]=useState('')
    const [occupation, setoccupation]=useState('')
    const [organization, setorganization]=useState('')
    const [nationality, setnationality]=useState('')

    const {userlist, 
        status, 
        isError, 
        error, 
        isLoading, 
        
        SortUser,
        AddUser,
        RemoveUser,
        UpdateUser}=useGetUserList()

    const clearFormFields=()=>{
        setfirstname('')
        setlastname('')
        setage(0)
        setaddress('')
        setsex('')
        setdob(null)
        setqualification('')
        setoccupation('')
        setorganization('')
        setnationality('')
    }
const onSaveFormFields=(user)=>{
    if (userEntryMode==="New") {
        const sorted=userlist.map((f)=>f.key).sort((a,b)=>b-a)
        if (sorted && sorted.length>0) {
            const mxkey=sorted[0]
            const newuser={key:mxkey+1,...user}
            AddUser(newuser)
        }    
    } else if(userEntryMode==="Update"){
        UpdateUser(user)
    }
}
const onCancelClick=()=>setUserEntryMode("View")
const onDeleteUser=(key)=>{
    RemoveUser(key)
}
const onNewUserClick=()=>{
    clearFormFields();
    setUserEntryMode('New')
}
const onEditUserClick=(key)=>{
    clearFormFields()
    const f=userlist.find(x=>x.key===key)
    if (f) {
        const {firstname, lastname, age, address, sex, dob, qualification, occupation, organization,
        nationality}=f;
        setfirstname(firstname)
        setlastname(lastname)
        setage(age)
        setaddress(address)
        setsex(sex)
        setdob(dob)
        setqualification(qualification)
        setoccupation(occupation)
        setorganization(organization)
        setnationality(nationality)
        setUserEntryMode("Update")
    }
}
    const onChangeFormField=(fieldname, value)=>{
        switch (fieldname) {
            case 'firstname':
                setfirstname(value)
                break;
        case 'lastname':
            setlastname(value)
            break;
            case 'age':
setage(value)
            break;
            case 'address':
                setaddress(value)
            break;
            case 'sex':
setsex(value)
            break;
            case 'dob':
                const v=moment(value).format('MM/DD/YYYY')
                setdob(v)
            break;
            case 'qualification':
                setqualification(value)
            break;
            case 'occupation':
                setoccupation(value)
            break;
            case 'organization':
                setorganization(value)
            break;
            case 'nationality':
                setnationality(value)
            break;
            default:
                break;
        }
    }

    return {
        userlist,
        status,
        isError,
        error,
        isLoading,

        clearFormFields,
        onSaveFormFields,
        onDeleteUser,
        onChangeFormField,
        onNewUserClick,
        onEditUserClick,
        onCancelClick,
        
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

export default UserState;