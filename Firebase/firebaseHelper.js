import { database } from "./firebaseSetup";
import { collection, getDoc, addDoc, getDocs, orderBy, query, deleteDoc, doc, updateDoc,setDoc, onSnapshot} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';


// Function to add a new job application to the database
export const addJobApplication = async (uid,companyName, positionName, preferenceScore, status, date) => {
    try {
      const applicationDate = Timestamp.fromDate(new Date(date));
      await addDoc(collection(database,'users',uid,'jobApplicationRecords'), {
        companyName,
        positionName,
        preferenceScore,
        status,
        date: applicationDate,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

// Function to get all job applications from the database
// Trying to use onSnapshot instead of getDocs to get real-time updates

// Document: You can listen to a document with the onSnapshot() method. 
// An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. 
// Then, each time the contents change, another call updates the document snapshot.

export const fetchJobApplications = (uid, setData) => {
  try {
    const q = query(collection(database, 'users', uid, 'jobApplicationRecords'), orderBy('date', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const jobApplications = [];
      querySnapshot.forEach((doc) => {
        jobApplications.push({ id: doc.id, ...doc.data() });
      });
      setData(jobApplications);
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};






  // Function to delete a job application from the database
  export const deleteJobApplication = async (uid,id) => {
    try {
      await deleteDoc(doc(database,'users',uid,'jobApplicationRecords', id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

// Function to update a job application in the database
export const updateJobApplication = async (uid,id, companyName, positionName, preferenceScore, status, date) => {
  try {
    const applicationDate = Timestamp.fromDate(new Date(date));
    await updateDoc(doc(database,'users',uid,'jobApplicationRecords', id), {
      companyName,
      positionName,
      preferenceScore,
      status,
      date: applicationDate,
    });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};



// Function to add a new user to the database
export const addUser = async (userEmail,uid,nickname,pic) => {
  
    const name=nickname?nickname:'default name';
    const profilePicture=pic?pic:null;
    let numJobsSaved=0;
    let numJobsApplied=0;
    let numJobsInterviewed=0;
    let numJobsOffered=0;
    let numJobsRejected=0;
    //badges earned and achievements should also be collections 
    try {   
      await setDoc(doc(database, 'users',uid), {
        // we use setDoc instead of addDoc because we want to specify the document id
        // it should be the same as the auth uid of the same user
        name,
        userEmail,
        profilePicture,
        numJobsSaved,
        numJobsApplied,
        numJobsInterviewed,
        numJobsOffered,
        numJobsRejected,
      });
      console.log("User successfully added!, uid: ",uid);
  } catch (error) {
    console.error("Error adding the user: ", error);
  }
};


export const fetchUser = async (uid) => {
  try {
    // Create a reference to the user document with the provided uid
    const userRef = doc(database, 'users', uid);

    // Fetch the data for the user document
    const querySnapshot = await getDoc(userRef); // Use getDoc for a single document

    // Check if the document exists
    if (querySnapshot.exists) {
      return querySnapshot.data(); // Return the user data
    } else {
      console.warn("User with UID", uid, "not found");
      return null; // Or handle the case where the user is not found
    }
  } catch (error) {
    console.error("Error fetching user: ", error);
  }
};


//use this function to update user's data, for example, # of jobs saved, applied, interviewed, offered, rejected
export const updateUser = async (uid, updatedData) => {
  try {
    const userRef = doc(database, 'users', uid);
    await updateDoc(userRef, updatedData);
    console.log("User successfully updated!, uid: ", uid);
  } catch (error) {
    console.error("Error updating the user: ", error);
  }
};



export const addNote = async (uid, jobApplicationRecordId, text, uri) => {
  try {
    await addDoc(collection(database, 'users', uid, 'jobApplicationRecords', jobApplicationRecordId, 'notes'), {
      text: text,
      uri: uri
    });
  } catch (error) {
    console.error("Error adding note: ", error);
  }
};



// export const fetchNotes = async (uid, jobApplicationRecordId) => {
//   try {
//     const q = query(collection(database, 'users', uid, 'jobApplicationRecords', jobApplicationRecordId, 'notes'));
//     const querySnapshot = await getDocs(q);
//     const notes = [];
//     querySnapshot.forEach((doc) => {
//       notes.push({ id: doc.id, ...doc.data() });
//     });
//     return notes;
//   } catch (error) {
//     console.error("Error fetching documents: ", error);
//     throw error; // Ensure the error is thrown to be caught in the calling function
//   }
// };


// Function to get all notes from the database and sync them in real-time
export const fetchNotes = (uid, jobApplicationRecordId, setData) => {
  try {
    const q = query(collection(database, 'users', uid, 'jobApplicationRecords', jobApplicationRecordId, 'notes'));
    return onSnapshot(q, (querySnapshot) => {
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      setData(notes);
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};




export const deleteNote = async (uid,jobApplicationRecordId,noteid) => {
  try {
    await deleteDoc(doc(database,'users',uid,'jobApplicationRecords', jobApplicationRecordId,'notes',noteid));
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};



// Function for adding a new todo to the database
export const addTodo = async (uid, jobApplicationRecordId, text) => {
  try {
    await addDoc(collection(database, 'users', uid, 'jobApplicationRecords', jobApplicationRecordId, 'todos'), {
      text: text,
    });
  } catch (error) {
    console.error("Error adding todo: ", error);
  }
};

// Function for fetching all todos from the database and sync them in real-time
export const fetchTodos = (uid, jobApplicationRecordId, setData) => {
  try {
    const q = query(collection(database, 'users', uid, 'jobApplicationRecords', jobApplicationRecordId, 'todos'));
    return onSnapshot(q, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() });
      });
      setData(todos);
    });
  } catch (error) {
    console.error("Error fetching Todos: ", error);
  }
};

// Function for deleting a todo from the database
export const deleteTodo = async (uid,jobApplicationRecordId,todoid) => {
  try {
    await deleteDoc(doc(database,'users',uid,'jobApplicationRecords', jobApplicationRecordId,'todos',todoid));
    console.log("Todo successfully deleted!");
  } catch (error) {
    console.error("Error deleting Todo: ", error);
  }
};


// Function to update the todo item in the database
export const updateTodo = async (uid, jobApplicationRecordId, todoId, checked) => {
  try {
    const todoRef = doc(database, 'users', uid, 'jobApplicationRecords', jobApplicationRecordId, 'todos', todoId);
    await updateDoc(todoRef, {
      checked: checked,
    });
    console.log(`Todo with id: ${todoId} updated to checked: ${checked}`);
  } catch (error) {
    console.error('Error updating todo: ', error);
  }
};