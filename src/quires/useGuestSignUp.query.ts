import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const QUERY_KEY = "https://api.ugizz.store/auth/guest/signup";

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
          console.log(`데이터`,res.data);
          return res.data
        })
        .catch(err => {
          console.log(`에러`,err)
          return err
        })
  };

  const { trigger, data, error } = useSWRMutation(
    `${QUERY_KEY}`,
    fetcher
  );

  return { trigger, data, error };
};

