import React, { useState, createContext, useEffect } from "react";
export const CustomerEkycContext = createContext();
import axios from "axios";
import ApiPaths from "./ApiPaths.json"; //json file containing ApiPaths data


export const CustomerEkycContextProvider = (props) => {
  const url = "admin.tripleplay.in/api/ekycservice.asmx";

  const [customerEKYCData, setCustomerEKYCData] = useState("Datta");
  const [partnerDataList, setPartnerDataList] = useState([]);
  const [partnerListOptionsData, setPartnerListOptionsData] = useState(
    [
      {
        "Title": "M/s",
        "Partner": "10test",
        "Phone": "8689003344",
        "Email": "",
        "GST_Number": "10",
        "Current_Walletbalance": 2591.00
      },
      {
        "Title": "M/s",
        "Partner": "Crossing Republic",
        "Phone": "9818073333",
        "Email": "",
        "GST_Number": "",
        "Current_Walletbalance": 80000.00
      },
      {
        "Title": "M/s",
        "Partner": "Global_Network_Sikanderpur",
        "Phone": "9818073333",
        "Email": "navneet@tripleplay.in",
        "GST_Number": "00000000000",
        "Current_Walletbalance": 0.00
      },
      {
        "Title": "M/s",
        "Partner": "Mann Network",
        "Phone": "8076945454",
        "Email": "",
        "GST_Number": "",
        "Current_Walletbalance": 37900.00
      },
      {
        "Title": "M/s",
        "Partner": "Noida Partners",
        "Phone": "7703954008",
        "Email": "",
        "GST_Number": "",
        "Current_Walletbalance": 0.00
      },
      {
        "Title": "M/s",
        "Partner": "operations Test",
        "Phone": "7703954008",
        "Email": "",
        "GST_Number": "tpoperations",
        "Current_Walletbalance": 86.00
      },
      {
        "Title": "M/s",
        "Partner": "Sai Cable Network(Shiv Murti)",
        "Phone": "9643636328",
        "Email": "",
        "GST_Number": "00",
        "Current_Walletbalance": 0.00
      },
      {
        "Title": "M/s",
        "Partner": "Suncity_Interacitve",
        "Phone": "987654321",
        "Email": "",
        "GST_Number": "",
        "Current_Walletbalance": 0.00
      },
      {
        "Title": "M/s",
        "Partner": "Test-Partner",
        "Phone": "9212360603",
        "Email": "",
        "GST_Number": "admin@admin.com",
        "Current_Walletbalance": 4933.00
      },
      {
        "Title": "M/s",
        "Partner": "Tripleplay Interactive Network Pvt Ltd",
        "Phone": "1244900200",
        "Email": "",
        "GST_Number": "",
        "Current_Walletbalance": 4405098.97
      },
      {
        "Title": "M/s",
        "Partner": "Tripleplay Interactive Network Pvt Ltd-2nd",
        "Phone": "1244900200",
        "Email": "",
        "GST_Number": "",
        "Current_Walletbalance": 11.70
      },
      {
        "Title": "M/s",
        "Partner": "Tripleplay Interactive Network Pvt Ltd-3rd",
        "Phone": "1244900200",
        "Email": "",
        "GST_Number": "",
        "Current_Walletbalance": 7411.70
      },
      {
        "Title": "M/s",
        "Partner": "Tripleplay Interactive Network Pvt Ltd-4th",
        "Phone": "9999999999",
        "Email": "",
        "GST_Number": "",
        "Current_Walletbalance": 0.00
      },
      {
        "Title": "M/s",
        "Partner": "Tripleplay Interactive Noida/Ghaziabad",
        "Phone": "1244900200",
        "Email": "",
        "GST_Number": "",
        "Current_Walletbalance": 1562244.94
      },
      {
        "Title": "M/s",
        "Partner": "Tripleplay_Broadband_Sirsa",
        "Phone": "9255900143",
        "Email": "tripleplaysirsa@gmail.com",
        "GST_Number": "",
        "Current_Walletbalance": 0.00
      },
      {
        "Title": "M/s",
        "Partner": "Tripleplay_Gurgaon",
        "Phone": "9999999999",
        "Email": "",
        "GST_Number": "",
        "Current_Walletbalance": 79573.70
      }
    ]
  );

  const [resellerListOptionsData, setResellerListOptionsData] = useState([
    {
      "TITAL": "M/s",
      "Reseller": "4Gplus Broadband",
      "Address": "Hyatpur Chwowk Sector-90 Gurgaon",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9811454286",
      "Email": "",
      "Current_Walletbalance": 26565.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "A V India (445)",
      "Address": "Near Capiltal Mall Shop No-2  Samtal Zone Market Bhiwadi",
      "City": "Alwar",
      "State": "Rajasthan",
      "Phone": "9667026731",
      "Email": "avbhiwadi@gmail.com",
      "Current_Walletbalance": 155896.78
    },
    {
      "TITAL": "M/s",
      "Reseller": "ANK Network",
      "Address": "Dada Risal Singh Market, Vpo Basai, Sec 9/10 Chowk",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9582689151",
      "Email": "",
      "Current_Walletbalance": 0.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "BPTP",
      "Address": "Sector 70",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "7835029231",
      "Email": "",
      "Current_Walletbalance": 455226.18
    },
    {
      "TITAL": "M/s",
      "Reseller": "DLF_The_Crest",
      "Address": "",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9999999999",
      "Email": "",
      "Current_Walletbalance": 0.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "Globel Digital Network",
      "Address": "Sector 1 Manesar",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9891581410",
      "Email": "",
      "Current_Walletbalance": 262.92
    },
    {
      "TITAL": "M/s",
      "Reseller": "ITHUM",
      "Address": "The Corenthum Sector 62A40 The ITHUM and A 41 Adjoining The Corenthum Sector 62",
      "City": "Ghaziabad",
      "State": "Uttar Pradesh",
      "Phone": "9999999999",
      "Email": "ithum@gmail.com",
      "Current_Walletbalance": 4091303.05
    },
    {
      "TITAL": "M/s",
      "Reseller": "Mann Network",
      "Address": "Village Silokhra",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "8076945454",
      "Email": "",
      "Current_Walletbalance": 30200.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "Netcrome IT Solution",
      "Address": "H.No-1574 Basement Sec-15 Part-2 ",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9211438999",
      "Email": "netcrome@hotmail.com",
      "Current_Walletbalance": 4869416.18
    },
    {
      "TITAL": "M/s",
      "Reseller": "Royal Broadband(Jaypee)",
      "Address": "Jaypee Kosmos",
      "City": "Ghaziabad",
      "State": "Uttar Pradesh",
      "Phone": "7835029278",
      "Email": "",
      "Current_Walletbalance": 16406.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "Sangam Cable",
      "Address": "Shop no-1011, Shiv Mkt behind unitech cyber park Jharsa",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "7065599410",
      "Email": "krishsaini18@gmail.com",
      "Current_Walletbalance": 905360.73
    },
    {
      "TITAL": "M/s",
      "Reseller": "Sanjay Internet",
      "Address": "336,Sec-6,Daruheda",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "7835029911",
      "Email": "sanjayhans741@gmail.com",
      "Current_Walletbalance": 41509.40
    },
    {
      "TITAL": "M/s",
      "Reseller": "Satyam Cable TV",
      "Address": "South City",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9311610609",
      "Email": "",
      "Current_Walletbalance": 468352.12
    },
    {
      "TITAL": "M/s",
      "Reseller": "Sector 5",
      "Address": "Galleria Market DLF Phase 4",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9212360603",
      "Email": "",
      "Current_Walletbalance": 189758.32
    },
    {
      "TITAL": "M/s",
      "Reseller": "Shyam Technologies",
      "Address": "342/12A ,Krishna Colony Sector-7",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9999820134",
      "Email": "",
      "Current_Walletbalance": 0.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "Suncity",
      "Address": "",
      "City": "Guragaon",
      "State": "",
      "Phone": "9212927100",
      "Email": "",
      "Current_Walletbalance": 33633.46
    },
    {
      "TITAL": "M/s",
      "Reseller": "Suspense Reseller",
      "Address": "",
      "City": "",
      "State": "Haryana",
      "Phone": "7703954008",
      "Email": "",
      "Current_Walletbalance": 0.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "Tripelplay Manesar FTTH",
      "Address": "Galleria Market Basement DLF City Phase 4\t",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9818073333",
      "Email": "",
      "Current_Walletbalance": 0.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "Tripleplay Badshahpur(Dist)",
      "Address": "Badshahpur Sector 70 A",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9953119938",
      "Email": "",
      "Current_Walletbalance": 27035.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "Tripleplay Balaji Internet",
      "Address": "Galleria Market,Basement DLF Phase IV",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9818073333",
      "Email": "customercare@tripleplay.in",
      "Current_Walletbalance": 31.30
    },
    {
      "TITAL": "M/s",
      "Reseller": "Tripleplay Manesar",
      "Address": "galleria market Basement DLF Phase IV ",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9818073333",
      "Email": "",
      "Current_Walletbalance": 443169.06
    },
    {
      "TITAL": "M/s",
      "Reseller": "Tripleplay Mapsko",
      "Address": "342/12A ,Krishna Colony Sector-7",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "7703954008",
      "Email": "",
      "Current_Walletbalance": 100403.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "Tripleplay Sector 17",
      "Address": "Bittu Sachdeva Office, Sector 17",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "981807333",
      "Email": "",
      "Current_Walletbalance": 83056.00
    },
    {
      "TITAL": "M/s",
      "Reseller": "Tripleplay Sector 38",
      "Address": "Pathiya Nr Shiv Mandir Jharsa Sector 39",
      "City": "",
      "State": "Haryana",
      "Phone": "9212590317",
      "Email": "rakeshthakran776@gmail.com",
      "Current_Walletbalance": 9413.59
    },
    {
      "TITAL": "M/s",
      "Reseller": "Tripleplay_Daruhera",
      "Address": "",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9999999999",
      "Email": "",
      "Current_Walletbalance": 428248.36
    },
    {
      "TITAL": "M/s",
      "Reseller": "Vikas Cable Network",
      "Address": "New Bus Stand, Dharuhera",
      "City": "Gurgaon",
      "State": "Haryana",
      "Phone": "9812015960",
      "Email": "premchandcable@gmail.com",
      "Current_Walletbalance": 14050.56
    }
  ]);
  const [planListOptionsData, setPlanListOptionsData] = useState([
    {
      "Plan": "10testt",
      "RetailerPrice": 3.00,
      "OfferPrice": 5.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN_100Mbps_Combo",
      "RetailerPrice": 750.00,
      "OfferPrice": 885.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN_4G_2Mbps_UN",
      "RetailerPrice": 700.00,
      "OfferPrice": 700.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN_F_2Mbps_UN",
      "RetailerPrice": 975.00,
      "OfferPrice": 975.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN_4G_5Mbps_UN",
      "RetailerPrice": 900.00,
      "OfferPrice": 900.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN_5MB_100GB",
      "RetailerPrice": 708.00,
      "OfferPrice": 708.00,
      "VOLUME_QUOTA": 107374182400,
      "TIME_QUOTA": null,
      "Validity": 223948800000
    },
    {
      "Plan": "TPIN_4G_10Mbps_UN",
      "RetailerPrice": 1000.00,
      "OfferPrice": 1000.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN_10Mbps _50Gb_2Mbps",
      "RetailerPrice": 708.00,
      "OfferPrice": 708.00,
      "VOLUME_QUOTA": 53687091200,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN 10Mbps 100Gb 2Mbps",
      "RetailerPrice": 1180.00,
      "OfferPrice": 1180.00,
      "VOLUME_QUOTA": 107374182400,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN 10Mbps 175Gb",
      "RetailerPrice": 2124.00,
      "OfferPrice": 2124.00,
      "VOLUME_QUOTA": 187904819200,
      "TIME_QUOTA": null,
      "Validity": 20155392000000
    },
    {
      "Plan": "TPIN 10Mbps 300Gb",
      "RetailerPrice": 3894.00,
      "OfferPrice": 3894.00,
      "VOLUME_QUOTA": 322122547200,
      "TIME_QUOTA": null,
      "Validity": 40310784000000
    },
    {
      "Plan": "TPIN 10Mbps 600Gb",
      "RetailerPrice": 7079.00,
      "OfferPrice": 7078.82,
      "VOLUME_QUOTA": 644245094400,
      "TIME_QUOTA": null,
      "Validity": 967458816000000
    },
    {
      "Plan": "TPIN_4G_20Mbps_UN",
      "RetailerPrice": 1300.00,
      "OfferPrice": 1300.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN 20Mbps 100Gb 2Mbps",
      "RetailerPrice": 1475.00,
      "OfferPrice": 1475.00,
      "VOLUME_QUOTA": 107374182400,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "Triple_40Mbps@399",
      "RetailerPrice": 470.82,
      "OfferPrice": 470.82,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN_50Mbps_UN",
      "RetailerPrice": 2655.00,
      "OfferPrice": 2655.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 223948800000
    },
    {
      "Plan": "Triple_50Mbps@530",
      "RetailerPrice": 529.82,
      "OfferPrice": 529.82,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "Triple_50Mbps@531",
      "RetailerPrice": 531.00,
      "OfferPrice": 531.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN 50Mbps 100Gb 2Mbps",
      "RetailerPrice": 2065.00,
      "OfferPrice": 2065.00,
      "VOLUME_QUOTA": 107374182400,
      "TIME_QUOTA": null,
      "Validity": 223948800000
    },
    {
      "Plan": "TPIN_100Mbps_Gold",
      "RetailerPrice": 3540.00,
      "OfferPrice": 3540.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "Triple_100Mbps@600",
      "RetailerPrice": 708.00,
      "OfferPrice": 708.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "TPIN 100Mbps 100GB 2Mbps",
      "RetailerPrice": 2360.00,
      "OfferPrice": 2360.00,
      "VOLUME_QUOTA": 107374182400,
      "TIME_QUOTA": null,
      "Validity": 223948800000
    },
    {
      "Plan": "Triple_200Mbps@750",
      "RetailerPrice": 885.00,
      "OfferPrice": 885.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "Triple_300Mbps@1000",
      "RetailerPrice": 1180.00,
      "OfferPrice": 1180.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "Triple_300Mbps@750",
      "RetailerPrice": 885.00,
      "OfferPrice": 885.00,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    },
    {
      "Plan": "Triple_300Mbps@999",
      "RetailerPrice": 1178.82,
      "OfferPrice": 1178.82,
      "VOLUME_QUOTA": null,
      "TIME_QUOTA": null,
      "Validity": 6718464000000
    }
  ]);

  const [partnerListOptions, setPartnerListOptions] = useState();
  const [resellerListOptions, setResellerListOptions] = useState();
  const [planListOptions, setPlanListOptions] = useState();
  const requestObj = {
    requestDate: "2002-05-30T09:00:00",
    extTransactionId: "-99999",
    systemId: "tpoperations",
    password: "Jass@19931993@"
  };

  useEffect(() => {
    // getPartnerListOptions()
    // getResellerListOptions()
    // getPlanListOptions()
    getPartner()
    getReseller()
    getPlan()
  }, [])

  // const getPartnerListOptions = () => {
  //   const list = partnerListOptionsData.map(d => ({
  //     value: d.Partner,
  //     label: d.Title + " " + d.Partner,
  //   }))
  //   setPartnerListOptions(list)
  // }
  // const getResellerListOptions = () => {
  //   const list = resellerListOptionsData.map(d => ({
  //     value: d.Reseller,
  //     label: d.TITAL + " " + d.Reseller,
  //   }))
  //   setResellerListOptions(list)
  // }
  // const getPlanListOptions = () => {
  //   const list = planListOptionsData.map(d => ({
  //     value: d.Plan,
  //     label: d.Plan,
  //   }))
  //   setPlanListOptions(list)
  // }


  //todo apply with live api
  const getPartnerListOptions = (data) => {
    console.log("data", data)
    const list = data & data.length & data.map(d => ({
      value: d.Partner,
      label: d.Title + " " + d.Partner,
    }))
    setPartnerListOptions(list.length ? list.length : "")
  }
  const getResellerListOptions = (data) => {
    const list = data & data.length & data.map(d => ({
      value: d.Reseller,
      label: d.TITAL + " " + d.Reseller,
    }))
    setResellerListOptions(list.length ? list.length : "")
  }
  const getPlanListOptions = (data) => {
    const list = data & data.length & data.map(d => ({
      value: d.Plan,
      label: d.Plan,
    }))
    setPlanListOptions(list.length ? list.length : "")
  }






  async function getPartner() {
    let reqObj = {
      Request: requestObj
    }
    console.log("getPartner request .......", reqObj);
    axios.defaults.headers.common = [];

    await axios.post("https://admin.tripleplay.in/api/ekycservice.asmx/PartnerList", reqObj)
      .then(res => {
        // if (handleSuccess) handleSuccess(res);
        console.log("res....api....", res)
        getPartnerListOptions(res ? res.d.PartnerList : [])
        // setPartnerDataList(res)
      })
      .catch(err => {
        console.log("get Partner.api res error.......", err)

        // if (handleError) handleError(err);
      });
  };
  async function getReseller() {
    let reqObj = {
      Request: requestObj,
      PartnerName: "Tripleplay Interactive Network Pvt Ltd"
    }
    console.log("getPartner request .......", reqObj);
    axios.defaults.headers.common = [];

    await axios.post("https://admin.tripleplay.in/api/ekycservice.asmx/ResellerList", reqObj)
      .then(res => {
        // if (handleSuccess) handleSuccess(res);
        console.log("res....api....", res)
        getResellerListOptions(res ? res.d.ResellerList : [])
        // setPartnerDataList(res)
      })
      .catch(err => {
        console.log("get Partner.api res error.......", err)

        // if (handleError) handleError(err);
      });
  };
  async function getPlan() {
    let reqObj = {
      Request: requestObj,
      PartnerName: "Tripleplay Interactive Network Pvt Ltd",
      ResellerName: "4Gplus Broadband"
    }
    console.log("getPartner request .......", reqObj);
    axios.defaults.headers.common = [];

    await axios.post("https://admin.tripleplay.in/api/ekycservice.asmx/PlanList", reqObj)
      .then(res => {
        // if (handleSuccess) handleSuccess(res);
        console.log("res....api....", res)
        getPlanListOptions(res ? res.d.PlanList : [])
        // setPartnerDataList(res)
      })
      .catch(err => {
        console.log("get Partner.api res error.......", err)

        // if (handleError) handleError(err);
      });
  };
  // async function getReseller(data, handleApiRes, handleApiError) {
  //   console.log(data);
  //   await AxiosPost("getResellerList", data,
  //     (apiRes) => {
  //       handleApiRes(apiRes)
  //     }, (apiError) => {
  //       handleApiError(apiError)
  //     })
  // };
  // async function getPlan(data, handleApiRes, handleApiError) {
  //   console.log(data);
  //   await AxiosPost("getPlanList", data,
  //     (apiRes) => {
  //       handleApiRes(apiRes)
  //     }, (apiError) => {
  //       handleApiError(apiError)
  //     })
  // };

  return <CustomerEkycContext.Provider value={{
    // customerEKYCData: customerEKYCData,
    partnerListOptions: partnerListOptions,
    resellerListOptions: resellerListOptions,
    planListOptions: planListOptions
    // getPartner: getPartner,
    // getReseller: getReseller,
    // getPlan: getPlan
  }}>{props.children}</CustomerEkycContext.Provider>;
};
