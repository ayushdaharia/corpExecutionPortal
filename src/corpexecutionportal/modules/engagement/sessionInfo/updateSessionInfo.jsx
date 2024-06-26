import {
  Box,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteData,
  getData,
  updateData,
  updateDataFile,
} from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { useSnackbar } from "notistack";
import UploadFile from "../../../global/uploadFile";
import { useFileUpload } from "use-file-upload";

const UpdateSessionInfo = () => {
  const [files, selectFiles] = useFileUpload();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState("");
  const [sessionList, setSessionList] = useState([]);
  const getSessionList = async () => {
    const url =
      BASE_URL + `org/orgconfig/list?orgConfigType=AWARENESS_SESSIONS`;
    const result = await getData(url);
    if (result.error) {
      setSessionList([]);
    } else {
      setSessionList(result.data);
    }
  };

  useEffect(() => {
    getSessionList();
  }, []);

  const [sessionDetail, setSessionDetail] = useState({
    id: "",
    sessionName: "",
    description: "",
    duration: "",
    impact: "",
    imageUrl: "",
  });

  const handleUpdated = async () => {
    setIsLoading(true);
    const formData = new FormData();
    {
      sessionDetail.id ? formData.append("id", sessionDetail.id) : null;
    }
    {
      sessionDetail.sessionName
        ? formData.append("sessionName", sessionDetail.sessionName)
        : null;
    }
    {
      sessionDetail.description
        ? formData.append("description", sessionDetail?.description)
        : null;
    }
    {
      sessionDetail?.duration
        ? formData.append("duration", sessionDetail?.duration)
        : null;
    }
    formData.append("orgConfigType", "AWARENESS_SESSIONS");
    {
      sessionDetail?.impact
        ? formData.append("impact", sessionDetail?.impact)
        : null;
    }

    {
      sessionDetail.imageUrl.file
        ? formData.append("file", sessionDetail?.imageUrl?.file)
        : null;
    }

    const url = BASE_URL + `org/orgrconfig/update`;
    const result = await updateDataFile(url, formData);
    if (result.error) {
      console.log(result.error);
      setIsLoading(false);
    } else {
      enqueueSnackbar("Updated successfully.", {
        variant: "success",
      });
      setIsLoading(false);
      setSessionDetail({
        id: "",
        sessionName: "",
        description: "",
        duration: "",
        impact: "",

        imageUrl: "",
      });
      setSelectedSession("");
      getSessionList();
    }
  };

  const handleDeleteSession = async () => {
    const url = BASE_URL + `org/orgconfig/delete?id=${selectedSession.id}`;
    const result = await deleteData(url);
    if (result.error) {
      enqueueSnackbar("An error occured.", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Deleted successfully.", {
        variant: "success",
      });
      setSelectedSession("");
      setSessionDetail({
        id: "",
        sessionName: "",
        description: "",
        duration: "",
        impact: "",
        imageUrl: "",
      });
      getSessionList();
    }
  };
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fragment>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <CustomAutocomplete
            label="Select Session"
            placeholder={"Select Session"}
            options={sessionList}
            value={selectedSession}
            getOptionLabel={(option) => option.sessionName || ""}
            onChange={(event, newValue, reason) => {
              setSelectedSession(newValue);
              setSessionDetail({
                ...newValue,
                isActive: true,
                imageUrl: { source: newValue?.imageUrl || "" },
              });
              console.log({ newValue });
              if (reason === "clear") {
                setSelectedSession("");
                setSessionDetail({
                  id: "",
                  sessionName: "",
                  description: "",
                  duration: "",
                  impact: "",
                  isActive: true,
                  imageUrl: "",
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Session Name"
            placeholder="Session Name"
            size="small"
            fullWidth
            value={sessionDetail.sessionName || ""}
            onChange={(e) => {
              setSessionDetail({
                ...sessionDetail,
                sessionName: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Session Duration"
            placeholder="Session Duration"
            size="small"
            fullWidth
            value={sessionDetail.duration || ""}
            onChange={(e) => {
              setSessionDetail({
                ...sessionDetail,
                duration: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Session Impact"
            placeholder="Session Impact"
            size="small"
            fullWidth
            value={sessionDetail.impact || ""}
            onChange={(e) => {
              setSessionDetail({
                ...sessionDetail,
                impact: e.target.value,
              });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <UploadFile
            title="Upload Icon"
            styles={{ height: "40px", borderRadius: "15px" }}
            formValues={sessionDetail}
            setFormValues={setSessionDetail}
            property={"imageUrl"}
            onClick={() =>
              selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
                const filedata = { name, size, source, file };
                setSessionDetail((prevSessionDetail) => ({
                  ...prevSessionDetail,
                  imageUrl: filedata, // or source if you prefer
                }));
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            multiline
            minRows={5}
            label="Session Description"
            placeholder="Session Description"
            size="small"
            fullWidth
            value={sessionDetail.description || ""}
            onChange={(e) => {
              setSessionDetail({
                ...sessionDetail,
                description: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <CustomButtonBlue
            disabled={selectedSession ? false : true}
            title="Save"
            onClick={() => {
              handleUpdated();
            }}
          />
          <CustomButtonBlue
            disabled={selectedSession ? false : true}
            styles={{
              backgroundColor: "red",
              ":hover": {
                backgroundColor: "red",
              },
            }}
            title="Delete"
            onClick={() => {
              handleDeleteSession();
            }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UpdateSessionInfo;
