import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
const LoadUser = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return <div>LoadUser</div>;
};

export default LoadUser;
