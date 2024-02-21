import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const QUERY_KEY = "https://api.ugizz.store/user/signup";

export const useSignUpUser = () => {
  const fetcher = async (
      apiURL: string,
      { arg }: { arg: { id: string; pw: string, email:string, nick:string } }
  ) => {
    return axios
        .post(`${apiURL}`, {
          "id": arg.id,
          "passwd": arg.pw,
          "email" : arg.email,
          "nickname": arg.nick
        })
        .then((res) => {
          console.log(res.data);
          return res.data})
          .catch(err=>{
            console.log(err);
            return err
          });
  };
  return useSWRMutation(
      `${QUERY_KEY}`,
      fetcher
  );
};

