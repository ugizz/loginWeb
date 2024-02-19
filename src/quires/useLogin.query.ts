import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const QUERY_KEY = "http://localhost:4000/auth/signin";

export const useLoginUser = () => {
  const fetcher = async (
      apiURL: string,
      { arg }: { arg: { id: string; pw: string } }
  ) => {
    return axios
        .post(`${apiURL}`, {
          "address": arg.id,
          "passwd": arg.pw
        })
        .then((res) => {
          console.log(`데이터`,res.data);
          return res.data.accessToken
        })
        .catch(err => {
          console.log(`에러`,err)
          return err.message
        })
  };

  const { trigger, data, error } = useSWRMutation(
    `${QUERY_KEY}`,
    fetcher
  );

  return { trigger, data, error };
  //return useSWRMutation(
    //  `${QUERY_KEY}`,
      //fetcher
  //);
};