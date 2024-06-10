import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import BookIcon from "@mui/icons-material/Book";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { StatusColorCode, StatusIcons } from "../../../assets/corpConstants";
const TicketCardView = ({ ticket }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box
        onClick={() =>
          navigate(`/corp/ticketview/${ticket.ticketId}`, { state: ticket })
        }
      >
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <Box>
              <Stack
                direction={"row"}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 15,
                    height: 80,
                    background: StatusColorCode[ticket?.status] || "lightgray",
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                ></Box>
                <Card variant="outlined" sx={{ width: "100%" }}>
                  <CardContent>
                    <Stack direction={"row"}>
                      <Grid container spacing={1}>
                        <Grid item lg={2} display="flex" alignItems="center">
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={1}>
                              <BookIcon fontSize="10" />
                              <Typography sx={{ fontSize: 10 }}>
                                Number
                              </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 14 }}>
                              {ticket?.ticketId}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid
                          item
                          lg={2}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={1}>
                              <BookIcon fontSize="10" />
                              <Typography sx={{ fontSize: 10 }}>
                                Date
                              </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 14 }}>
                              {ticket?.date
                                ? dayjs(ticket?.date).format("LL")
                                : ""}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item lg={2} display="flex" alignItems="center">
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={1}>
                              <BookIcon fontSize="10" />
                              <Typography sx={{ fontSize: 10 }}>
                                Type
                              </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 14 }}>
                              {ticket?.ticketType || "n/a"}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item lg={2} display="flex" alignItems="center">
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={1}>
                              <BookIcon fontSize="10" />
                              <Typography sx={{ fontSize: 10 }}>
                                Company Name
                              </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 14 }}>
                              {ticket?.corpName}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item lg={2} display="flex" alignItems="center">
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={1}>
                              <BookIcon fontSize="10" />
                              <Typography sx={{ fontSize: 10 }}>
                                Employee Name
                              </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 14 }}>
                              {ticket?.raisedBy || "n/a"}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid
                          item
                          lg={2}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box
                            component={Stack}
                            sx={{
                              background:
                                StatusColorCode[ticket?.status] || "lightgray",
                              px: 3,
                              py: 1,
                              borderRadius: 3,
                              minWidth: 210,
                              minHeight: 40,
                            }}
                            direction="row"
                            spacing={1}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            {StatusIcons[ticket?.status] || (
                              <NotificationsIcon
                                fontSize="10"
                                sx={{ color: "#fff" }}
                              />
                            )}
                            <Typography sx={{ fontSize: 14, color: "#fff" }}>
                              {ticket?.status}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TicketCardView;
