import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const QUERY_KEY = "https://api.ugizz.store/auth/check-nickname/";

export const useCheckNickName = () => {
  const fetcher = async (
    apiURL: string,
    { arg }: { arg: { nick: string } }
) => {
  return axios
      .get(`${apiURL}${arg.nick}`)

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