import React, { useState, createContext, useEffect } from "react";
export const CustomerContext = createContext();
import { AxiosPost, AxiosGet, AxiosGetWithParams } from './Axios'

export const CustomerContextProvider = (props) => {
  const [customerData, setCustomerData] = useState([]);
  const [customerFormData, setCustomerFormData] = useState({
    name: "",
    userId: "",
    email: "",
    mobile: "",
    partner: "",
    reseller: "",
    plan: "",
    installationAmt: "",
    securityAmount: "",
    address: "",
    aadharNumber: "",
    aadharFront: { file_name: "", file_url: "" },
    aadharBack: { file_name: "", file_url: "" },
    otherDocType: "Driving License",
    otherDocFront: { file_name: "", file_url: "" },
    otherDocBack: { file_name: "", file_url: "" },
  });

  async function addCustomer(customerData, handleApiRes, handleApiError) {
    await AxiosPost("addCustomer", customerData,
      (apiRes) => {
        handleApiRes(apiRes)
      }, (apiError) => {
        handleApiError(apiError)
      })
  };
  async function getCustomer(data, handleApiRes, handleApiError) {
    console.log(data);
    await AxiosPost("getCustomer", data,
      (apiRes) => {
        handleApiRes(apiRes)
      }, (apiError) => {
        handleApiError(apiError)
      })
  };
  async function getCustomersFilterData(data, handleApiRes, handleApiError) {
    console.log(data);
    await AxiosPost("getCustomersFilterData", data,
      (apiRes) => {
        handleApiRes(apiRes)
      }, (apiError) => {
        handleApiError(apiError)
      })
  };
  async function updateCustomer(data, handleApiRes, handleApiError) {
    console.log(data);
    await AxiosPost("verifyOTP", data,
      (apiRes) => {
        console.log(apiRes);
        handleApiRes(apiRes)
      }, (apiError) => {
        console.log(apiError);
        handleApiError(apiError)
      })
  };
  async function updateEkycCustomerData(data, handleApiRes, handleApiError) {
    console.log(data);
    await AxiosPost("updateCustomer", data,
      (apiRes) => {
        console.log(apiRes);
        handleApiRes(apiRes)
      }, (apiError) => {
        console.log(apiError);
        handleApiError(apiError)
      })
  };
  async function updateCustomerBySelf(data, handleApiRes, handleApiError) {
    console.log(data);
    await AxiosPost("updateCustomerBySelf", data,
      (apiRes) => {
        console.log(apiRes);
        handleApiRes(apiRes)
      }, (apiError) => {
        console.log(apiError);
        handleApiError(apiError)
      })
  };
  async function updateKycStatus(data, handleApiRes, handleApiError) {
    console.log(data);
    await AxiosPost("updateKycStatus", data,
      (apiRes) => {
        console.log(apiRes);
        handleApiRes(apiRes)
      }, (apiError) => {
        console.log(apiError);
        handleApiError(apiError)
      })
  };
  async function getCustomerDetaislForUpdateForm(data, handleApiRes, handleApiError) {
    console.log(data);
    await AxiosGetWithParams("getCustomerDetailsByCustomer", data,
      (apiRes) => {
        console.log(apiRes);
        handleApiRes(apiRes)
      }, (apiError) => {
        console.log(apiError);
        handleApiError(apiError)
      })
  };
  // async function uploadDoc(file, handleApiRes, handleApiError) {
  //   console.log(data);
  //   await AxiosPost("verifyOTP", data,
  //     (apiRes) => {
  //       console.log(apiRes);
  //       handleApiRes(apiRes)
  //     }, (apiError) => {
  //       console.log(apiError);
  //       handleApiError(apiError)
  //     })
  // };

  return <CustomerContext.Provider value={{
    contextData: [customerData, setCustomerData],
    addCustomer: addCustomer,
    getCustomer: getCustomer,
    updateCustomer: updateCustomer,
    customerFormData: customerFormData,
    setCustomerFormData: setCustomerFormData,
    getCustomerDetaislForUpdateForm: getCustomerDetaislForUpdateForm,
    updateKycStatus: updateKycStatus,
    getCustomersFilterData: getCustomersFilterData,
    updateEkycCustomerData: updateEkycCustomerData,
    updateCustomerBySelf: updateCustomerBySelf
  }}>{props.children}</CustomerContext.Provider>;
};
