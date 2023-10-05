import { ScrollView, StyleSheet, Text, View } from "react-native";
import Field from "./Field";
import React, { useState } from 'react'

  
export default function Inputs() {
  const [fdata, setFdata] = useState({
    firstName:'',
    lastName:'',
    email: '',
    password: '',
    cpassword: '',
    phoneNumber: '',
    gender: '',
    job: '',
    height: '',
    health: '',
  
   
})
const [errormsg, setErrormsg] = useState(null);

const Sendtobackend = () => {
    // console.log(fdata);
    if (fdata.firstName == '' ||
        fdata.lastName == '' ||
        fdata.password == '' ||
        fdata.cpassword == '' ||
        fdata.email == '' ||
        fdata.gender == '' ||
        fdata.phoneNumber == '' ||
        fdata.job == '' ||
        fdata.height == '' ||
        fdata.health == '') {
        setErrormsg('All fields are required');
        return;
    }
    else {
        if (fdata.password != fdata.cpassword) {
            setErrormsg('Password and Confirm Password must be same');
            return;
        }
        else {
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
                .then(res => res.json()).then(
                    data => {
                        // console.log(data);
                        if (data.error === 'Invalid Credentials') {
                            // alert('Invalid Credentials')
                            setErrormsg('Invalid Credentials')
                        }
                      
                    }
                )
        }
    }

}

  return (
    <View>
                    {
                        errormsg ? <Text >{errormsg}</Text> : null
                    }
     <Field placeholder="First Name" keyboardType={"Text"}  onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, firstName: text })}  />
     <Field placeholder="Last Name" keyboardType={"Text"}  onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, lastName: text })}  />
      <Field placeholder="Email" keyboardType={"email-adress"}    onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}   />
      <Field placeholder="Phone Number" keyboardType={"Number"}  onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, phoneNumber: text })} />
     
     <Field placeholder="job" keyboardType={"Number"}  onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, job: text })} /> 
     <Field placeholder="gender" keyboardType={"Number"}  onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, gender: text })} /> 
    <Field placeholder="height" keyboardType={"Number"}  onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, height: text })} /> 
   <Field placeholder="health" keyboardType={"text"}  onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, health: text })} /> 
      <Field placeholder="Password" secureTextEntry={true}  onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, password: text })} />
      <Field placeholder="Confirm Your Password" secureTextEntry={true} onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, cpassword: text })} />
    </View>
  );
}

const styles = StyleSheet.create({});
