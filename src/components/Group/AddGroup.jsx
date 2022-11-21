import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import fireDb from '../../firebase';
const initialState = {
  groupName: '',
  groupLeader: '',
  groupContact: '',
  groupDesc: '',
};

const AddGroup = () => {
  const [state, setState] = useState(initialState);
  const [group, setGroup] = useState({});
  const navigate = useNavigate();
  const { groupName, groupLeader, groupContact, groupDesc } = state;

  const { id } = useParams();

  useEffect(() => {
    fireDb.child('groups').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setGroup({ ...snapshot.val() });
      } else {
        setGroup({});
      }
    });

    return () => {
      setGroup({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...group[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, group]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName || !groupLeader || !groupContact || !groupDesc) {
      toast.error('Please provide value to each input field');
    } else {
      if (!id) {
        fireDb.child('groups').push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Group Added Successfully!');
          }
        });
      } else {
        fireDb.child(`groups/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Group Updated Successfully!');
          }
        });
      }
      setTimeout(() => navigate('/members_and_families'), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <AddWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="groupName"
            id="groupName"
            placeholder="Group Name"
            value={groupName || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="groupLeader"
            id="groupLeader"
            placeholder="Group Leader"
            value={groupLeader || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="groupContact"
            id="groupContact"
            placeholder="Group Contact"
            value={groupContact || ''}
            onChange={handleInputChange}
          />
          <textarea
            name="groupDesc"
            id="groupDesc"
            cols="30"
            rows="10"
            value={groupDesc || ''}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="submit"
          value={id ? 'Update Group' : 'Save Group'}
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
  width: 50%;
  margin: 20px auto;

  form {
    width: 98%;

    input,
    textarea {
      resize: none;
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
      background: rgb(209, 100, 11);
      font-size: 20px;
      font-weight: 600;
      color: #fff;

      &:hover {
        background: rgb(224, 68, 6);
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

export default AddGroup;
