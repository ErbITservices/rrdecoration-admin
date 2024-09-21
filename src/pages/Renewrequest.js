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

const Renewrequest = () => {
  const [Library, setLibrary] = useState();
  const [lete, setLete] = useState();
  const getAllLibrary = async () => {
    try {
      const { data } = await axios.get(
        "https://rrdecoration-backend.onrender.com/api/request/"
      );
      console.log("h", data.savedProduct);
      setLibrary(data.savedProduct);
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
                <Td>Library</Td>
                <Td>Service</Td>
                <Td>Name</Td>
                <Td>Mobile</Td>
                <Td>Email</Td>
                <Td>Problem</Td>
              </tr>
            </Thead>
            <Tbody>
              {Library?.map((c) => (
                <Tr key={c._id}>
                  <Td> {c.lname} </Td>
                  <Td>{c.service}</Td>
                  <Td>{c.name}</Td>
                  <Td>{c.mobilenumber}</Td>
                  <Td>{c.email}</Td>
                  <Td>{c.problemstatement}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableWrapper>
    </div>
  );
};

export default Renewrequest;
