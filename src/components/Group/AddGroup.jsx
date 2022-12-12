import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FaCamera } from 'react-icons/fa';
const initialState = {
  groupName: '',
  groupLeader: '',
  groupDesc: '',
};

const Add = () => {
  const [state, setState] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(false);
  const navigate = useNavigate();
  const { groupName, groupLeader, groupDesc } = state;

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
            toast.info('Upload completed can now submit group');
            setState((prev) => ({ ...prev, grpImg: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupName && groupLeader && groupDesc) {
      try {
        await addDoc(collection(db, 'groups'), {
          ...state,
          timestamp: serverTimestamp(),
        });
        toast.success('Member created successfully');
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error('Something went wrong');
    }
    navigate('/members_and_families');
  };
  return (
    <AddWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="groupName"
            id="groupName"
            placeholder="Enter Group Name"
            value={groupName || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="groupLeader"
            id="groupLeader"
            placeholder="Enter Group Leader Name"
            value={groupLeader || ''}
            onChange={handleInputChange}
          />
          <input
            name="groupDesc"
            id="groupDesc"
            placeholder='The Biblical Meaning of Your Group'
            value={groupDesc || ''}
            onChange={handleInputChange}
          />
          <input
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="add">
            <FaCamera />
            <h3>Add Group Picture</h3>
          </label>
        </div>
        <input
          type="submit"
          value="Submit"
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
    place-items: center;
    width: 68%;

    input,
    textarea {
      background: rgba(11, 25, 150, 0.068);
      padding: 15px 8px;
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

    .add {
      background: rgba(255, 0, 0, 0.034);
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px;
      cursor: pointer;
    }

    .button {
      padding: 10px 8px;
      cursor: pointer;
      margin: 20px auto;
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
