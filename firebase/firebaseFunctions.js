import {
  arrayUnion,
  serverTimestamp,
  doc,
  collection,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { toast } from 'react-toastify';

// email is only passed when handleLoginFirestore is called on user sign up or google authentication
//                                            (can be omitted when function is called on user login)
export const handleLoginFirestore = async (userID, email) => {
  console.log('Handling user login');

  const userRef = doc(db, 'users', userID);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    console.log('Snapshot does exist, updating status to online only');

    // user already exists in DB
    // override status
    const userInfo = {
      lastSeen: serverTimestamp(),
      loginStatus: 'online',
    };
    try {
      await setDoc(userRef, userInfo, {
        merge: true,
      });
    } catch (error) {
      console.error('Error writing user to DB', error);
    }
  } else {
    console.log('Snapshot does not exist, creating new user in DB');

    // user does not exist
    // create user and write info
    const userInfo = {
      email,
      fullName: '',
      jobTitle: '',
      lastSeen: serverTimestamp(),
      loginStatus: 'online',
    };
    try {
      await setDoc(userRef, userInfo, {
        merge: true,
      });
    } catch (error) {
      console.error('Error writing user to DB', error);
    }
  }
};

// when user logs out, update status
export const handleLogoutFirestore = async (userID) => {
  const userInfo = {
    lastSeen: serverTimestamp(),
    loginStatus: 'offline',
  };
  // console.log('user id', userID)
  // console.log('user info', userInfo)
  const userRef = doc(db, 'users', userID);
  try {
    await setDoc(userRef, userInfo, {
      merge: true,
    });
  } catch (error) {
    console.error('Error writing user to DB', error);
  }
};

// set full name of user in user's doc
export const setUserFullNameFirestore = async (userID, fullName) => {
  const userInfo = {
    fullName,
  };
  const userRef = doc(db, 'users', userID);
  try {
    await setDoc(userRef, userInfo, {
      merge: true,
    });
  } catch (error) {
    console.error('Error writing name to DB', error);
  }
};

// set job title of user in user's doc
export const setUserJobTitleFirestore = async (userID, jobTitle) => {
  const userInfo = {
    jobTitle,
  };
  const userRef = doc(db, 'users', userID);
  try {
    await setDoc(userRef, userInfo, {
      merge: true,
    });
  } catch (error) {
    console.error('Error writing job title to DB', error);
  }
};

// create new project file
export const addNewProjectFirestore = async (
  projectTitle,
  adminID,
  adminEmail
) => {
  const projectInfo = {
    projectTitle,
    dateCreated: serverTimestamp(),
    files: [],
    membersID: [adminID],
    membersInfo: {
      [adminID]: {
        email: adminEmail,
        role: 'admin',
      },
    },
  };
  // Add a new document with a generated id
  try {
    const docRef = await addDoc(collection(db, 'projects'), projectInfo);
    return docRef;
  } catch (error) {
    console.error('Error adding document ', error);
  }
};

// create new draft file
export const addNewDraftFirestore = async (fileName, adminID, adminEmail) => {
  const draftInfo = {
    fileName,
    dateCreated: serverTimestamp(),
    lastEdited: serverTimestamp(),
    admin: {
      ID: adminID,
      email: adminEmail,
    },
    targetSeeds: {},
    output: '',
    thumbnailURL: '',
  };
  // Add a new document with a generated id
  try {
    const docRef = await addDoc(collection(db, 'drafts'), draftInfo);
    return docRef;
  } catch (error) {
    console.error('Error adding document ', error);
  }
};

export const addNewFileFirestore = async (
  fileName,
  adminID,
  adminEmail,
  projectID
) => {
  const fileInfo = {
    fileName,
    dateCreated: serverTimestamp(),
    lastEdited: serverTimestamp(),
    editedBy: adminID,
    admin: {
      ID: adminID,
      email: adminEmail,
    },
    targetSeeds: {},
    output: '',
    thumbnailURL: '',
    projectID,

    // members_info: {               _team members structure example_
    //     [member_ID]: {
    //         role: 'editos',
    //         email,
    //     },
    // },                           We need this specific structure for firebase rules. e.g., members_info.member_ID.role == 'editor'
  };
  // Add a new document with a generated id
  try {
    const docRef = await addDoc(collection(db, 'files'), fileInfo);

    const projectRef = doc(db, 'projects', projectID);

    await updateDoc(projectRef, {
      files: arrayUnion(docRef.id),
    });

    return docRef;
  } catch (error) {
    console.error('Error adding document ', error);
  }
};

// export const addFileToUserFirestore = async(uid, fid) => {
//     const userRef = doc(db, 'users', uid);
//     try {
//         await updateDoc(userRef, {
//             files: arrayUnion(fid),
//         });
//     }catch(error) {
//         console.error('Error adding file to user', error)
//     }
// }

export const updateDraftNameFirestore = async (fid, newFileName) => {
  const docRef = doc(db, 'drafts', fid);
  // console.log('updating file name to %s for file %s', newFileName, fid)
  try {
    await updateDoc(docRef, {
      fileName: newFileName,
    });
    const data = (await getDoc(docRef)).data();
    return data?.fileName;
  } catch (error) {
    console.error('Error updating file name', error);
  }
};

export const updateFileNameFirestore = async (fid, newFileName) => {
  const docRef = doc(db, 'files', fid);
  // console.log('updating file name to %s for file %s', newFileName, fid)
  try {
    await updateDoc(docRef, {
      fileName: newFileName,
    });
    const data = (await getDoc(docRef)).data();
    return data?.fileName;
  } catch (error) {
    console.error('Error updating file name', error);
  }
};

//_____________________________________________________________________________

export const addDesignTargetsFirestore = async (fid, targetSeeds, uid) => {
  console.log('Updating design targets', targetSeeds);
  console.log('For file', fid);

  const fileRef = doc(db, 'files', fid);
  // process targetSeeds
  const seeds = {};
  targetSeeds.forEach((element) => {
    seeds[element.seed] = {
      locked: element.locked,
    };
  });

  console.log('seeds after pre processing ', seeds);
  try {
    await updateDoc(fileRef, {
      targetSeeds: {
        ...seeds,
      },
      lastEdited: serverTimestamp(),
      editedBy: uid,
    });
    console.log('updated targets in firestore.');
  } catch (error) {
    console.error('Error writing design target to DB', error);
  }
};

export const updateOutputFirestore = async (zout, fid, uid) => {
  const fileRef = doc(db, 'files', fid);

  try {
    await updateDoc(fileRef, {
      output: JSON.stringify(zout),
      lastEdited: serverTimestamp(),
      editedBy: uid,
    });
  } catch (error) {
    console.error('Error writing design target to DB', error);
  }
};

//______________________________________________________________________

export const joinExistingProjectFirestore = async (uid, email, fid) => {
  // first, get the pid of the file
  const fileRef = doc(db, 'files', fid);
  const fileSnap = await getDoc(fileRef);
  if (!fileSnap.exists()) {
    throw 'File does not exist';
  }
  const pid = fileSnap.data().projectID;

  // then, inside the project, add the team member
  const projectRef = doc(db, 'projects', pid);
  const projectSnap = await getDoc(projectRef);
  const membersID = projectSnap.data().membersID;
  if (membersID.includes(uid)) {
    throw 'You are already a member';
  }

  try {
    await updateDoc(projectRef, {
      [`membersInfo.${uid}`]: {
        email,
        role: 'editor',
      },
      membersID: arrayUnion(uid),
    });
    toast.success('You were added to a project');
    return pid;
  } catch (error) {
    console.error('Error writing design target to DB', error);
  }
};
