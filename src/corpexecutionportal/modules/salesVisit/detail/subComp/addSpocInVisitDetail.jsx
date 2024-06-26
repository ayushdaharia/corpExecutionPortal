import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  deleteDataWithObj,
  updateData,
  updateDataFile,
  updateDatePut,
  updateDatePutMultipart,
  uploadFile,
} from "../../../../assets/corpServices";
import DownloadIcon from "@mui/icons-material/Download";
import { BASE_URL } from "../../../../../assets/constants";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Portal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";
import { isMobile } from "react-device-detect";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import UploadFile from "../../../../global/uploadFile";
import { useFileUpload } from "use-file-upload";
import { CallOutlined } from "@mui/icons-material";

const AddSpocInVisitDetail = ({
  formValues,
  setFormValues,
  onlyView = false,
  setFetch,
}) => {
  const { itemId } = useParams();
  const corpSalesId = itemId;
  const { enqueueSnackbar } = useSnackbar();
  const [files, selectFiles] = useFileUpload();
  const [showSpocList, setShowSpocList] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const validateEmail = (email) => {
    if (email.trim() === "") {
      return true;
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const _storedData = useMemo(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("SAVED_FILTER_SPOCLIST_INFO")) || {}
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return {};
    }
  }, []);

  useEffect(() => {
    const _showSpocList = _storedData?.showSpocList || false;
    setShowSpocList(_showSpocList);
  }, []);

  const [spocForm, setSpocForm] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    decisionMaker: "No",
    spocPhotoUrl: { source: "" },
  });
  const [open, setOpen] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedData, setEditedData] = useState(null);

  const handleOpen = (index, spoc) => {
    setOpen(true);
    if (index !== undefined) {
      setEditedIndex(index);
      setSpocForm({
        name: formValues.spocList[index].name || "",
        email: formValues.spocList[index].email || "",
        mobile: formValues.spocList[index].mobile || "",
        designation: formValues.spocList[index].designation || "",
        decisionMaker: formValues.spocList[index].decisionMaker || "",
        spocPhotoUrl: {
          source: formValues.spocList[index].imageUrl || "",
        },
      });
      setEditedData(spoc);
    } else {
      setSpocForm({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        decisionMaker: "No",
        spocPhotoUrl: {
          source: "",
        },
      });
      setEditedIndex(null);
    }
  };

  console.log({ spocForm, editedData, editedIndex });

  const handleClose = () => {
    setOpen(false);
    setEditedIndex(null);
    setSpocForm({
      name: "",
      email: "",
      mobile: "",
      designation: "",
      decisionMaker: "No",
      spocPhotoUrl: {
        source: "",
      },
    });
  };

  const handleFormSubmit = () => {
    handleSubmit();
  };

  const deleteSpoc = (index, id, obj) => {
    const updatedSpocList = [...formValues.spocList];
    updatedSpocList.splice(index, 1);
    setFormValues({ ...formValues, spocList: updatedSpocList });
    handleDeleteSpoc(obj);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("corpSalesId", formValues.corpSalesId);
    spocForm.name ? formData.append("name", spocForm.name) : null;
    spocForm?.mobile ? formData.append("mobile", spocForm?.mobile) : null;
    spocForm?.email ? formData.append("email", spocForm?.email) : null;
    spocForm?.designation
      ? formData.append("designation", spocForm?.designation)
      : null;
    spocForm?.decisionMaker
      ? formData.append("decisionMaker", spocForm?.decisionMaker)
      : null;
    spocForm?.spocPhotoUrl.file
      ? formData.append("file", spocForm?.spocPhotoUrl.file)
      : null;

    const url = BASE_URL + "corpSales/add/spoc";
    const result = await uploadFile(url, formData);
    if (result && result.data) {
      console.log("SUCCESS POST", result.data);
      enqueueSnackbar("Successfully Added", {
        variant: "success",
      });
      if (editedIndex !== null) {
        const updatedSpocList = [...formValues.spocList];
        updatedSpocList[editedIndex] = spocForm;
        setFormValues({ ...formValues, spocList: updatedSpocList });
      } else {
        setFormValues({
          ...formValues,
          spocList: [...formValues.spocList, spocForm],
        });
      }
      setShowSpocList(true);
      handleClose();
      setFetch(true);
    } else if (result && result.error) {
      enqueueSnackbar(`${result.error.response.data.message}`, {
        variant: "error",
      });
    }
  };

  const handleDeleteSpoc = async (data) => {
    const obj = {
      corpSalesId: formValues.corpSalesId,
      deleteList: [data.id],
    };
    const url = BASE_URL + "corpSales/spoc";
    const result = await deleteDataWithObj(url, obj);
    if (result && result.data) {
      enqueueSnackbar("Successfully Deleted", {
        variant: "success",
      });
      setFetch(true);
      handleClose();
    } else if (result && result.error) {
      enqueueSnackbar("An Error Occured", {
        variant: "error",
      });
    }
  };

  const handleEditSpoc = async () => {
    console.log({ file: spocForm?.spocPhotoUrl.file });
    const formData = new FormData();
    formData.append("corpSalesId", formValues?.corpSalesId);
    formData.append("id", editedData?.id);
    formData.append("name", spocForm.name);
    formData.append("mobile", spocForm?.mobile);
    formData.append("email", spocForm?.email);
    formData.append("designation", spocForm?.designation);
    formData.append("decisionMaker", spocForm?.decisionMaker);
    spocForm?.spocPhotoUrl.file
      ? formData.append("file", spocForm?.spocPhotoUrl.file)
      : null;
    const url = BASE_URL + "corpSales/spoc";
    const result = await updateDataFile(url, formData);
    if (result && result.data) {
      enqueueSnackbar("Successfully Updated SPOC", {
        variant: "success",
      });
      setFetch(true);
      handleClose();
    } else if (result && result.error) {
      enqueueSnackbar("An Error Occured", {
        variant: "error",
      });
    }
  };

  const [openPhoto, setOpenPhoto] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const savedFilter = {
      showSpocList,
    };
    localStorage.setItem(
      "SAVED_FILTER_SPOCLIST_INFO",
      JSON.stringify(savedFilter)
    );
  }, [showSpocList]);

  return (
    <Fragment>
      <Box sx={{ marginTop: 1 }}>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <Box
              sx={{
                display: "flex",
                marginBottom: 1,
                minWidth: "300px",
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "space-between",
                backgroundColor: "#F5F5F5",
              }}
              onClick={() => {
                setShowSpocList(!showSpocList);
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                SPOC Information
              </Typography>

              <IconButton
                onClick={() => {
                  setShowSpocList(!showSpocList);
                }}
              >
                {showSpocList === false ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon />
                )}
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {showSpocList &&
          formValues?.spocList?.length > 0 &&
          formValues?.spocList?.map((spoc, index) => (
            <Grid
              key={index}
              container
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #777777",
                padding: "10px",
                borderRadius: "15px",
                marginBottom: "10px",
              }}
            >
              <Grid item xs={10} lg={10}>
                <Grid container>
                  <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                    <Typography sx={styles.heading}>Name -</Typography>
                    <Typography sx={styles.data}>{spoc.name}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={4}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography sx={styles.heading}>Mobile -</Typography>
                    <Typography sx={styles.data}>{spoc.mobile}</Typography>
                    {spoc.mobile && (
                      <IconButton
                        sx={{ marginLeft: 1 }}
                        href={`tel:${spoc.mobile}`}
                      >
                        <CallOutlined
                          sx={{
                            color: "#127DDD",
                            height: "20px",
                            width: "20px",
                          }}
                        />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                    <Typography sx={styles.heading}>Email Id -</Typography>
                    <Typography sx={styles.data}>{spoc.email}</Typography>
                  </Grid>
                  <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                    <Typography sx={styles.heading}>Designation -</Typography>
                    <Typography sx={styles.data}>{spoc.designation}</Typography>
                  </Grid>
                  <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                    <Typography sx={styles.heading}>
                      Decision Maker -
                    </Typography>
                    <Typography sx={styles.data}>
                      {spoc.decisionMaker ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                    <IconButton
                      sx={{
                        backgroundColor: "#127DDD",
                        ":hover": {
                          backgroundColor: "#1f63a1",
                        },
                        ":disabled": {
                          backgroundColor: "lightgray",
                        },
                        p: 0.7,
                      }}
                      disabled={spoc.imageUrl ? false : true}
                      onClick={() => {
                        setOpenPhoto(true);
                        setImageUrl(spoc.imageUrl || "");
                      }}
                    >
                      <ImageIcon
                        sx={{ color: "#FFFFFF", height: "20px", width: "20px" }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} lg={2} sx={{ textAlign: "end" }}>
                {onlyView === true ? null : (
                  <IconButton onClick={() => deleteSpoc(index, spoc.id, spoc)}>
                    <DeleteIcon />
                  </IconButton>
                )}
                {onlyView === true ? null : (
                  <IconButton onClick={() => handleOpen(index, spoc)}>
                    <EditIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}

        {showSpocList && (
          <Box sx={{ marginTop: 1 }}>
            <CustomButtonBlue
              title="Add New SPOC"
              onClick={() => {
                handleOpen();
              }}
              styles={{ width: "150px", height: "40px" }}
            />
          </Box>
        )}
      </Box>

      <Portal>
        <Dialog
          fullWidth={true}
          maxWidth={"lg"}
          open={openPhoto}
          onClose={() => {
            setOpenPhoto(false);
            setImageUrl("");
          }}
        >
          <DialogContent>
            <img src={imageUrl} alt="image" width="100%" />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenPhoto(false);
                setImageUrl("");
              }}
            >
              Close
            </Button>
            <IconButton
              sx={{
                backgroundColor: "#127DDD",
                ":hover": {
                  backgroundColor: "#1f63a1",
                },
              }}
              onClick={() => {
                handleDownload(imageUrl);
              }}
            >
              <DownloadIcon sx={{ color: "#FFFFFF" }} />
            </IconButton>
          </DialogActions>
        </Dialog>
      </Portal>

      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(187, 187, 187, 0.1)",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              padding: "15px",
              width: isMobile ? "365px" : "665px",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "15px",
                color: "#000000",
                marginTop: "-25px",
                marginBottom: "10px",
              }}
            >
              Add Spoc Detail
            </Typography>
            <Grid
              container
              sx={{ justifyContent: "space-between", marginTop: "20px" }}
              spacing={2}
            >
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    background: "#fff",
                  }}
                  label="Name"
                  size="small"
                  fullWidth
                  placeholder="Enter Name"
                  value={spocForm.name}
                  onChange={(e) =>
                    setSpocForm({ ...spocForm, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    background: "#fff",
                  }}
                  label="Mobile"
                  size="small"
                  fullWidth
                  placeholder="Enter Mobile"
                  value={spocForm.mobile}
                  onChange={(e) => {
                    if (!isNaN(e.target.value) && e.target.value.length < 11) {
                      setSpocForm({ ...spocForm, mobile: e.target.value });
                    }
                  }}
                  error={
                    spocForm.mobile
                      ? spocForm.mobile?.length === 10 ||
                        spocForm.mobile?.length === 0
                        ? false
                        : true
                      : null
                  }
                  helperText={
                    spocForm.mobile
                      ? spocForm.mobile?.length === 10 ||
                        spocForm.mobile?.length === 0
                        ? ""
                        : "Phone number should be 10 digit."
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    background: "#fff",
                  }}
                  label="Email"
                  size="small"
                  fullWidth
                  placeholder="Enter Email"
                  value={spocForm.email}
                  onChange={(e) => {
                    const email = e.target.value;
                    setSpocForm({ ...spocForm, email: email });
                    setIsEmailValid(validateEmail(email));
                  }}
                  error={!isEmailValid ? true : false}
                  helperText={
                    !isEmailValid ? "Please Enter Valid Email Address" : ""
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="Designation"
                  sx={{
                    background: "#fff",
                  }}
                  size="small"
                  fullWidth
                  placeholder="Enter Designation"
                  value={spocForm?.designation}
                  onChange={(e) =>
                    setSpocForm({ ...spocForm, designation: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography sx={{ mb: 1 }}>Descision Maker</Typography>
                <RadioGroup
                  value={
                    spocForm.decisionMaker === true
                      ? "Yes"
                      : spocForm.decisionMaker === false
                      ? "No"
                      : ""
                  }
                  onChange={(e) => {
                    setSpocForm({
                      ...spocForm,
                      decisionMaker:
                        e.target.value === "Yes"
                          ? true
                          : e.target.value === "No"
                          ? false
                          : "",
                    });
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </Box>
                </RadioGroup>
              </Grid>
              <Grid item xs={12} lg={6}>
                <UploadFile
                  title="Upload Photo"
                  styles={{ height: "40px", borderRadius: "15px" }}
                  formValues={spocForm}
                  setFormValues={setSpocForm}
                  property={"spocPhotoUrl"}
                  onClick={() =>
                    selectFiles(
                      { accept: "*" },
                      ({ name, size, source, file }) => {
                        const filedata = { name, size, source, file };
                        setSpocForm((spocForm) => ({
                          ...spocForm,
                          spocPhotoUrl: filedata,
                        }));
                      }
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} lg={12} sx={{ textAlign: "center" }}>
                <CustomButtonBlue
                  title={"Submit"}
                  onClick={() => {
                    if (editedData) {
                      handleEditSpoc();
                    } else {
                      handleFormSubmit();
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Portal>
    </Fragment>
  );
};

const styles = {
  heading: {
    color: "#6B6B6B",
    fontWeight: "bold",
    marginRight: "10px",
  },
  data: {
    color: "#127DDD",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
};

export default AddSpocInVisitDetail;
