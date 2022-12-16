import React, { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const initialState = {
  name: '',
  gender: '',
  marital: '',
  dateOfBirth: '',
  contact: '',
  occupation: '',
  numberOfChildren: '',
  spouseName: '',
  spouseContact: '',
  group: '',
  education: '',
  baptism: '',
  location: '',
  digitalAdd: '',
  father: '',
  mother: '',
  nextPerson: '',
  nextPersonContact: '',
  nameOfLeader: '',
  lifeFather: '',
  lifeMother: '',
};

const Add = () => {
  const [state, setState] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    name,
    gender,
    marital,
    dateOfBirth,
    contact,
    occupation,
    numberOfChildren,
    spouseName,
    spouseContact,
    group,
    education,
    baptism,
    location,
    digitalAdd,
    father,
    mother,
    nextPerson,
    nextPersonContact,
    nameOfLeader,
    lifeFather,
    lifeMother,
  } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name &&gender &&marital &&dateOfBirth &&contact &&occupation &&numberOfChildren &&spouseName &&spouseContact &&group &&education &&baptism &&location &&digitalAdd &&father &&mother &&nextPerson &&nextPersonContact &&nameOfLeader &&lifeFather &&lifeMother){
      if (!id) {
        try {
          await addDoc(collection(db, 'members'), {
            ...state,
            timestamp: serverTimestamp(),
          });
          toast.success('Member created successfully');
        } catch (error) {
          console.log(error);
        }   
      } else {
        try {
          await updateDoc(doc(db, 'members', id), {
            ...state,
            timestamp: serverTimestamp(),
          });
          toast.success('Member updated successfully');
        } catch (error) {
          console.log(error);
        } 
      }
    } else {
      toast.error("Something went wrong");
    }
    navigate('/members_and_families');
  };


  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info('Upload completed can now submit member');
            setState((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getMemberDetails();
    // eslint-disable-next-line 
  }, [id]);

  const getMemberDetails = async () => {
    const memRef = doc(db, 'members', id);
    const snapshot = await getDoc(memRef);
    if (snapshot.exists()) {
      setState({...snapshot.data()});
    }
  }

  return (
    <AddWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            value={name || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="gender"
            id="gender"
            placeholder="Gender"
            value={gender || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="marital"
            id="marital"
            placeholder="Marital Status (Single / Married)"
            value={marital || ''}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={dateOfBirth || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="contact"
            id="contact"
            placeholder="Personal Contact"
            value={contact || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="occupation"
            id="occupation"
            placeholder="Your Occupation"
            value={occupation || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="numberOfChildren"
            id="numberOfChildren"
            placeholder="Number Of Children"
            value={numberOfChildren || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="spouseName"
            id="spouseName"
            placeholder="Name Of Spouse"
            value={spouseName || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="spouseContact"
            id="spouseContact"
            placeholder="Spouse Contact"
            value={spouseContact || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="group"
            id="group"
            placeholder="Family Name (Group)"
            value={group || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="education"
            id="education"
            placeholder="Education Background"
            value={education || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="baptism"
            id="baptism"
            placeholder="Baptism Status (Yes / No)"
            value={baptism || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            value={location || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="digitalAdd"
            id="digitalAdd"
            placeholder="Digital Address"
            value={digitalAdd || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="father"
            id="father"
            placeholder="Father's Name"
            value={father || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="mother"
            id="mother"
            placeholder="Mother's Name"
            value={mother || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="nextPerson"
            id="nextPerson"
            placeholder="Next Person To Contact Info"
            value={nextPerson || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="nextPersonContact"
            id="nextPersonContact"
            placeholder="Next Person Contact Number"
            value={nextPersonContact || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="nameOfLeader"
            id="nameOfLeader"
            placeholder="Name Of Leader (Family)"
            value={nameOfLeader || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lifeFather"
            id="lifeFather"
            placeholder="Father (Alive or Dead)"
            value={lifeFather || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lifeMother"
            id="lifeMother"
            placeholder="Mother (Alive or Dead)"
            value={lifeMother || ''}
            onChange={handleInputChange}
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <input
          type="submit"
          value={id ? "Update Member" : "Add Member"}
          disabled={progress !== null && progress > 100}
          className="button"
        />
      </form>
    </AddWrapper>
  );
};

const AddWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  box-shadow: 0 0 10px rgba(0, 11, 41, 0.123);
  width: 90%;
  margin: 20px auto;

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    place-items: center;
    width: 98%;

    input {
      background: rgba(11, 25, 150, 0.068);
      padding: 10px 8px;
      margin: 5px 0;
      width: 100%;
      font-size: 16px;
      text-transform: capitalize;

      ::placeholder {
        font-size: 15px;
        font-weight: 600;
        text-transform: uppercase;
      }
    }

    .button {
      padding: 10px 8px;
      cursor: pointer;
      margin: 0 auto;
      width: 100%;
      background: rgb(11, 209, 37);
      font-size: 20px;
      font-weight: 600;
      color: #fff;

      &:hover {
        background: rgb(6, 189, 30);
      }
    }

    .closeBox {
      padding: 8px 8px;
      cursor: pointer;
      color: #fff;
      text-align: center;
      margin: 0 auto;
      width: 100%;
      background: rgb(224, 7, 7);
      font-size: 20px;
      font-weight: 600;
    }
  }

  @media screen and (max-width: 768px) {
    width: 98%;
    form {
      grid-template-columns: 1fr;
      gap: 5px;
      width: 96%;
    }
    input {
      margin: 8px 0;
      padding: 13px 8px;
      font-size: 16px;

      ::placeholder {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
`;

export default Add;
