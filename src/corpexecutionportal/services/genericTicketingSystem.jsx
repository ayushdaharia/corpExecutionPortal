import { enqueueSnackbar } from "notistack";
import { BASE_URL } from "../../assets/constants";
import {
  getData,
  saveData,
  updateData,
  uploadFile,
} from "../assets/corpServices";
import dayjs from "dayjs";
//////userId=${userId}
export const getAllTickets = async (
  startDate,
  endDate,
  userId,
  setTicketList,
  setFfilteredTicketList
) => {
  const url = BASE_URL + `org/getTickets/${startDate}?endDate=${endDate}&`;

  const response = await getData(url);

  if (response.error) {
    console.warn({ error: response.error });
    setTicketList([]);
    //setFfilteredTicketList([]);
  } else {
    setTicketList(response.data);
    //setFfilteredTicketList(response.data);
  }
};

export const raiseTicket = async (
  data,
  selectedTicketType,
  handleClose,
  formData
) => {
  const url = BASE_URL + `org/v2/raiseTicket`;

  console.log({ data });
  formData.append("userAuthId", data.userId);
  formData.append("raisedBy", data.name);
  formData.append("raisedById", data.userId);
  formData.append("raisedByMobileNo", data.mobile);
  formData.append("ticketType", selectedTicketType?.ticketType || "");

  formData.append("corpId", data.company?.corpId || "");
  formData.append("corpName", data.company?.orgName || "");
  formData.append("ticketCategory", "CORP");
  formData.append("status", "TICKET_RAISED");

  formData.append(
    "ticketInfo",
    JSON.stringify({
      sessionId: data.sessionType?.id,
      sessionDate: dayjs(data.date).format("YYYY-MM-DD"),
      sessionName: data.sessionType?.sessionName,

      name: data.name,
      date: dayjs(data.date).format("YYYY-MM-DD"),
      testType: data.testType,
      department: data.department,
      empId: data.empId,
      address: data.address,
      mobile: data.mobile,
      hrmobile: data.hrmobile,
      package: data.packageName,

      requirement: data.requirement,
      targetDate: data.targetDate,

      company: data.company,
      task: data.task,
      targetDate: data.targetDate,

      backendOwner: data.backendOwner,
      frontendOwner: data.frontendOwner,

      empName: data.empName,
      issue: data.issue,

      service: data.service,
      additionalDetails: data.additionalDetails,
      preferredDate: data.preferredDate,

      serviceName: data.serviceName,
    })
  );

  const res = await uploadFile(url, formData);
  if (res.error) {
    console.warn({ error: res.error });
    enqueueSnackbar("Failed to raise ticket!", {
      variant: "error",
    });
  } else {
    console.log({ success: res.data });
    enqueueSnackbar("Successfully raised ticket.", {
      variant: "success",
    });
    handleClose();
  }
};

export const getSessionTypeList = async (setSessionTypeList) => {
  const url = BASE_URL + `org/awarenessSessions/list`;

  const res = await getData(url);

  if (res.error) {
    console.warn({ error: res.error });
    setSessionTypeList([]);
  } else {
    console.log({ success: res.data });
    setSessionTypeList(res.data);
  }
};

export const getCompanyList = async (setCompanyList) => {
  const url = BASE_URL + `org/reporting/all`;

  const res = await getData(url);

  if (res.error) {
    console.warn({ error: res.error });
    setCompanyList([]);
  } else {
    console.log({ success: res.data });
    setCompanyList(
      res.data
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.orgName === value.orgName)
        )
        .map((value) => ({
          ...value,
          label: value.orgName,
        }))
    );
  }
};

export const updateTicket = async (
  data,
  date,
  status,
  doctorName,
  sessionStartDate,
  sessionEndDate
) => {
  const url = BASE_URL + `org/updateTicketStatus`;

  let ticketInfo = data?.ticketInfo;

  if (ticketInfo) {
    ticketInfo["sessionDate"] = dayjs(date).format("YYYY-MM-DD");
    ticketInfo["doctorName"] = doctorName;
    ticketInfo["sessionStartDate"] = dayjs(sessionStartDate); //.format("LT");
    ticketInfo["sessionEndDate"] = dayjs(sessionEndDate); //.format("LT");
  } else {
    ticketInfo = {
      sessionId: "",
      sessionDate: dayjs(date).format("YYYY-MM-DD"),
      sessionName: "",
      doctorName: doctorName,
      sessionStartDate: sessionStartDate,
      sessionEndDate: sessionEndDate,
    };
  }

  const payload = {
    ticketId: data?.ticketId,
    ticketInfo: ticketInfo,
    status: status?.value,
  };
  const res = await updateData(url, payload);
  if (res.error) {
    console.warn({ error: res.error });
    enqueueSnackbar("Failed to update ticket!", {
      variant: "error",
    });
  } else {
    console.log({ success: res.data });
    enqueueSnackbar("Successfully updated ticket.", {
      variant: "success",
    });
  }
};

export const getDepartments = async (corpId, setDepartmentList) => {
  const url = BASE_URL + `org/departments?corpId=${corpId}`;
  let data = [];
  const departments = await getData(url, "");
  if (departments.error) {
    data = [];
  } else {
    data = departments.data;
  }
  setDepartmentList(data);
  return data;
};
