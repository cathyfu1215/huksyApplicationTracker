import { View, Text, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import PressableButton from './PressableButton';
import { TextInput } from 'react-native';
import { auth } from '../Firebase/firebaseSetup';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

function Login(props) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [resetEmail, setResetEmail] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   function handleForgetPassword() {
       const emailPattern = /\S+@\S+\.\S+/;
       if (!emailPattern.test(resetEmail)) {
           alert('Email is not in the right format');
           return;
       }
       sendPasswordResetEmail(auth, resetEmail)
           .then(() => {
               alert('Password reset email sent!');
           })
           .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
               alert(errorCode, errorMessage);
           });
   }

   function jumpToSignup() {
       props.navigation.replace('Signup');
   }

   function handleLogin() {
       const emailPattern = /\S+@\S+\.\S+/;
       if (!emailPattern.test(email)) {
           alert('Email is not in the right format');
           return;
       }
       signInWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {
               const user = userCredential.user;
           })
           .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
               console.log(errorCode, errorMessage);
               alert('Invalid email or password, please try again');
           });
   }

   return (
       <View style={{ margin: 10 }}>
           <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>Email Address</Text>
           <TextInput
               style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, height: 40, margin: 10, borderRadius: 10 }}
               value={email}
               onChangeText={(text) => setEmail(text)}
           />
           <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>Password</Text>
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <TextInput
                   style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, height: 40, margin: 10, borderRadius: 10, flex: 1 }}
                   value={password}
                   onChangeText={(text) => setPassword(text)}
                   secureTextEntry={!showPassword}
               />
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                   <Text>{showPassword ? 'Hide' : 'Show'}</Text>
               </TouchableOpacity>
           </View>
           <PressableButton pressedFunction={handleLogin}><Text>Log In</Text></PressableButton>
           <PressableButton pressedFunction={jumpToSignup}><Text>New User? Create an account</Text></PressableButton>
           <View style={{ marginTop: 20, height: '20%' }}>
               <Text style={{ marginVertical: 10, fontWeight: 'bold' }}>Forget Password?</Text>
               <TextInput
                   value={resetEmail}
                   onChangeText={setResetEmail}
                   style={{ borderWidth: 1, borderColor: 'black', height: 40, borderRadius: 10, margin: 10 }}
               />
               <PressableButton pressedFunction={handleForgetPassword}><Text>send reset link</Text></PressableButton>
           </View>
       </View>
   );
}

export default Login;
