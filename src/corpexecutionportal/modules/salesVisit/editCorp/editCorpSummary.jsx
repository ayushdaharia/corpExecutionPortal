import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import CompanyName from "./subComp/companyName";
import SelectLocation from "../../../global/selectLocation/selectLocation";
import { useFileUpload } from "use-file-upload";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { saveData, updateData, uploadFile } from "../../../assets/corpServices";
import { fetchCorpDetails } from "../../../services/salesVisitServices";
import dayjs from "dayjs";
import Priority from "../registration/subComp/priority";
import SubLocation from "../registration/subComp/subLocation";
import UploadFilesEdit from "./subComp/uploadFilesEdit";
import CustomAutocomplete from "../../../../assets/customAutocomplete";

const EditCorpSummary = () => {
  const { itemId } = useParams();
  const corpSalesId = itemId;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [files, selectFiles] = useFileUpload();
  const userId = localStorage.getItem("USER_ID_CORP_SALES");
  const userName = localStorage.getItem("USER_NAME_CORP_SALES");
  const [formValues, setFormValues] = useState({
    corpSalesId: "",
    corpName: "",
    industryType: "",
    address: "",
    noOfPlants: "",
    timeField: dayjs().format("YYYY-MM-DD"),
    onRollEmployees: "",
    offRollEmployees: "",
    prospectiveServices: [],
    auditMonth: dayjs().format("YYYY-MM-DD"),
    photoUrl: { source: "", file: "" },
    interested: false,
    quotationAsked: false,
    anoterVisitRequired: false,
    interestedRemark: "",
    spocList: [],
    visitType: "",
    userId: 0,
    childUserId: [0],
    registrationDate: dayjs().format("YYYY-MM-DD"),
    userName: "",
    location: "",
    subLocation: "",
    priority: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCorpDetails(setFormValues, setIsLoading, corpSalesId);
  }, [corpSalesId]);

  const Obj2 = {
    corpSalesId: formValues?.corpSalesId,
    corpName: formValues.corpName,
    industryType: formValues.industryType,
    noOfPlants: formValues.noOfPlants,
    address: formValues.address,
    childUserId: formValues?.childUserId?.map((item) => item.id) || [],
    onRollEmployees: formValues.onRollEmployees,
    offRollEmployees: formValues.offRollEmployees,
    auditMonth: formValues.auditMonth,
    prospectiveServices: formValues.prospectiveServices || [],
    location: formValues?.location || null,
    subLocation: formValues?.subLocation || null,
    priority: formValues?.priority || null,
    interestedRemark: formValues.interestedRemark,
  };

  console.log({ formValues });

  const handleUpdate = async () => {
    const url = BASE_URL + "corpSales/edit";
    const result = await updateData(url, Obj2);
    if (result && result.data) {
      enqueueSnackbar("Successfully Saved", {
        variant: "success",
      });
      fetchCorpDetails(setFormValues, setIsLoading, corpSalesId);
      if (result?.data && formValues.photoUrl.file !== "") {
        handleUpload(result?.data?.corpSalesId);
      } else {
        navigate(-1);
      }
    } else if (result && result?.error) {
      enqueueSnackbar("An Error Occured", {
        variant: "error",
      });
    }
  };

  const handleUpload = async (corpSalesId) => {
    const formData = new FormData();
    formValues.photoUrl.file
      ? formData.append("file", formValues.photoUrl.file)
      : null;
    const url =
      BASE_URL +
      "corpSales/upload?corpSalesId=" +
      corpSalesId +
      "&fileType=PHOTO";
    const result = await uploadFile(url, formData);
    if (result.data) {
      enqueueSnackbar("Successfully Uploaded!", { variant: "success" });
      navigate(-1);
    } else {
      enqueueSnackbar("An error occured while uploading photo", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      photoUrl: { source: formValues.photoUrl || "" },
    });
  }, [isLoading]);

  const handleDeletePhoto = async () => {
    const url = BASE_URL + `corpSales/removeLogo/${corpSalesId}`;
    const result = await updateData(url, "");
    if (result.data) {
      enqueueSnackbar("Successfully Deleted", {
        variant: "success",
      });
      fetchCorpDetails(setFormValues, setIsLoading, corpSalesId);
    } else {
      enqueueSnackbar("An Error Occured", {
        variant: "error",
      });
    }
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <CompanyName formValues={formValues} setFormValues={setFormValues} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <TextField
            fullWidth
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            size="small"
            label={"Company Address"}
            placeholder={"Enter Company Address"}
            value={formValues.address || ""}
            onChange={(e) => {
              setFormValues({ ...formValues, address: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <TextField
            fullWidth
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            size="small"
            label={"#Plants"}
            placeholder={"#Plants"}
            value={formValues.noOfPlants || ""}
            onChange={(e) => {
              setFormValues({ ...formValues, noOfPlants: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <Priority formValues={formValues} setFormValues={setFormValues} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <CustomAutocomplete
            fullWidth
            size="small"
            label={"Industry Type"}
            placeholder={"Select/Enter Industry Type"}
            options={[
              "Chemical Companies",
              "General Manufacturing",
              "Personal",
              "Food & Beverages",
              "Auto OEMs and its Suppliers",
              "IT/Financial",
              "Pharma Company",
              "Metal Fabrication/Metal Parts",
              "Textiles",
              "Warehouses",
              "Manpower Contractors",
              "Distillery",
              "FMCG",
              "Packaging",
            ]}
            freeSolo={true}
            getOptionLabel={(option) => option || ""}
            value={formValues.industryType || ""}
            onChange={(event, newValue) => {
              setFormValues({ ...formValues, industryType: newValue });
            }}
            onInputChange={(event, newInputValue) => {
              setFormValues({ ...formValues, industryType: newInputValue });
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SelectLocation
            required={true}
            asterickColor={"red"}
            freeSolo={true}
            fontWeight={"600"}
            formValues={formValues}
            setFormValues={setFormValues}
            property={"location"}
            label={"Select Location"}
            placeholder={"Select Location"}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SubLocation
            required={true}
            asterickColor={"red"}
            property={"subLocation"}
            freeSolo={true}
            fontWeight={"600"}
            formValues={formValues}
            setFormValues={setFormValues}
            label={"Select Sub Location"}
            placeholder={"Select Sub Location"}
          />
        </Grid>

        <Grid item xs={6} lg={6}>
          <TextField
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            fullWidth
            label="#On Roll"
            placeholder="#On Roll"
            variant="outlined"
            size="small"
            value={formValues?.onRollEmployees || ""}
            onChange={(e) => {
              if (!isNaN(e.target.value) && e.target.value.length >= 0) {
                setFormValues({
                  ...formValues,
                  onRollEmployees: e.target.value,
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <TextField
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            fullWidth
            label="#Off Roll"
            variant="outlined"
            placeholder="#Off Role"
            size="small"
            value={formValues?.offRollEmployees || ""}
            onChange={(e) => {
              if (!isNaN(e.target.value) && e.target.value.length >= 0) {
                setFormValues({
                  ...formValues,
                  offRollEmployees: e.target.value,
                });
              }
            }}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <UploadFilesEdit
            onDeleteClick={() => {
              handleDeletePhoto();
            }}
            editPhoto={true}
            title="Upload Photo"
            styles={{ height: "40px", borderRadius: "15px" }}
            formValues={formValues}
            setFormValues={setFormValues}
            property={"photoUrl"}
            onClick={() =>
              selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
                const filedata = { name, size, source, file };
                setFormValues((prevFormValues) => ({
                  ...prevFormValues,
                  photoUrl: { source: filedata.source, file: filedata.file },
                }));
              })
            }
          />
        </Grid>

        <Grid item xs={12} lg={12}>
          <TextField
            multiline
            label="Key Highlight"
            size="small"
            fullWidth
            placeholder="Key Highlight"
            value={formValues.interestedRemark || ""}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                interestedRemark: e.target.value,
              })
            }
            inputProps={{
              style: {
                height: "110px",
              },
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          lg={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            disabled={
              formValues.corpName &&
              formValues.priority &&
              formValues.subLocation &&
              formValues.location
                ? false
                : true
            }
            variant="contained"
            sx={{ width: "150px", borderRadius: "15px" }}
            onClick={() => {
              handleUpdate();
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditCorpSummary;
