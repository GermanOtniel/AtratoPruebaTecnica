import { getLabelOfDate } from "../util/formattDates";
import { handleFailedResponse } from "../util/handleErrors";
import { axiosInstance } from "./axios";


export const getUsers = async (
  pagination, querySearch, setShowAlert, 
  setTotal, setTotalUsers, setRows
) => {
  const { page, resPerPage } = pagination;
      const { textSearch, statusSearch } = querySearch;
      const usersResponse = await axiosInstance(
        'get',
        `/users/?page=${(page + 1)}&resPerPage=${
          (resPerPage)}&search=${textSearch}&status=${statusSearch}`,
        {},
        setShowAlert,
        false
      );
      if (usersResponse?.code === 200) {
        setTotal(usersResponse.data?.total || 0);
        setTotalUsers(usersResponse.data?.allTotal || 0);
        setRows((usersResponse.data?.rows ? 
          usersResponse.data?.rows.map(user => ({ 
            ...user, 
            full_name: `${
              ((user.first_name ? user.first_name + ' ' : '') || '') + 
              ((user.second_name ? user.second_name + ' ' : '') || '') +
              ((user.first_last_name ? user.first_last_name + ' ' : '') || '') +
              ((user.second_last_name ? user.second_last_name + ' ' : '') || '')
            }`,
            analist: user.analist_id.full_name
          })) : [])
        );
      }
};

export const getOldestUser = async (
  setShowAlert, setOldestUser
) => {
  const oldestUserResponse = await axiosInstance(
    'get', `/users/oldest`, {}, setShowAlert, false
  );
  if (oldestUserResponse?.code === 200) {
    setOldestUser({
      _id: oldestUserResponse.data?.user?._id,
      full_name: `${oldestUserResponse.data?.user?.first_name} ${
        oldestUserResponse.data?.user?.first_last_name
      }`,
      created: getLabelOfDate(oldestUserResponse.data?.user?.created_at)
    });
  }
};

export const createNewUser = async (
  userForm, setShowAlert, setResetComponent, 
  setOpenDialog, resetComponent, setUserFormErrors
) => {
  const userResponse = await axiosInstance(
    'post',
    '/users/',
    { ...userForm },
    setShowAlert,
    true
  );
  if (userResponse?.code === 200) {
    setResetComponent(!resetComponent);
    setOpenDialog(false);
  } else handleFailedResponse(userResponse, setUserFormErrors);
};

export const getAnalysts = async (setShowAlert, setAnalystsOptions) => {
  const analystResponse = await axiosInstance(
    'get',
    '/analysts/',
    {},
    setShowAlert,
    false
  );
  if (analystResponse?.code === 200) {
    setAnalystsOptions(analystResponse.data?.analysts || []);
  }
};

export const getUsersByFilters = async (
  querySearch, setShowAlert, setTotal, 
  setTotalUsers, setRows
) => {
  const { textSearch, statusSearch } = querySearch;
  const filterResults = await axiosInstance(
    'get', 
    `/users/?page=1&resPerPage=10&search=${
      textSearch.trim()}&status=${statusSearch}`,
    {},
    setShowAlert,
    false
  );
  if (filterResults?.code === 200) {
    setTotal(filterResults.data?.total || 0);
    setTotalUsers(filterResults.data?.allTotal || 0);
    setRows((filterResults.data?.rows ? 
      filterResults.data?.rows.map(user => ({ 
        ...user, 
        full_name: `${
          ((user.first_name ? user.first_name + ' ' : '') || '') + 
          ((user.second_name ? user.second_name + ' ' : '') || '') +
          ((user.first_last_name ? user.first_last_name + ' ' : '') || '') +
          ((user.second_last_name ? user.second_last_name + ' ' : '') || '')
        }`,
        analist: user.analist_id.full_name
      })) : [])
    );
  }
};