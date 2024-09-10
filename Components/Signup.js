// The sign up screen, where the user can enter their email and password to create an account.
// It also contains the logic of verifying the email address is valid,  password matches confirm password, and the password is strong enough.
// It gives recommendations to the user how to set a strong password.


import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import PressableButton from './PressableButton';
import { auth } from '../Firebase/firebaseSetup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addUser } from '../Firebase/firebaseHelper';
import Ionicons from '@expo/vector-icons/Ionicons';

function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPasswordHint, setShowPasswordHint] = useState(false);

    function jumpToLogin() {
        props.navigation.replace('Login');
    }

    async function handleAddUserDocument(email, uid, name, pic) {
        addUser(email, uid, name, pic)
            .then(() => {
                console.log('user added to the database', email);
            })
            .catch((error) => {
                console.log('error adding user to the database', error);
            });
    }

    async function handleRegister() {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!password.match(pattern)) {
            alert('Password should contain at least one uppercase letter, one lowercase letter, one number, one special character in "@$!%*?&", and should be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            alert('Password should be at least 6 characters');
            return;
        }

        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            alert('Email is not in the right format');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                handleAddUserDocument(email, user.uid, auth.displayName, auth.photoURL);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
            });

            
    }

    function togglePasswordHint() {
        setShowPasswordHint(!showPasswordHint);
    }

    return (
        <View style={{ margin: 10 }}>
            <Text style={{marginVertical:10, fontWeight:'bold'}}>Email Address</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, height: 40, borderRadius: 10 }}
                onChangeText={(text) => { setEmail(text) }}
                value={email}
            />
            <Text style={{marginVertical:10, fontWeight:'bold'}}>Password</Text>
            <PressableButton pressedFunction={togglePasswordHint} style={{marginTop:10}}><Text>How to Create a Strong Password?</Text></PressableButton>
                {showPasswordHint && (
                    <Text style={{ margin: 10, color: 'blue' }}>
                        A strong password should contain at least one uppercase letter, one lowercase letter, one number, and one special character from '@$!%*?&', and should be at least 6 characters long.
                        </Text>)}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={{ borderWidth: 1, borderColor: 'black', marginTop: 10,marginRight:10, height: 40, flex: 1, borderRadius: 10 }}
                    onChangeText={(text) => { setPassword(text) }}
                    value={password}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text>{showPassword ? <Ionicons name="eye-off" size={24} color="black" />: <Ionicons name="eye" size={24} color="black" />}</Text>
                </TouchableOpacity>
            </View>
            <Text style={{marginVertical:10}}>Confirm Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, height: 40,marginRight:10,  flex: 1, borderRadius: 10 }}
                    onChangeText={(text) => { setConfirmPassword(text) }}
                    value={confirmPassword}
                    secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Text>{showConfirmPassword ? <Ionicons name="eye-off" size={24} color="black" />: <Ionicons name="eye" size={24} color="black" />}</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:20}}>
            <View>
            <View>
            <PressableButton pressedFunction={handleRegister}><Text>Register</Text></PressableButton>
            </View>
            <View style={{marginTop:10}}>
            <PressableButton pressedFunction={jumpToLogin}><Text>Already Registered? Login</Text></PressableButton>
            </View>
            </View>
            </View>
        </View>
    );
}

export default Signup;
