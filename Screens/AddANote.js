import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Alert } from 'react-native';
import ImageManager from '../Components/ImageManager';
import SaveButton from '../Components/SaveButton';
import CancelButton from '../Components/CancelButton';
import { auth } from '../Firebase/firebaseSetup';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';
import { addNote } from '../Firebase/firebaseHelper';

function AddANote(props) {
    const [text, setText] = useState('');
    const [imageURI, setImageURI] = useState(null);
    const [noImage, setNoImage] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    async function fetchAndUploadImage() {
        if (!imageURI) {
            console.error("Image URI is null or undefined");
            return null;
        }

        try {
            const response = await fetch(imageURI);
            const blob = await response.blob();

            const imageName = imageURI.substring(imageURI.lastIndexOf('/') + 1);
            const imageRef = ref(storage, `images/${imageName}`);
            const uploadResult = await uploadBytesResumable(imageRef, blob);
            //console.log("Image uploaded successfully: ", uploadResult);

            return uploadResult;
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null;
        }
    }

    const handleSaveNote = () => {
        if (!imageURI && !noImage) {
            Alert.alert(
                "No Image Selected",
                "Please add an image or choose 'No Image for this note' before saving.",
                [{ text: "OK" }]
            );
            return;
        }

        // I add this state to prevent multiple clicks on the save button
        // in a short period of time
        setIsSaving(true);

        if (noImage) {
            addNote(auth.currentUser.uid, props.route.params.jobApplicationRecordId, text, null)
                .then(() => {
                    console.log('note added');
                    props.navigation.goBack();
                })
                .catch((error) => {
                    console.error("Error adding note: ", error);
                })
                .finally(() => {
                    setIsSaving(false);
                });
        } else {
            fetchAndUploadImage().then((uploadResult) => {
                if (uploadResult) {
                    addNote(auth.currentUser.uid, props.route.params.jobApplicationRecordId, text, uploadResult.metadata.fullPath)
                        .then(() => {
                            console.log('note added');
                            props.navigation.goBack();
                        })
                        .catch((error) => {
                            console.error("Error adding note: ", error);
                        })
                        .finally(() => {
                            setIsSaving(false);
                        });
                } else {
                    console.error("uploadResult is undefined or null");
                    setIsSaving(false);
                }
            }).catch((error) => {
                console.error("Error uploading image: ", error);
                setIsSaving(false);
            });
        }
    };

    const handleCancelNote = () => {
        props.navigation.goBack();
    };

    const modifyImageURI = (newURI) => {
        setImageURI(newURI);
    };

    return (
        <View style={{ flex: 1, alignItems: 'stretch' }}>
            <Text style={{ margin: 5, fontWeight: 20, fontWeight: 'bold' }}>Text of the note:</Text>
            <TextInput
                style={{ minHeight: '10%', borderColor: 'grey', borderRadius: 10, borderWidth: 2, margin: 5, padding: 10 }}
                value={text}
                onChangeText={setText}
            />
            <View style={{ minHeight: '15%', borderColor: 'grey', borderRadius: 10, borderWidth: 2, margin: 5 }}>
                <View style={{ marginBottom: 15, padding: 5 }}>
                    <Text style={{ margin: 5, fontSize: 20, fontWeight: 'bold' }}>Add an Image</Text>
                    <Text style={{ fontSize: 12 }}>If you don't want to take a photo, please choose "No Image for this note".</Text>
                </View>
                <ImageManager modifyImageURI={modifyImageURI} chooseNoImage={() => setNoImage(true)} />
            </View>
            {isSaving && (
                <View style={{ alignItems: 'center', margin: 10 }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{ marginTop: 10 }}>Please wait, processing your data...</Text>
                </View>
            )}
            <View style={{ flexDirection: 'row' }}>
                <SaveButton onPress={handleSaveNote} disabled={isSaving || (!imageURI && !noImage)} />
                <CancelButton onPress={handleCancelNote} />
            </View>
        </View>
    );
}

export default AddANote;
