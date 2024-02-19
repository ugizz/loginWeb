import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const QUERY_KEY = "http://localhost:4000/auth/guest/signup";

export const useGuestSignUpUser = () => {
  const fetcher = async (
      apiURL: string,
      { arg }: { arg: { gid: string; nick: string } }
  ) => {
    return axios
        .post(`${apiURL}`, {
          "guestId": arg.gid,
          "nickname": arg.nick
        })
        .then((res) => {
          console.log(res.data);
          return res.data})
          .catch(err=>{
            console.log(err);
          });
  };
  return useSWRMutation(
      `${QUERY_KEY}`,
      fetcher
  );
};

