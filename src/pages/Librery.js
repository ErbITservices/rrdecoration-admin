import React, { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";
import Addserviceorder from "../components/Addserviceorder";
import Editlibraray from "../components/Editlibraray";

const TableWrapper = styled.div`
  margin-top: 20px;
  overflow: auto;
  border: 1px solid #d5d6d7;
  border-radius: 1vmin;
`;
const Table = styled.table`
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;
  overflow: auto;
`;
const Thead = styled.thead`
  background-color: teal;
  color: white;
`;
const Tbody = styled.tbody`
  background-color: white;

  > :nth-last-child() {
    border-bottom: 2px solid teal;
    background-color: red;
  }
`;
const Td = styled.td`
  padding: 0.6rem 1rem;
  vertical-align: middle;
  margin-top: auto;

  > svg {
    color: rgb(171, 171, 171);
    :hover {
      color: rgb(130, 130, 130);
    }
  }
`;
const Tr = styled.tr`
  border-bottom: 1px solid #d5d6d7;
`;

const Librery = () => {
  const [Library, setLibrary] = useState();
  const [lete, setLete] = useState();
  const getAllLibrary = async () => {
    try {
      const { data } = await axios.get(
        "https://rrdecoration-backend.vercel.app//api/ticket/"
      );
      console.log("h", data);
      setLibrary(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    console.log("mihir");

    getAllLibrary();
  }, []);

  const [edit, setedit] = useState(false);
  const [libraryinfo, setLibraryinfo] = useState();
  const handleedit = (e) => {
    // console.log(e);

    setLibraryinfo(e);
    setedit(true);
  };

  const handledelete = async (e) => {
    console.log(e);
    console.log(lete);

    // e.prieventDefault()
    try {
      await axios.delete(
        `https://rrdecoration-backend.vercel.app//api/ticket/${e}`
      );

      getAllLibrary();
    } catch (error) {}
  };

  return (
    <div>
      <TableWrapper>
        {edit && (
          <Editlibraray
            librarydata={libraryinfo}
            setedit={setedit}
          ></Editlibraray>
        )}
        {!edit && (
          <Table>
            <Thead>
              <tr>
                <Td>library</Td>
                <Td>service</Td>
                <Td>startdate</Td>
                <Td>enddate</Td>
                <Td>AMOUNT</Td>
                <Td>Delete</Td>
                <Td>Edit</Td>
              </tr>
            </Thead>
            <Tbody>
              {Library?.map((c) => (
                <Tr key={c._id}>
                  <Td> {c.lname} </Td>
                  <Td>{c.service}</Td>
                  <Td>{c.startdate}</Td>
                  <Td>{c.enddate}</Td>
                  <Td>{c.amount}</Td>
                  <Td>
                    <button
                      className="delete-btn "
                      onClick={() => {
                        handledelete(c._id);
                      }}
                    >
                      Delete
                    </button>
                  </Td>
                  <Td>
                    <button
                      className="edit-btn "
                      onClick={() => {
                        handleedit(c);
                        setedit(true);
                      }}
                    >
                      Edit
                    </button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableWrapper>
    </div>
  );
};

export default Librery;
