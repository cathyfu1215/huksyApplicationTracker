import { View, Text, Alert } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton'
import { TextInput } from 'react-native'
import { useState } from 'react'
import {auth} from '../Firebase/firebaseSetup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { sendPasswordResetEmail } from "firebase/auth";

function Login(props) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const [resetEmail, setResetEmail] = useState('');

    function handleForgetPassword(){
       
        const emailPattern = /\S+@\S+\.\S+/;
        
        if(!emailPattern.test(resetEmail)){
            alert('Email is not in the right format');
            return;
        }
        sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
            // Password reset email sent!
            // ..
            alert('Password reset email sent!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorCode,errorMessage);
        });
    }

    function jumpToSignup(){
        props.navigation.replace('Signup');
        // we don't need to put another screen to the stack
    }
    function handleLogin(){
        console.log('login');

        const emailPattern = /\S+@\S+\.\S+/;
        
        if(!emailPattern.test(email)){
            alert('Email is not in the right format');
            return;
        }
    
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('user signed in',user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode,errorMessage);
            });
    }
  return (
    <View style={{margin:10}}>
        <Text>log in</Text>
        <Text>Email Address</Text>
        <TextInput style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%',margin:10}}
        value={email} onChangeText={(text)=>setEmail(text)}/>
        <Text>Password</Text>
        <TextInput  style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%',margin:10}}
        value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry={true}/>
        <PressableButton pressedFunction={handleLogin}><Text>Log In</Text></PressableButton>
        <PressableButton pressedFunction={jumpToSignup}><Text>New User? Create an account</Text></PressableButton>
        <View style={{marginTop:20,height:'20%'}}>
        <Text>Forget Password?</Text>
        <TextInput  value={resetEmail} onChangeText={setResetEmail} style={{borderWidth: 1, borderColor: 'black',height:'60%',margin:10}}/>
        <PressableButton pressedFunction={handleForgetPassword}><Text>send reset link</Text></PressableButton>
        </View>
        
    </View>
  )
}

export default Login