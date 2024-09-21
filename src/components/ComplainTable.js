import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { req } from "../axiosReqMethods";
import { useDispatch } from "react-redux";
import { setError } from "../redux/MessageRedux";
import { useNavigate } from "react-router-dom";

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

//status//
const statusColors = {
  pending: { background: "FDF6B2", color: "C6783B" },
  processing: { background: "DEF7EC", color: "87A66E" },
  delivered: { background: "E1EFFE", color: "3F91FA" },
};
const Status = styled.p`
  font-weight: 500;
  margin: 0;
  text-align: center;
  border-radius: 50px;
  background-color: #${({ status }) => statusColors[status]?.background};
  color: #${({ status }) => statusColors[status]?.color};
`;
//status END//

const Image = styled.img`
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    object-position: center`;

const Select = styled.select`
  height: 2rem;
  border-radius: 0.5vmin;
  border: 1px solid lightgrey;
  background-color: #f9fafb;
  padding: 0 0.5rem;
`;
const Options = styled.option``;

function ComplainTable({ orders }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStateChange = async (id, e) => {
    const { value } = e.target;
    try {
      const { data } = await req.put(`/api/complain/update/${id}`, {
        status: value,
      });
      dispatch(setError(data.message));
    //   setOrders((p) =>
    //     p.map((o) => {
    //       if (o._id === id) {
    //         return { ...o, orderStatus: value };
    //       }
    //       return o;
    //     })
    //   );
    } catch (error) {
      dispatch(setError(error.response.data.message));
    }
  };
  return (
    <>
      <TableWrapper>
        <Table>
          <Thead>
            <tr>
              <Td>Complain ID</Td>
              <Td>TIME</Td>
              <Td>ERROR PIC</Td>
              <Td>LIBRARY</Td>
              <Td>PROBLEM STATMENT</Td>
              <Td>MOBILE</Td>
              <Td>STATUS</Td>
              <Td>CHANGE STATUS</Td>
              <Td>ERROR</Td>
            </tr>
          </Thead>
          <Tbody>
            {orders?.map((o) => {
              return (
                <Tr key={o._id}>
                  <Td>
                    <ContentCopyIcon
                      onClick={() => navigator.clipboard.writeText(o._id)}
                    />
                  </Td>
                  <Td>{new Date(o.createdAt).toDateString()}</Td>
                  {/* <Td>{`${o.userInfo.address?.city}, ${o.userInfo.address?.state}`}</Td> */}
                  <Td>
                    <Image src={o.img} />
                  </Td>
                  <Td>{o.lname}</Td>

                  <Td>{o.problemstatement}</Td>
                  <Td>{o.mobilenumber}</Td>
                  <Td><Status status={o.status}>{o.status.charAt(0).toUpperCase() + o.status.slice(1)}</Status></Td>
                  <Td>
                    <Select
                      value={o.status}
                      onChange={(e) => handleStateChange(o._id, e)}
                    >
                      <Options value="pending">Pending</Options>
                      <Options value="processing">Processing</Options>
                      <Options value="delivered">Solved</Options>
                    </Select>
                  </Td>
                      <Td>
                    <RemoveRedEyeOutlinedIcon
                      onClick={() => window.location.href = o.img}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableWrapper>
    </>
  );
}

export default ComplainTable;
