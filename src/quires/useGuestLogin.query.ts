import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const QUERY_KEY = "http://localhost:4000/auth/guest/signin";

export const useGuestLoginUser = () => {
  const fetcher = async (
      apiURL: string,
      { arg }: { arg: { gid: string } }
  ) => {
    return axios
        .post(`${apiURL}`, {
          "guestId": arg.gid
        })
        .then((res) => res.data);
  };
  return useSWRMutation(
      `${QUERY_KEY}`,
      fetcher
  );
};