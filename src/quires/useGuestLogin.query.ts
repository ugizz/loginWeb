import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const QUERY_KEY = "https://api.ugizz.store/user/signin/guest";

export const useGuestLoginUser = () => {
  const fetcher = async (
      apiURL: string,
      { arg }: { arg: { gid: string | null } }
  ) => {
    return axios
        .post(`${apiURL}`, {
          "guestId": arg.gid
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