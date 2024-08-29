import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import PressableButton from './PressableButton';
import { auth } from '../Firebase/firebaseSetup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addUser } from '../Firebase/firebaseHelper';

function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    return (
        <View style={{ margin: 10 }}>
            <Text style={{marginVertical:10, fontWeight:'bold'}}>Email Address</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, height: 40, borderRadius: 10 }}
                onChangeText={(text) => { setEmail(text) }}
                value={email}
            />
            <Text style={{marginVertical:10, fontWeight:'bold'}}>Password</Text>
            <Text style={{ margin: 5 }}>A strong password will contain at least an uppercase, a lowercase, a number, and a special character from "@$!%*?&".</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={{ borderWidth: 1, borderColor: 'black', marginTop: 10,marginRight:10, height: 40, flex: 1, borderRadius: 10 }}
                    onChangeText={(text) => { setPassword(text) }}
                    value={password}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text>{showPassword ? 'Hide' : 'Show'}</Text>
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
                    <Text>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:20}}>
            <PressableButton pressedFunction={handleRegister}><Text>Register</Text></PressableButton>
            <PressableButton pressedFunction={jumpToLogin}><Text>Already Registered? Login</Text></PressableButton>
            </View>
        </View>
    );
}

export default Signup;
